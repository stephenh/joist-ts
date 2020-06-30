import { AbstractRelationImpl } from "./collections/AbstractRelationImpl";
import * as EM from "./EntityManager";
import { Entity, EntityMetadata } from "./EntityManager";

// Hack to make currentlyInstantiatingEntity assignable
const em = EM;

/**
 * Returns the relations in `meta`, both those defined in the codegen file + any user-defined `CustomReference`s.
 *
 * This is a little tricky because field assignments don't show up on the prototype, so we actually
 * instantiate a throw-away instance to observe the side-effect of what fields it has.
 */
export function getRelationNames<T extends Entity>(meta: EntityMetadata<T>): string[] {
  return Object.entries(
    new meta.cstr(
      {
        register: (entity: any) => {
          em.currentlyInstantiatingEntity = entity;
        },
      } as any,
      {},
    ),
  )
    .filter(([key, value]) => value instanceof AbstractRelationImpl)
    .map(([key]) => key);
}
