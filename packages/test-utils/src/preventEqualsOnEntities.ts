import { BaseEntity } from "joist-orm";

export function preventEqualsOnEntities(a: unknown, b: unknown): boolean | undefined {
  if (a instanceof BaseEntity || b instanceof BaseEntity) {
    throw new Error("Use toMatchEntity for comparing entities");
  }
  return undefined;
}
