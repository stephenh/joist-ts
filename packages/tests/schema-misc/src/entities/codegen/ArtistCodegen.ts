import {
  BaseEntity,
  Changes,
  cleanStringValue,
  Collection,
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
  hasMany,
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
import { Artist, artistMeta, Entity, EntityManager, newArtist, Painting, PaintingId, paintingMeta } from "../entities";

export type ArtistId = Flavor<string, Artist>;

export interface ArtistFields {
  id: { kind: "primitive"; type: string; unique: true; nullable: never };
  firstName: { kind: "primitive"; type: string; unique: false; nullable: never; derived: false };
  lastName: { kind: "primitive"; type: string; unique: false; nullable: never; derived: false };
  createdAt: { kind: "primitive"; type: Date; unique: false; nullable: never; derived: true };
  updatedAt: { kind: "primitive"; type: Date; unique: false; nullable: never; derived: true };
}

export interface ArtistOpts {
  firstName: string;
  lastName: string;
  paintings?: Painting[];
}

export interface ArtistIdsOpts {
  paintingIds?: PaintingId[] | null;
}

export interface ArtistFilter {
  id?: ValueFilter<ArtistId, never> | null;
  firstName?: ValueFilter<string, never>;
  lastName?: ValueFilter<string, never>;
  createdAt?: ValueFilter<Date, never>;
  updatedAt?: ValueFilter<Date, never>;
  paintings?: EntityFilter<Painting, PaintingId, FilterOf<Painting>, null | undefined>;
}

export interface ArtistGraphQLFilter {
  id?: ValueGraphQLFilter<ArtistId>;
  firstName?: ValueGraphQLFilter<string>;
  lastName?: ValueGraphQLFilter<string>;
  createdAt?: ValueGraphQLFilter<Date>;
  updatedAt?: ValueGraphQLFilter<Date>;
  paintings?: EntityGraphQLFilter<Painting, PaintingId, GraphQLFilterOf<Painting>, null | undefined>;
}

export interface ArtistOrder {
  id?: OrderBy;
  firstName?: OrderBy;
  lastName?: OrderBy;
  createdAt?: OrderBy;
  updatedAt?: OrderBy;
}

export const artistConfig = new ConfigApi<Artist, Context>();

artistConfig.addRule(newRequiredRule("firstName"));
artistConfig.addRule(newRequiredRule("lastName"));
artistConfig.addRule(newRequiredRule("createdAt"));
artistConfig.addRule(newRequiredRule("updatedAt"));

export abstract class ArtistCodegen extends BaseEntity<EntityManager, string> implements Entity {
  static readonly tagName = "artist";
  static readonly metadata: EntityMetadata<Artist>;

  declare readonly __orm: EntityOrmField & {
    filterType: ArtistFilter;
    gqlFilterType: ArtistGraphQLFilter;
    orderType: ArtistOrder;
    optsType: ArtistOpts;
    fieldsType: ArtistFields;
    optIdsType: ArtistIdsOpts;
    factoryOptsType: Parameters<typeof newArtist>[1];
  };

  constructor(em: EntityManager, opts: ArtistOpts) {
    super(em, opts);
    setOpts(this as any as Artist, opts, { calledFromConstructor: true });
  }

  get id(): ArtistId {
    return this.idMaybe || failNoIdYet("Artist");
  }

  get idMaybe(): ArtistId | undefined {
    return toIdOf(artistMeta, this.idTaggedMaybe);
  }

  get idTagged(): TaggedId {
    return this.idTaggedMaybe || failNoIdYet("Artist");
  }

  get idTaggedMaybe(): TaggedId | undefined {
    return getField(this, "id");
  }

  get firstName(): string {
    return getField(this, "firstName");
  }

  set firstName(firstName: string) {
    setField(this, "firstName", cleanStringValue(firstName));
  }

  get lastName(): string {
    return getField(this, "lastName");
  }

  set lastName(lastName: string) {
    setField(this, "lastName", cleanStringValue(lastName));
  }

  get createdAt(): Date {
    return getField(this, "createdAt");
  }

  get updatedAt(): Date {
    return getField(this, "updatedAt");
  }

  set(opts: Partial<ArtistOpts>): void {
    setOpts(this as any as Artist, opts);
  }

  setPartial(opts: PartialOrNull<ArtistOpts>): void {
    setOpts(this as any as Artist, opts as OptsOf<Artist>, { partial: true });
  }

  get changes(): Changes<Artist> {
    return newChangesProxy(this) as any;
  }

  load<U, V>(fn: (lens: Lens<Artist>) => Lens<U, V>, opts: { sql?: boolean } = {}): Promise<V> {
    return loadLens(this as any as Artist, fn, opts);
  }

  populate<H extends LoadHint<Artist>>(hint: H): Promise<Loaded<Artist, H>>;
  populate<H extends LoadHint<Artist>>(opts: { hint: H; forceReload?: boolean }): Promise<Loaded<Artist, H>>;
  populate<H extends LoadHint<Artist>, V>(hint: H, fn: (artist: Loaded<Artist, H>) => V): Promise<V>;
  populate<H extends LoadHint<Artist>, V>(
    opts: { hint: H; forceReload?: boolean },
    fn: (artist: Loaded<Artist, H>) => V,
  ): Promise<V>;
  populate<H extends LoadHint<Artist>, V>(
    hintOrOpts: any,
    fn?: (artist: Loaded<Artist, H>) => V,
  ): Promise<Loaded<Artist, H> | V> {
    return this.em.populate(this as any as Artist, hintOrOpts, fn);
  }

  isLoaded<H extends LoadHint<Artist>>(hint: H): this is Loaded<Artist, H> {
    return isLoaded(this as any as Artist, hint);
  }

  get paintings(): Collection<Artist, Painting> {
    const { relations } = getOrmField(this);
    return relations.paintings ??= hasMany(
      this as any as Artist,
      paintingMeta,
      "paintings",
      "artist",
      "artistId",
      undefined,
    );
  }
}
