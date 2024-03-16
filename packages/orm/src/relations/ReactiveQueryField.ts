import { currentlyInstantiatingEntity } from "../BaseEntity";
import { Entity } from "../Entity";
import { getEmInternalApi } from "../EntityManager";
import { getMetadata } from "../EntityMetadata";
import { getField, isFieldSet, setField } from "../fields";
import { ReactiveField, deepNormalizeHint, isLoaded } from "../index";
import { Reacted, ReactiveHint, convertToLoadHint } from "../reactiveHints";
import { mergeNormalizedHints, tryResolve } from "../utils";
import { AbstractPropertyImpl } from "./AbstractPropertyImpl";
import { AsyncPropertyT } from "./hasAsyncProperty";

/**
 * A `ReactiveQueryField` is a value that is derived from a SQL query, similar to
 * a `ReactiveField`, but when the value needs to be calculated from SQL because
 * it would be too expensive to calculate in-memory.
 *
 * The `fn` lambda will be called when any data referred to by either the `paramHint` or
 * `dbHint` reactive hints have changed, but only the `paramHint`'s data will be pulled
 * into memory.
 */
export function hasReactiveQueryField<
  T extends Entity,
  const H1 extends ReactiveHint<T>,
  const H2 extends ReactiveHint<T>,
  V,
>(
  fieldName: keyof T & string,
  paramHint: H1,
  dbHint: H2,
  fn: (entity: Reacted<T, H1>) => Promise<V>,
): ReactiveField<T, V> {
  const entity = currentlyInstantiatingEntity as T;
  return new ReactiveQueryFieldImpl(entity, fieldName, paramHint, dbHint, fn);
}

export class ReactiveQueryFieldImpl<T extends Entity, H1 extends ReactiveHint<T>, H2 extends ReactiveHint<T>, V>
  extends AbstractPropertyImpl<T>
  implements ReactiveField<T, V>
{
  readonly #paramHint: H1;
  readonly #dbHint: H2;
  #loadPromise: any;
  #loaded: boolean;

  constructor(
    entity: T,
    public fieldName: keyof T & string,
    public paramHint: H1,
    public dbHint: H2,
    private fn: (entity: Reacted<T, H1>) => Promise<V>,
  ) {
    super(entity);
    this.#paramHint = paramHint;
    this.#dbHint = dbHint;
    this.#loaded = false;
  }

  /** Our combined param + db reactivity hint, so that we react to changes within both. */
  get reactiveHint(): ReactiveHint<any> {
    // We do this in a getter (instead of the constructor) b/c it might be a little expensive,
    // and I'm pretty sure this is only called on boot, when hooking up the reactivity.
    const hint = deepNormalizeHint(this.#paramHint);
    mergeNormalizedHints(hint, deepNormalizeHint(this.#dbHint));
    return hint;
  }

  load(opts?: { forceReload?: boolean }): Promise<V> {
    if (!this.isLoaded || opts?.forceReload) {
      return (this.#loadPromise ??= this.entity.em.populate(this.entity, { hint: this.loadHint } as any).then(() => {
        this.#loadPromise = undefined;
        this.#loaded = true;
        // Go through `this.get` so that `setField` is called to set our latest value
        return this.get;
      }));
    }
    return tryResolve(() => this.get);
  }

  /** Returns either the latest calculated value (if loaded) or the previously-calculated value (if not loaded). */
  get get(): V {
    const { fn } = this;
    // Check #loaded to make sure we don't revert to stale values if our subgraph has been changed since
    // the last `.load()`. It's better to fail and tell the user.
    if (this.#loaded || this.isLoaded) {
      const newValue = fn(this.entity as Reacted<T, H1>);
      // It's cheap to set this every time we're called, i.e. even if it's not the
      // official "being called during em.flush" update (...unless we're accessing it
      // during the validate phase of `em.flush`, then skip it to avoid tripping up
      // the "cannot change entities during flush" logic.)
      if (!getEmInternalApi(this.entity.em).isValidating) {
        setField(this.entity, this.fieldName, newValue);
      }
      return newValue as any;
    } else if (this.isSet) {
      return this.fieldValue;
    } else {
      throw new Error(`${this.fieldName} has not been derived yet`);
    }
  }

  get fieldValue(): V {
    return getField(this.entity, this.fieldName);
  }

  get isSet() {
    return isFieldSet(this.entity, this.fieldName);
  }

  get isLoaded() {
    const hintLoaded = isLoaded(this.entity, this.loadHint);
    if (hintLoaded) {
      this.#loaded = true;
    }
    return hintLoaded;
  }

  get loadHint(): any {
    // Only convert the paramHint, so we don't pull the dbHint-referenced data into memory
    const meta = getMetadata(this.entity);
    return (meta.config.__data.cachedReactiveLoadHints[this.fieldName] ??= convertToLoadHint(meta, this.#paramHint));
  }

  [AsyncPropertyT] = undefined as any as T;
}

/** Type guard utility for determining if an entity field is an ReactiveQueryField. */
export function isReactiveQueryField(maybe: any): maybe is ReactiveField<any, any> {
  return maybe instanceof ReactiveQueryFieldImpl;
}

/** Type guard utility for determining if an entity field is a loaded ReactiveQueryField. */
export function isLoadedReactiveQueryField(maybe: any): maybe is ReactiveField<any, any> {
  return isReactiveQueryField(maybe) && maybe.isLoaded;
}
