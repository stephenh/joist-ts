import {
  BaseEntity,
  Changes,
  cleanStringValue,
  ConfigApi,
  EntityFilter,
  EntityGraphQLFilter,
  EntityMetadata,
  EntityOrmField,
  failNoIdYet,
  FilterOf,
  Flavor,
  getField,
  getOrmField,
  GraphQLFilterOf,
  hasOne,
  isLoaded,
  Lens,
  Loaded,
  LoadHint,
  loadLens,
  ManyToOneReference,
  newChangesProxy,
  newRequiredRule,
  OptsOf,
  OrderBy,
  PartialOrNull,
  setField,
  setOpts,
  TaggedId,
  toIdOf,
  ValueFilter,
  ValueGraphQLFilter,
} from "joist-orm";
import { Context } from "src/context";
import {
  ChildGroup,
  ChildGroupId,
  childGroupMeta,
  ChildGroupOrder,
  ChildItem,
  childItemMeta,
  Entity,
  EntityManager,
  newChildItem,
  ParentItem,
  ParentItemId,
  parentItemMeta,
  ParentItemOrder,
} from "./entities";

export type ChildItemId = Flavor<string, ChildItem>;

export interface ChildItemFields {
  id: { kind: "primitive"; type: number; unique: true; nullable: never };
  name: { kind: "primitive"; type: string; unique: false; nullable: undefined; derived: false };
  createdAt: { kind: "primitive"; type: Date; unique: false; nullable: never; derived: true };
  updatedAt: { kind: "primitive"; type: Date; unique: false; nullable: never; derived: true };
  childGroup: { kind: "m2o"; type: ChildGroup; nullable: never; derived: false };
  parentItem: { kind: "m2o"; type: ParentItem; nullable: never; derived: false };
}

export interface ChildItemOpts {
  name?: string | null;
  childGroup: ChildGroup | ChildGroupId;
  parentItem: ParentItem | ParentItemId;
}

export interface ChildItemIdsOpts {
  childGroupId?: ChildGroupId | null;
  parentItemId?: ParentItemId | null;
}

export interface ChildItemFilter {
  id?: ValueFilter<ChildItemId, never> | null;
  name?: ValueFilter<string, null>;
  createdAt?: ValueFilter<Date, never>;
  updatedAt?: ValueFilter<Date, never>;
  childGroup?: EntityFilter<ChildGroup, ChildGroupId, FilterOf<ChildGroup>, never>;
  parentItem?: EntityFilter<ParentItem, ParentItemId, FilterOf<ParentItem>, never>;
}

export interface ChildItemGraphQLFilter {
  id?: ValueGraphQLFilter<ChildItemId>;
  name?: ValueGraphQLFilter<string>;
  createdAt?: ValueGraphQLFilter<Date>;
  updatedAt?: ValueGraphQLFilter<Date>;
  childGroup?: EntityGraphQLFilter<ChildGroup, ChildGroupId, GraphQLFilterOf<ChildGroup>, never>;
  parentItem?: EntityGraphQLFilter<ParentItem, ParentItemId, GraphQLFilterOf<ParentItem>, never>;
}

export interface ChildItemOrder {
  id?: OrderBy;
  name?: OrderBy;
  createdAt?: OrderBy;
  updatedAt?: OrderBy;
  childGroup?: ChildGroupOrder;
  parentItem?: ParentItemOrder;
}

export const childItemConfig = new ConfigApi<ChildItem, Context>();

childItemConfig.addRule(newRequiredRule("createdAt"));
childItemConfig.addRule(newRequiredRule("updatedAt"));
childItemConfig.addRule(newRequiredRule("childGroup"));
childItemConfig.addRule(newRequiredRule("parentItem"));

export abstract class ChildItemCodegen extends BaseEntity<EntityManager, string> implements Entity {
  static defaultValues: object = {};
  static readonly tagName = "ci";
  static readonly metadata: EntityMetadata<ChildItem>;

  declare readonly __orm: EntityOrmField & {
    filterType: ChildItemFilter;
    gqlFilterType: ChildItemGraphQLFilter;
    orderType: ChildItemOrder;
    optsType: ChildItemOpts;
    fieldsType: ChildItemFields;
    optIdsType: ChildItemIdsOpts;
    factoryOptsType: Parameters<typeof newChildItem>[1];
  };

  constructor(em: EntityManager, opts: ChildItemOpts) {
    super(em, childItemMeta, ChildItemCodegen.defaultValues, opts);
    setOpts(this as any as ChildItem, opts, { calledFromConstructor: true });
  }

  get id(): ChildItemId {
    return this.idMaybe || failNoIdYet("ChildItem");
  }

  get idMaybe(): ChildItemId | undefined {
    return toIdOf(childItemMeta, this.idTaggedMaybe);
  }

  get idTagged(): TaggedId {
    return this.idTaggedMaybe || failNoIdYet("ChildItem");
  }

  get idTaggedMaybe(): TaggedId | undefined {
    return getField(this, "id");
  }

  get name(): string | undefined {
    return getField(this, "name");
  }

  set name(name: string | undefined) {
    setField(this, "name", cleanStringValue(name));
  }

  get createdAt(): Date {
    return getField(this, "createdAt");
  }

  get updatedAt(): Date {
    return getField(this, "updatedAt");
  }

  set(opts: Partial<ChildItemOpts>): void {
    setOpts(this as any as ChildItem, opts);
  }

  setPartial(opts: PartialOrNull<ChildItemOpts>): void {
    setOpts(this as any as ChildItem, opts as OptsOf<ChildItem>, { partial: true });
  }

  get changes(): Changes<ChildItem> {
    return newChangesProxy(this) as any;
  }

  load<U, V>(fn: (lens: Lens<ChildItem>) => Lens<U, V>, opts: { sql?: boolean } = {}): Promise<V> {
    return loadLens(this as any as ChildItem, fn, opts);
  }

  populate<H extends LoadHint<ChildItem>>(hint: H): Promise<Loaded<ChildItem, H>>;
  populate<H extends LoadHint<ChildItem>>(opts: { hint: H; forceReload?: boolean }): Promise<Loaded<ChildItem, H>>;
  populate<H extends LoadHint<ChildItem>, V>(hint: H, fn: (ci: Loaded<ChildItem, H>) => V): Promise<V>;
  populate<H extends LoadHint<ChildItem>, V>(
    opts: { hint: H; forceReload?: boolean },
    fn: (ci: Loaded<ChildItem, H>) => V,
  ): Promise<V>;
  populate<H extends LoadHint<ChildItem>, V>(
    hintOrOpts: any,
    fn?: (ci: Loaded<ChildItem, H>) => V,
  ): Promise<Loaded<ChildItem, H> | V> {
    return this.em.populate(this as any as ChildItem, hintOrOpts, fn);
  }

  isLoaded<H extends LoadHint<ChildItem>>(hint: H): this is Loaded<ChildItem, H> {
    return isLoaded(this as any as ChildItem, hint);
  }

  get childGroup(): ManyToOneReference<ChildItem, ChildGroup, never> {
    const { relations } = getOrmField(this);
    return relations.childGroup ??= hasOne(this as any as ChildItem, childGroupMeta, "childGroup", "childItems");
  }

  get parentItem(): ManyToOneReference<ChildItem, ParentItem, never> {
    const { relations } = getOrmField(this);
    return relations.parentItem ??= hasOne(this as any as ChildItem, parentItemMeta, "parentItem", "childItems");
  }
}
