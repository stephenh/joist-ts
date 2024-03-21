import { Entity } from "joist-orm";
import { MatchedEntity } from "./toMatchEntity";
export { Context } from "./context";
export { preventEqualsOnEntities } from "./preventEqualsOnEntities";
export { ContextFn, makeRun, makeRunEach, newContext, run, runEach } from "./run";
export { toBeEntities } from "./toBeEntities";
export { toBeEntity } from "./toBeEntity";
export { toMatchEntity } from "./toMatchEntity";

declare global {
  namespace jest {
    interface Matchers<R, T = {}> {
      /** A `toMatchObject`-like matcher that will correctly diff Joist entities against an object literal structure. */
      toMatchEntity(expected: MatchedEntity<T>): CustomMatcherResult;

      /** A `toEqual`-like matcher that will correctly diff a Joist. */
      toBeEntity(expected: Entity): CustomMatcherResult;

      /** A `toEqual`-like matcher that will correctly diff multiple Joist entities. */
      toBeEntities(expected: Entity[]): CustomMatcherResult;
    }
  }
}
