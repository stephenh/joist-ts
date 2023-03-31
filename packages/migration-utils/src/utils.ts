import { ColumnDefinitions, MigrationBuilder, PgLiteral } from "node-pg-migrate";
import { DropOptions } from "node-pg-migrate/dist/operations/generalTypes";
import { ColumnDefinition, TableOptions } from "node-pg-migrate/dist/operations/tablesTypes";
import { singular } from "pluralize";

/**
 * Creates an entity table with our conventions.
 *
 * Specifically an `id` auto-increment column (via a sequence) and `created_at` and `updated_at`
 * columns.
 */
export function createEntityTable(b: MigrationBuilder, tableName: string, columns: ColumnDefinitions): void {
  b.createTable(tableName, {
    id: "id",
    ...columns,
    created_at: { type: "timestamptz", notNull: true },
    updated_at: { type: "timestamptz", notNull: true },
  });

  // Postgres doesn't automatically index foreign keys, so any column def points at
  // another table, assume we'll be doing a lot of lookups on this column and should fk it.
  Object.entries(columns).forEach(([name, def]) => {
    if (typeof def === "object" && def.references) {
      b.sql(`CREATE INDEX ${tableName}_${name}_idx ON ${tableName} USING btree (${name})`);
    }
  });

  createTriggers(b, tableName);
}

/**
 * Creates a subtype table using class-per-table inheritance.
 *
 * The subtable will use the base table's id as its identity, and when loading rows of the base
 * type, Joist will automatically stitch together rows across each table into a single instance.
 */
export function createSubTable(
  b: MigrationBuilder,
  baseTableName: string,
  subTableName: string,
  columns: ColumnDefinitions,
): void {
  b.createTable(subTableName, {
    id: { type: "int", references: `${baseTableName}`, primaryKey: true, deferrable: true, deferred: true },
    ...columns,
  });
  // Postgres doesn't automatically index foreign keys, so any column def points at
  // another table, assume we'll be doing a lot of lookups on this column and should fk it.
  Object.entries(columns).forEach(([name, def]) => {
    if (typeof def === "object" && def.references) {
      b.sql(`CREATE INDEX ${subTableName}_${name}_idx ON ${subTableName} USING btree (${name})`);
    }
  });
}

export function createEnumTable(b: MigrationBuilder, tableName: string, values: Array<[string, string]>): void {
  b.createTable(tableName, {
    id: "id",
    code: { type: "text", notNull: true },
    name: { type: "text", notNull: true },
  });
  b.addConstraint(tableName, `${tableName}_unique_enum_code_constraint`, "UNIQUE (code)");
  values.forEach((value) => addEnumValue(b, tableName, value));
}
export function addEnumValue(b: MigrationBuilder, tableName: string, value: [string, string]): void {
  const [code, name] = value;
  validateEnumCode(code);
  b.sql(`INSERT INTO ${tableName} (code, name) VALUES ('${code}', '${name.replace("'", "''")}');`);
}

export function updateEnumValue(
  b: MigrationBuilder,
  tableName: string,
  previousCode: string,
  value: [string, string],
): void {
  const [code, name] = value;
  validateEnumCode(code);
  b.sql(`UPDATE ${tableName} SET code ='${code}', name = '${name.replace("'", "''")}' WHERE code = '${previousCode}';`);
}

function validateEnumCode(code: string): void {
  const codeRegex = /^[A-Z0-9_]+$/;
  if (!codeRegex.test(code))
    throw `ERROR: Invalid enum code specified: ${code}. Codes must match the regex: ${codeRegex}`;
}

/** Makes a trigger to update the `updated_at` column. */
export function createTriggers(b: MigrationBuilder, tableName: string): void {
  b.createTrigger(tableName, `${tableName}_created_at`, {
    when: "BEFORE",
    operation: "INSERT",
    level: "ROW",
    function: "trigger_maybe_set_created_at",
  });
  b.createTrigger(tableName, `${tableName}_updated_at`, {
    when: "BEFORE",
    operation: "UPDATE",
    level: "ROW",
    function: "trigger_maybe_set_updated_at",
  });
}

export function createUpdatedAtFunction(b: MigrationBuilder): void {
  b.createFunction(
    "trigger_maybe_set_updated_at",
    [],
    { replace: true, language: "plpgsql", returns: "TRIGGER" },
    "BEGIN IF NEW.updated_at = OLD.updated_at THEN NEW.updated_at = NOW(); END IF; RETURN NEW; END;",
  );
}

export function createCreatedAtFunction(b: MigrationBuilder): void {
  b.createFunction(
    "trigger_maybe_set_created_at",
    [],
    { replace: true, language: "plpgsql", returns: "TRIGGER" },
    "BEGIN IF NEW.created_at IS NULL THEN NEW.created_at = NOW(); END IF; IF NEW.updated_at IS NULL THEN NEW.updated_at = NOW(); END IF; RETURN NEW; END;",
  );
}

type ForeignKeyOpts = Partial<ColumnDefinition> & Required<Pick<ColumnDefinition, "notNull">> & FieldNameOverrides;
export function foreignKey(otherTable: string, opts: ForeignKeyOpts): ColumnDefinition {
  return {
    type: "integer",
    references: otherTable,
    deferrable: true,
    deferred: true,
    ...maybeForeignKeyOptsWithComment(opts),
  };
}

export function commentData(data: any, comment?: string | null): string {
  return `${comment ?? ""}[pg-structure]${JSON.stringify(data)}[/pg-structure]`;
}

export type FieldNameOverrides = {
  collectionName?: string;
  referenceName?: string;
  oneToOneName?: string;
};
export function maybeForeignKeyOptsWithComment(
  opts: ForeignKeyOpts,
): Exclude<ForeignKeyOpts, keyof FieldNameOverrides> {
  let { comment, referenceName, collectionName, oneToOneName, ...rest } = opts;

  if (referenceName || collectionName || oneToOneName) {
    const overrides = { referenceName, collectionName, oneToOneName };
    return { comment: commentData(overrides, comment), ...rest };
  } else if (comment) {
    return { comment, ...rest };
  } else {
    return rest;
  }
}

export function enumArrayColumn(enumTable: string, opts?: Pick<ColumnDefinition, "notNull">): ColumnDefinition {
  // We use `notNull: false` to facilitate adding to tables with existing rows,
  // but note that we coalesce null to `[]` anyway in the serde logic, so it
  // doesn't really matter to application logic whether it's notNull or not.
  return {
    type: "integer[]",
    comment: `enum=${enumTable}`,
    notNull: false,
    default: PgLiteral.create("array[]::integer[]"),
    ...opts,
  };
}

type ManyToManyColumn = {
  table: string;
  column?: string;
  collectionName?: string;
};

function maybeTableOrColumn(maybeTableOrColumn: string | ManyToManyColumn): [string, string, string | undefined] {
  if (typeof maybeTableOrColumn === "string") {
    return [maybeTableOrColumn, `${singular(maybeTableOrColumn)}_id`, undefined];
  } else {
    const { table, column, collectionName } = maybeTableOrColumn;
    return [table, column ?? `${singular(table)}_id`, collectionName];
  }
}

export function createManyToManyTable(
  b: MigrationBuilder,
  tableName: string,
  table1: string,
  table2: string,
  options?: TableOptions & DropOptions,
): void;
export function createManyToManyTable(
  b: MigrationBuilder,
  tableName: string,
  column1: ManyToManyColumn,
  column2: ManyToManyColumn,
  options?: TableOptions & DropOptions,
): void;
export function createManyToManyTable(
  b: MigrationBuilder,
  tableName: string,
  table1: string,
  column2: ManyToManyColumn,
  options?: TableOptions & DropOptions,
): void;
export function createManyToManyTable(
  b: MigrationBuilder,
  tableName: string,
  column1: ManyToManyColumn,
  table2: string,
  options?: TableOptions & DropOptions,
): void;
export function createManyToManyTable(
  b: MigrationBuilder,
  tableName: string,
  tableOrColumn1: string | ManyToManyColumn,
  tableOrColumn2: string | ManyToManyColumn,
  options?: TableOptions & DropOptions,
) {
  const [table1, column1, collectionName1] = maybeTableOrColumn(tableOrColumn1);
  const [table2, column2, collectionName2] = maybeTableOrColumn(tableOrColumn2);
  b.createTable(
    tableName,
    {
      id: "id",
      [column1]: foreignKey(table1, { notNull: true, onDelete: "CASCADE", collectionName: collectionName1 }),
      [column2]: foreignKey(table2, { notNull: true, onDelete: "CASCADE", collectionName: collectionName2 }),
      created_at: { type: "timestamptz", notNull: true, default: b.func("NOW()") },
    },
    options,
  );
  b.createIndex(tableName, [column1, column2], { unique: true, ifNotExists: options?.ifNotExists });
}

/** Adds columns + auto-indexes any foreign keys. */
export function addColumns(b: MigrationBuilder, tableName: string, columns: ColumnDefinitions): void {
  b.addColumns(tableName, columns);
  Object.entries(columns).forEach(([name, def]) => {
    if (typeof def === "object" && def.references) {
      b.sql(`CREATE INDEX ${tableName}_${name}_idx ON ${tableName} USING btree (${name})`);
    }
  });
}

export function fail(message?: string): never {
  throw new Error(message || "Failed");
}
