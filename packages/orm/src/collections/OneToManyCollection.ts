import DataLoader from "dataloader";
import { Collection, ensureNotDeleted, getEm, IdOf } from "../";
import { Entity, EntityMetadata, getMetadata } from "../EntityManager";
import { getOrSet, groupBy, remove } from "../utils";
import { ManyToOneReference } from "./ManyToOneReference";
import { maybeResolveReferenceToId } from "../serde";
import { AbstractRelationImpl } from "./AbstractRelationImpl";

export class OneToManyCollection<T extends Entity, U extends Entity> extends AbstractRelationImpl<U[]>
  implements Collection<T, U> {
  private loaded: U[] | undefined;
  private addedBeforeLoaded: U[] = [];
  private isCascadeDelete: boolean;

  constructor(
    // These are public to our internal implementation but not exposed in the Collection API
    public entity: T,
    public otherMeta: EntityMetadata<U>,
    public fieldName: keyof T,
    public otherFieldName: keyof U,
    public otherColumnName: string,
  ) {
    super();
    this.isCascadeDelete = getMetadata(entity).config.__data.cascadeDeleteFields.includes(fieldName as any);
  }

  private filterDeleted(entities: U[], opts?: { withDeleted?: boolean }): U[] {
    return opts?.withDeleted === true ? [...entities] : entities.filter((e) => !e.isDeletedEntity);
  }

  // opts is an internal parameter
  async load(opts?: { withDeleted?: boolean }): Promise<readonly U[]> {
    ensureNotDeleted(this.entity, { ignore: "pending" });
    if (this.loaded === undefined) {
      if (this.entity.id === undefined) {
        this.loaded = [];
      } else {
        this.loaded = await loaderForCollection(this).load(this.entity.id);
      }
      this.maybeAppendAddedBeforeLoaded();
    }
    return this.filterDeleted(this.loaded, opts);
  }

  async find(id: IdOf<U>): Promise<U | undefined> {
    return (await this.load()).find((u) => u.id === id);
  }

  add(other: U): void {
    ensureNotDeleted(this.entity);
    if (this.loaded === undefined) {
      if (!this.addedBeforeLoaded.includes(other)) {
        this.addedBeforeLoaded.push(other);
      }
    } else {
      if (!this.loaded.includes(other)) {
        this.loaded.push(other);
      }
    }
    // This will no-op and mark other dirty if necessary
    ((other[this.otherFieldName] as any) as ManyToOneReference<U, T, any>).set(this.entity);
  }

  private doGet(): U[] {
    ensureNotDeleted(this.entity, { ignore: "pending" });
    if (this.loaded === undefined) {
      if (this.entity.id === undefined) {
        return this.addedBeforeLoaded;
      } else {
        // This should only be callable in the type system if we've already resolved this to an instance
        throw new Error("get was called when not preloaded");
      }
    }
    return this.loaded;
  }

  get getWithDeleted(): U[] {
    return this.filterDeleted(this.doGet(), { withDeleted: true });
  }

  get get(): U[] {
    return this.filterDeleted(this.doGet(), { withDeleted: false });
  }

  set(values: U[]): void {
    ensureNotDeleted(this.entity);
    if (this.loaded === undefined) {
      throw new Error("set was called when not loaded");
    }
    // Make a copy for safe iteration
    const loaded = [...this.loaded];
    // Remove old values
    for (const other of loaded) {
      if (!values.includes(other)) {
        this.remove(other);
      }
    }
    for (const other of values) {
      if (!loaded.includes(other)) {
        this.add(other);
      }
    }
  }

  // We're not supported remove(other) because that might leave other.otherFieldName as undefined,
  // which we don't know if that's valid or not, i.e. depending on whether the field is nullable.
  remove(other: U, opts: { requireLoaded: boolean } = { requireLoaded: true }) {
    ensureNotDeleted(this.entity, { ignore: "pending" });
    if (this.loaded === undefined && opts.requireLoaded) {
      throw new Error("remove was called when not loaded");
    }
    // This will no-op and mark other dirty if necessary
    remove(this.loaded || this.addedBeforeLoaded, other);
    ((other[this.otherFieldName] as any) as ManyToOneReference<U, T, any>).set(undefined);
  }

  removeAll(): void {
    ensureNotDeleted(this.entity);
    if (this.loaded === undefined) {
      throw new Error("removeAll was called when not loaded");
    }
    for (const other of [...this.loaded]) {
      this.remove(other);
    }
  }

  // internal impl

  setFromOpts(others: U[]): void {
    this.loaded = [];
    others.forEach((o) => this.add(o));
  }

  initializeForNewEntity(): void {
    // Don't overwrite any opts values
    if (this.loaded === undefined) {
      this.loaded = [];
    }
  }

  removeIfLoaded(other: U) {
    if (this.loaded !== undefined) {
      remove(this.loaded, other);
    } else {
      remove(this.addedBeforeLoaded, other);
    }
  }

  async refreshIfLoaded(): Promise<void> {
    // TODO We should remember what load hints have been applied to this collection and re-apply them.
    if (this.loaded !== undefined && this.entity.id !== undefined) {
      const loader = loaderForCollection(this);
      loader.clear(this.entity.id);
      this.loaded = await loader.load(this.entity.id);
    }
  }

  onEntityDelete(): void {
    if (this.isCascadeDelete) {
      this.current({ withDeleted: true }).forEach(getEm(this.entity).delete);
    }
  }

  // We already unhooked all children in our addedBeforeLoaded list; now load the full list if necessary.
  async onEntityDeletedAndFlushing(): Promise<void> {
    const current = await this.load({ withDeleted: true });
    current.forEach((other) => {
      const m2o = (other[this.otherFieldName] as any) as ManyToOneReference<U, T, any>;
      if (maybeResolveReferenceToId(m2o.current()) === this.entity.id) {
        // TODO What if other.otherFieldName is required/not-null?
        m2o.set(undefined);
      }
    });
    this.loaded = [];
    this.addedBeforeLoaded = [];
  }

  private maybeAppendAddedBeforeLoaded(): void {
    if (this.loaded) {
      const newEntities = this.addedBeforeLoaded.filter((e) => !this.loaded?.includes(e));
      this.loaded.unshift(...newEntities);
      this.addedBeforeLoaded = [];
    }
  }

  current(opts?: { withDeleted?: boolean }): U[] {
    return this.filterDeleted(this.loaded || this.addedBeforeLoaded, opts);
  }

  public toString(): string {
    return `OneToManyCollection(entity: ${this.entity}, fieldName: ${this.fieldName}, otherType: ${this.otherMeta.type}, otherFieldName: ${this.otherFieldName})`;
  }
}

function loaderForCollection<T extends Entity, U extends Entity>(
  collection: OneToManyCollection<T, U>,
): DataLoader<string, U[]> {
  const em = getEm(collection.entity);
  // The metadata for the entity that contains the collection
  const meta = getMetadata(collection.entity);
  const loaderName = `${meta.tableName}.${collection.fieldName}`;
  return getOrSet(em.__data.loaders, loaderName, () => {
    return new DataLoader<string, U[]>(async (keys) => {
      const otherMeta = collection.otherMeta;

      const rows = await em.knex
        .select("*")
        .from(otherMeta.tableName)
        .whereIn(collection.otherColumnName, keys as string[])
        .orderBy("id");

      const entities = rows.map((row) => em.hydrate(otherMeta.cstr, row, { overwriteExisting: false }));
      // .filter((e) => !e.isDeletedEntity);

      const rowsById = groupBy(entities, (entity) => {
        // TODO If this came from the UoW, it may not be an id? I.e. pre-insert.
        const ownerId = maybeResolveReferenceToId(entity.__orm.data[collection.otherFieldName]);
        // We almost always expect ownerId to be found, b/c normally we just hydrated this entity
        // directly from a SQL row with owner_id=X, however we might be loading this collection
        // (i.e. find all children where owner_id=X) when the SQL thinks a child is still pointing
        // at the parent (i.e. owner_id=X in the db), but our already-loaded child has had its
        // `child.owner` field either changed to some other owner, or set to undefined. In either,
        // that child should no longer be parent of this owner's collection, so just return a
        // dummy value.
        return ownerId ?? "dummyNoLongerOwned";
      });
      return keys.map((k) => rowsById.get(k) || []);
    });
  });
}
