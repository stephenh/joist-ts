import Knex, { QueryBuilder } from "knex";
import { fail } from "./utils";
import { Entity, EntityConstructor, EntityMetadata, getMetadata, isEntity, FilterOf } from "./EntityManager";
import { ForeignKeySerde } from "./serde";

export type ValueFilter<V, N> = V | N | { $gt: V } | { $gte: V } | { $ne: V | N } | { $lt: V } | { $lte: V } | { $like: V };

// For filtering by a foreign key T, i.e. either joining/recursing into with FilterQuery<T>, or matching it is null/not null/etc.
export type EntityFilter<T, I, F, N> = T | I | F | N | { $ne: T | I | N };

const operators = ["$gt", "$gte", "$ne", "$lt", "$lte", "$like"] as const;
type Operator = typeof operators[number];
const opToFn: Record<Operator, string> = {
  $gt: ">",
  $gte: ">=",
  $ne: "!=",
  $lt: "<",
  $lte: "<=",
  $like: "LIKE",
};

/**
 * Builds the SQL/knex queries for `EntityManager.find` calls.
 *
 * Note this is generally for our own internal implementation details and not meant to
 * be a user-facing QueryBuilder, i.e. users should use Knex for that and just use SQL
 * directly (for any non-trivial queries that `EntityManager.find` does not support).
 */
export function buildQuery<T extends Entity>(
  knex: Knex,
  type: EntityConstructor<T>,
  where: FilterOf<T>,
): QueryBuilder<{}, unknown[]> {
  const meta = getMetadata(type);

  const aliases: Record<string, number> = {};
  function getAlias(tableName: string): string {
    const abbrev = abbreviation(tableName);
    const i = aliases[abbrev] || 0;
    aliases[abbrev] = i + 1;
    return `${abbrev}${i}`;
  }

  const alias = getAlias(meta.tableName);
  let query: QueryBuilder<any, any> = knex
    .select<unknown>(`${alias}.*`)
    .from(`${meta.tableName} AS ${alias}`)
    .orderBy(`${alias}.id`);

  // Define a function for recursively adding joins & filters
  function addClauses(meta: EntityMetadata<any>, alias: string, where: any): void {
    Object.entries(where).forEach(([key, clause]) => {
      const column = meta.columns.find(c => c.fieldName === key) || fail(`${key} not found`);
      if (column.serde instanceof ForeignKeySerde) {
        const clauseKeys = typeof clause === "object" && clause !== null ? Object.keys(clause as object) : [];
        if (isEntity(clause) || typeof clause == "string") {
          // This is a ForeignKey clause but we don't need to join into the other side
          query = query.where(`${alias}.${column.columnName}`, column.serde.mapToDb(clause));
        } else if (clause === null || clause === undefined) {
          query = query.whereNull(`${alias}.${column.columnName}`);
        } else if (clauseKeys.length === 1 && clauseKeys[0] === "id") {
          // If only querying on the id, we can skip the join
          query = query.where(`${alias}.${column.columnName}`, (clause as any)["id"]);
        } else if (clauseKeys.length === 1 && clauseKeys[0] === "$ne") {
          const value = (clause as any)["$ne"];
          if (value === null || value === undefined) {
            query = query.whereNotNull(`${alias}.${column.columnName}`);
          } else if (typeof value === "string") {
            query = query.whereNot(`${alias}.${column.columnName}`, value);
          } else {
            throw new Error("Not implemented");
          }
        } else {
          // Add a join for this column
          const otherMeta = column.serde.otherMeta();
          const otherAlias = getAlias(otherMeta.tableName);
          query = query.innerJoin(
            `${otherMeta.tableName} AS ${otherAlias}`,
            `${alias}.${column.columnName}`,
            `${otherAlias}.id`,
          );
          // Then recurse to add its conditions to the query
          addClauses(otherMeta, otherAlias, clause);
        }
      } else if (clause instanceof Object && operators.find(p => Object.keys(clause).includes(p))) {
        // This is a `field: { $op: value }`
        const p = Object.keys(clause)[0] as Operator;
        const value = (clause as any)[p];
        if (value === null || value === undefined) {
          if (p === "$ne") {
            query = query.whereNotNull(`${alias}.${column.columnName}`);
          } else {
            throw new Error("Only $ne is supported when the value is undefined or null")
          }
        } else {
          const fn = opToFn[p];
          query = query.where(`${alias}.${column.columnName}`, fn, column.serde.mapToDb(value));
        }
      } else {
        // TODO In theory could add a addToQuery method to Serde to generalize this to multi-columns fields.
        query = query.where(`${alias}.${column.columnName}`, column.serde.mapToDb(clause));
      }
    });
  }

  addClauses(meta, alias, where);

  return query as QueryBuilder<{}, unknown[]>;
}

function abbreviation(tableName: string): string {
  return tableName
    .split("_")
    .map(w => w[0])
    .join();
}
