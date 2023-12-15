import {
  Changes,
  cleanStringValue,
  ConfigApi,
  EntityMetadata,
  EntityOrmField,
  failNoIdYet,
  Flavor,
  getField,
  isLoaded,
  Lens,
  Loaded,
  LoadHint,
  loadLens,
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
  AdminUser,
  adminUserMeta,
  Entity,
  EntityManager,
  newAdminUser,
  User,
  UserFields,
  UserFilter,
  UserGraphQLFilter,
  UserIdsOpts,
  UserOpts,
  UserOrder,
} from "./entities";

export type AdminUserId = Flavor<string, AdminUser> & Flavor<string, "User">;

export interface AdminUserFields extends UserFields {
  id: { kind: "primitive"; type: number; unique: true; nullable: never };
  role: { kind: "primitive"; type: string; unique: false; nullable: never; derived: false };
}

export interface AdminUserOpts extends UserOpts {
  role: string;
}

export interface AdminUserIdsOpts extends UserIdsOpts {
}

export interface AdminUserFilter extends UserFilter {
  role?: ValueFilter<string, never>;
}

export interface AdminUserGraphQLFilter extends UserGraphQLFilter {
  role?: ValueGraphQLFilter<string>;
}

export interface AdminUserOrder extends UserOrder {
  role?: OrderBy;
}

export const adminUserConfig = new ConfigApi<AdminUser, Context>();

adminUserConfig.addRule(newRequiredRule("role"));

export abstract class AdminUserCodegen extends User implements Entity {
  static defaultValues: object = {};
  static readonly tagName = "u";
  static readonly metadata: EntityMetadata<AdminUser>;

  declare readonly __orm: EntityOrmField & {
    filterType: AdminUserFilter;
    gqlFilterType: AdminUserGraphQLFilter;
    orderType: AdminUserOrder;
    optsType: AdminUserOpts;
    fieldsType: AdminUserFields;
    optIdsType: AdminUserIdsOpts;
    factoryOptsType: Parameters<typeof newAdminUser>[1];
  };

  constructor(em: EntityManager, opts: AdminUserOpts) {
    // @ts-ignore
    super(em, adminUserMeta, AdminUserCodegen.defaultValues, opts);
    setOpts(this as any as AdminUser, opts, { calledFromConstructor: true });
  }

  get id(): AdminUserId {
    return this.idMaybe || failNoIdYet("AdminUser");
  }

  get idMaybe(): AdminUserId | undefined {
    return toIdOf(adminUserMeta, this.idTaggedMaybe);
  }

  get idTagged(): TaggedId {
    return this.idTaggedMaybe || failNoIdYet("AdminUser");
  }

  get idTaggedMaybe(): TaggedId | undefined {
    return getField(this, "id");
  }

  get role(): string {
    return getField(this, "role");
  }

  set role(role: string) {
    setField(this, "role", cleanStringValue(role));
  }

  set(opts: Partial<AdminUserOpts>): void {
    setOpts(this as any as AdminUser, opts);
  }

  setPartial(opts: PartialOrNull<AdminUserOpts>): void {
    setOpts(this as any as AdminUser, opts as OptsOf<AdminUser>, { partial: true });
  }

  get changes(): Changes<AdminUser> {
    return newChangesProxy(this) as any;
  }

  load<U, V>(fn: (lens: Lens<AdminUser>) => Lens<U, V>, opts: { sql?: boolean } = {}): Promise<V> {
    return loadLens(this as any as AdminUser, fn, opts);
  }

  populate<H extends LoadHint<AdminUser>>(hint: H): Promise<Loaded<AdminUser, H>>;
  populate<H extends LoadHint<AdminUser>>(opts: { hint: H; forceReload?: boolean }): Promise<Loaded<AdminUser, H>>;
  populate<H extends LoadHint<AdminUser>, V>(hint: H, fn: (u: Loaded<AdminUser, H>) => V): Promise<V>;
  populate<H extends LoadHint<AdminUser>, V>(
    opts: { hint: H; forceReload?: boolean },
    fn: (u: Loaded<AdminUser, H>) => V,
  ): Promise<V>;
  populate<H extends LoadHint<AdminUser>, V>(
    hintOrOpts: any,
    fn?: (u: Loaded<AdminUser, H>) => V,
  ): Promise<Loaded<AdminUser, H> | V> {
    return this.em.populate(this as any as AdminUser, hintOrOpts, fn);
  }

  isLoaded<H extends LoadHint<AdminUser>>(hint: H): this is Loaded<AdminUser | User, H> {
    return isLoaded(this as any as AdminUser, hint);
  }
}
