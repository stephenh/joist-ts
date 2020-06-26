import {
  Flavor,
  ValueFilter,
  ValueGraphQLFilter,
  OrderBy,
  ConfigApi,
  BaseEntity,
  EntityManager,
  setOpts,
  OptsOf,
  PartialOrNull,
  Changes,
  newChangesProxy,
  Lens,
  loadLens,
  Entity,
  Reference,
  hasOneThrough,
  LoadHint,
  Loaded,
  getEm,
  EntityFilter,
  FilterOf,
  EnumGraphQLFilter,
  EntityGraphQLFilter,
  GraphQLFilterOf,
  newRequiredRule,
  setField,
  ManyToOneReference,
} from "joist-orm";
import {
  Image,
  imageMeta,
  ImageType,
  Author,
  Book,
  Publisher,
  AuthorId,
  BookId,
  PublisherId,
  AuthorOrder,
  BookOrder,
  PublisherOrder,
} from "./entities";

export type ImageId = Flavor<string, "Image">;

export interface ImageOpts {
  fileName: string;
  type: ImageType;
  author?: Author | null;
  book?: Book | null;
  publisher?: Publisher | null;
}

export interface ImageFilter {
  id?: ValueFilter<ImageId, never>;
  fileName?: ValueFilter<string, never>;
  createdAt?: ValueFilter<Date, never>;
  updatedAt?: ValueFilter<Date, never>;
  type?: ValueFilter<ImageType, never>;
  author?: EntityFilter<Author, AuthorId, FilterOf<Author>, null | undefined>;
  book?: EntityFilter<Book, BookId, FilterOf<Book>, null | undefined>;
  publisher?: EntityFilter<Publisher, PublisherId, FilterOf<Publisher>, null | undefined>;
}

export interface ImageGraphQLFilter {
  id?: ValueGraphQLFilter<ImageId>;
  fileName?: ValueGraphQLFilter<string>;
  createdAt?: ValueGraphQLFilter<Date>;
  updatedAt?: ValueGraphQLFilter<Date>;
  type?: EnumGraphQLFilter<ImageType>;
  author?: EntityGraphQLFilter<Author, AuthorId, GraphQLFilterOf<Author>>;
  book?: EntityGraphQLFilter<Book, BookId, GraphQLFilterOf<Book>>;
  publisher?: EntityGraphQLFilter<Publisher, PublisherId, GraphQLFilterOf<Publisher>>;
}

export interface ImageOrder {
  id?: OrderBy;
  fileName?: OrderBy;
  createdAt?: OrderBy;
  updatedAt?: OrderBy;
  type?: OrderBy;
  author?: AuthorOrder;
  book?: BookOrder;
  publisher?: PublisherOrder;
}

export const imageConfig = new ConfigApi<Image>();

imageConfig.addRule(newRequiredRule("fileName"));
imageConfig.addRule(newRequiredRule("createdAt"));
imageConfig.addRule(newRequiredRule("updatedAt"));
imageConfig.addRule(newRequiredRule("type"));

export abstract class ImageCodegen extends BaseEntity {
  readonly __filterType: ImageFilter = null!;
  readonly __gqlFilterType: ImageGraphQLFilter = null!;
  readonly __orderType: ImageOrder = null!;
  readonly __optsType: ImageOpts = null!;

  readonly author: Reference<Image, Author, undefined> = new ManyToOneReference<Image, Author, undefined>(
    this as any,
    Author,
    "author",
    "images",
    false,
  );

  readonly book: Reference<Image, Book, undefined> = new ManyToOneReference<Image, Book, undefined>(
    this as any,
    Book,
    "book",
    "images",
    false,
  );

  readonly publisher: Reference<Image, Publisher, undefined> = new ManyToOneReference<Image, Publisher, undefined>(
    this as any,
    Publisher,
    "publisher",
    "images",
    false,
  );

  constructor(em: EntityManager, opts: ImageOpts) {
    super(em, imageMeta);
    this.set(opts as ImageOpts, { calledFromConstructor: true } as any);
  }

  get id(): ImageId | undefined {
    return this.__orm.data["id"];
  }

  get fileName(): string {
    return this.__orm.data["fileName"];
  }

  set fileName(fileName: string) {
    setField(this, "fileName", fileName);
  }

  get createdAt(): Date {
    return this.__orm.data["createdAt"];
  }

  get updatedAt(): Date {
    return this.__orm.data["updatedAt"];
  }

  get type(): ImageType {
    return this.__orm.data["type"];
  }

  set type(type: ImageType) {
    setField(this, "type", type);
  }

  set(values: Partial<ImageOpts>, opts: { ignoreUndefined?: boolean } = {}): void {
    setOpts(this, values as OptsOf<this>, opts);
  }

  setPartial(values: PartialOrNull<ImageOpts>, opts: { ignoreUndefined?: boolean } = {}): void {
    setOpts(this, values as OptsOf<this>, { ignoreUndefined: true, ...opts });
  }

  get changes(): Changes<Image> {
    return newChangesProxy((this as any) as Image);
  }

  async load<U, V>(fn: (lens: Lens<Image>) => Lens<U, V>): Promise<V> {
    return loadLens((this as any) as Image, fn);
  }

  hasOneThrough<U extends Entity, N extends undefined | never, V extends U | N>(
    fn: (lens: Lens<Image>) => Lens<V>,
  ): Reference<Image, U, N> {
    return hasOneThrough((this as any) as Image, fn);
  }

  async populate<H extends LoadHint<Image>>(hint: H): Promise<Loaded<Image, H>> {
    return getEm(this).populate((this as any) as Image, hint);
  }
}
