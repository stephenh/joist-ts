import { Entity } from "./Entity";
import { EntityConstructor } from "./EntityManager";
import { getMetadata } from "./EntityMetadata";
import { LoadHint, ReactiveHint } from "./loaded";
import { fail } from "./utils";

/**
 * Given a load hint of "given an entity, load these N things", return an array
 * of what those N things are, and reversed load hints to "come back" to the
 * original entity.
 *
 * For example given a hint of `publisher -> authors -> { books, comments }`,
 * return `[Book, [author, publisher]]` and `[Comment, [author, publisher]]`.
 */
export function reverseHint<T extends Entity>(entityType: EntityConstructor<T>, hint: LoadHint<T>): ReactiveTarget[] {
  const meta = getMetadata(entityType);
  return Object.entries(normalizeHint(hint)).flatMap(([key, subHint]) => {
    const field = meta.fields[key] || fail(`Invalid hint ${entityType.name} ${JSON.stringify(hint)}`);
    if (field.kind !== "m2m" && field.kind !== "m2o" && field.kind !== "o2m" && field.kind !== "o2o") {
      throw new Error("Invalid hint");
    }
    const otherMeta = field.otherMetadata();
    const me = { entity: otherMeta.cstr, fields: [field.otherFieldName], path: [field.otherFieldName] };
    return [
      me,
      ...reverseHint(otherMeta.cstr, subHint).map(({ entity, fields, path }) => {
        return { entity, fields, path: [...path, field.otherFieldName] };
      }),
    ];
  });
}

export function reverseHint2<T extends Entity>(
  entityType: EntityConstructor<T>,
  hint: ReactiveHint<T>,
): ReactiveTarget[] {
  const meta = getMetadata(entityType);
  const primitives: string[] = [];
  const subHints = Object.entries(normalizeHint(hint)).flatMap(([key, subHint]) => {
    const field = meta.fields[key] || fail(`Invalid hint ${entityType.name} ${JSON.stringify(hint)}`);
    switch (field.kind) {
      case "m2m":
      case "m2o":
      case "o2m":
      case "o2o": {
        const otherMeta = field.otherMetadata();
        const me = { entity: otherMeta.cstr, fields: [field.otherFieldName], path: [field.otherFieldName] };
        return [
          // me,
          ...reverseHint2(otherMeta.cstr, subHint).map(({ entity, fields, path }) => {
            return { entity, fields, path: [...path, field.otherFieldName] };
          }),
        ];
      }
      case "primitive":
        primitives.push(key);
        return [];
      default:
        throw new Error("Invalid hint");
    }
  });
  if (primitives.length === 0) {
    return subHints;
  } else {
    return [{ entity: entityType, fields: primitives, path: [] }, ...subHints];
  }
}

export interface ReactiveTarget {
  entity: EntityConstructor<any>;
  fields: string[];
  path: string[];
}

function normalizeHint<T extends Entity>(hint: LoadHint<T> | ReactiveHint<T>): object {
  if (typeof hint === "string") {
    return { [hint]: {} };
  } else if (Array.isArray(hint)) {
    return Object.fromEntries(hint.map((field) => [field, {}]));
  } else {
    return hint;
  }
}
