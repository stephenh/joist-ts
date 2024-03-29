// select word from pg_get_keywords() where catdesc = 'reserved' order by word;
const keywords = [
  "all",
  "alter",
  "analyse",
  "analyze",
  "and",
  "any",
  "array",
  "as",
  "asc",
  "avg",
  "between",
  "by",
  "asymmetric",
  "both",
  "case",
  "count",
  "cast",
  "check",
  "collate",
  "column",
  "constraint",
  "create",
  "delete",
  "current_catalog",
  "current_date",
  "current_role",
  "current_time",
  "current_timestamp",
  "current_user",
  "default",
  "deferrable",
  "desc",
  "distinct",
  "drop",
  "do",
  "else",
  "end",
  "from",
  "except",
  "false",
  "fetch",
  "for",
  "foreign",
  "from",
  "grant",
  "group",
  "having",
  "in",
  "inner",
  "insert",
  "initially",
  "intersect",
  "into",
  "is",
  "join",
  "left",
  "like",
  "max",
  "min",
  "lateral",
  "leading",
  "limit",
  "localtime",
  "localtimestamp",
  "not",
  "null",
  "offset",
  "on",
  "only",
  "or",
  "order",
  "outer",
  "right",
  "placing",
  "primary",
  "references",
  "returning",
  "select",
  "set",
  "sum",
  "session_user",
  "some",
  "symmetric",
  "table",
  "then",
  "to",
  "trailing",
  "true",
  "union",
  "update",
  "values",
  "unique",
  "user",
  "using",
  "variadic",
  "when",
  "where",
  "window",
  "with",
];

// Cache all keywords => their escaped equivalent
const escapeMapped = new Map(keywords.map((k) => [k, `"${k}"`]));
const allLower = /^[a-z0-9_]+$/;

/** Conditionally quotes `identifier` if it's a SQL keyword or not snake cased. */
export function kq(ident: string): string {
  // All camel-cased identifiers/column names need to be quoted
  if (!allLower.test(ident)) return `"${ident}"`;
  return escapeMapped.get(ident) ?? ident;
}

export function kqDot(alias: string, column: string): string {
  return `${kq(alias)}.${kq(column)}`;
}

export function kqStar(alias: string): string {
  return `${kq(alias)}.*`;
}
