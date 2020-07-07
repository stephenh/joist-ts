import { currentlyInstantiatingEntity, getEm, Collection } from "../";
import { Entity, Loaded, LoadHint } from "../EntityManager";
import { CustomCollection } from "./CustomCollection";

type HasManyDerivedOpts<T extends Entity, U extends Entity, H extends LoadHint<T>> = {
  load?: (entity: T) => Promise<void | any>;
  get: (entity: Loaded<T, H>) => U[];
  set?: (entity: Loaded<T, H>, values: U[]) => void;
  add?: (entity: Loaded<T, H>, value: U) => void;
  remove?: (entity: Loaded<T, H>, value: U) => void;
};
/**
 * Creates a CustomCollection that can conditionally walk across references in the object graph.
 *
 * I.e. An Author "has many reviews" through the `author -> books -> reviews` relation.
 *
 * Because this is based on `CustomCollection`, it will work in populates, i.e. `em.populate(author, "reviews")`.
 */
export function hasManyDerived<T extends Entity, U extends Entity, H extends LoadHint<T>>(
  loadHint: H,
  opts: HasManyDerivedOpts<T, U, H>,
): Collection<T, U> {
  const entity: T = currentlyInstantiatingEntity as T;
  const { load, get, set, add, remove } = opts;
  return new CustomCollection<T, U>(entity, {
    load: load ?? (async (entity) => await getEm(entity).populate(entity, loadHint)),
    get: () => get(entity as Loaded<T, H>),
    set: set !== undefined ? (_, values) => set(entity as Loaded<T, H>, values) : undefined,
    add: add !== undefined ? (_, value) => add(entity as Loaded<T, H>, value) : undefined,
    remove: remove !== undefined ? (_, value) => remove(entity as Loaded<T, H>, value) : undefined,
  });
}
