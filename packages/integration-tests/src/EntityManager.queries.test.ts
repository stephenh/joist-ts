import {
  insertAuthor,
  insertAuthorToTag,
  insertBook,
  insertBookReview,
  insertComment,
  insertCritic,
  insertImage,
  insertLargePublisher,
  insertPublisher,
  insertTag,
  update,
} from "@src/entities/inserts";
import {
  alias,
  aliases,
  ExpressionFilter,
  getMetadata,
  jan1,
  jan2,
  NotFoundError,
  parseFindQuery,
  setDefaultEntityLimit,
  setEntityLimit,
  TooManyError,
} from "joist-orm";
import {
  Author,
  AuthorFilter,
  AuthorGraphQLFilter,
  AuthorOrder,
  Book,
  BookFilter,
  BookReview,
  Color,
  Comment,
  CommentFilter,
  Critic,
  CriticFilter,
  FavoriteShape,
  Image,
  ImageType,
  Publisher,
  PublisherFilter,
  PublisherId,
  PublisherSize,
  SmallPublisher,
} from "./entities";
import { newEntityManager, numberOfQueries, resetQueryCount } from "./setupDbTests";

const am = getMetadata(Author);
const bm = getMetadata(Book);
const pm = getMetadata(Publisher);
const cm = getMetadata(Comment);
const criticMeta = getMetadata(Critic);
const opts = { softDeletes: "include" } as const;

describe("EntityManager.queries", () => {
  it("can find all", async () => {
    await insertAuthor({ first_name: "a1" });
    await insertAuthor({ first_name: "a2" });

    const em = newEntityManager();
    const where = {} satisfies AuthorFilter;
    const authors = await em.find(Author, where, opts);
    expect(authors.length).toEqual(2);
    expect(authors[0].firstName).toEqual("a1");
    expect(authors[1].firstName).toEqual("a2");

    expect(parseFindQuery(am, where, opts)).toEqual({
      selects: [`"a".*`],
      tables: [{ alias: "a", table: "authors", join: "primary" }],
      conditions: [],
    });
  });

  it("can find by simple varchar", async () => {
    await insertAuthor({ first_name: "a1" });
    await insertAuthor({ first_name: "a2" });

    const em = newEntityManager();
    const where = { firstName: "a2" } satisfies AuthorFilter;
    const authors = await em.find(Author, where);
    expect(authors.length).toEqual(1);
    expect(authors[0].firstName).toEqual("a2");

    expect(parseFindQuery(am, where, opts)).toEqual({
      selects: [`"a".*`],
      tables: [{ alias: "a", table: "authors", join: "primary" }],
      conditions: [{ alias: "a", column: "first_name", cond: { kind: "eq", value: "a2" } }],
    });
  });

  it("can find by simple varchar is null", async () => {
    await insertAuthor({ first_name: "a1", last_name: "last_name" });
    await insertAuthor({ first_name: "a2" });

    const em = newEntityManager();
    const where = { lastName: null } satisfies AuthorFilter;
    const authors = await em.find(Author, where);
    expect(authors.length).toEqual(1);
    expect(authors[0].firstName).toEqual("a2");

    expect(parseFindQuery(am, where, opts)).toEqual({
      selects: [`"a".*`],
      tables: [{ alias: "a", table: "authors", join: "primary" }],
      conditions: [{ alias: "a", column: "last_name", cond: { kind: "is-null" } }],
    });
  });

  it("cannot find by simple varchar is undefined", async () => {
    await insertAuthor({ first_name: "a1", last_name: "last_name" });
    await insertAuthor({ first_name: "a2" });

    const em = newEntityManager();
    const where = { lastName: undefined } satisfies AuthorFilter;
    const authors = await em.find(Author, where);
    expect(authors.length).toEqual(2);

    expect(parseFindQuery(am, where, opts)).toEqual({
      selects: [`"a".*`],
      tables: [{ alias: "a", table: "authors", join: "primary" }],
      conditions: [],
    });
  });

  it("can find by simple varchar not null", async () => {
    await insertAuthor({ first_name: "a1", last_name: "l1" });
    await insertAuthor({ first_name: "a2" });

    const em = newEntityManager();
    const where = { lastName: { ne: null } } satisfies AuthorFilter;
    const authors = await em.find(Author, where);
    expect(authors.length).toEqual(1);
    expect(authors[0].firstName).toEqual("a1");

    expect(parseFindQuery(am, where, opts)).toEqual({
      selects: [`"a".*`],
      tables: [{ alias: "a", table: "authors", join: "primary" }],
      conditions: [{ alias: "a", column: "last_name", cond: { kind: "not-null" } }],
    });
  });

  it("can find by simple varchar not undefined", async () => {
    await insertAuthor({ first_name: "a1", last_name: "l1" });
    await insertAuthor({ first_name: "a2" });

    const em = newEntityManager();
    const where = { lastName: { ne: undefined } } satisfies AuthorFilter;
    const authors = await em.find(Author, where);
    expect(authors.length).toEqual(2);

    expect(parseFindQuery(am, where, opts)).toEqual({
      selects: [`"a".*`],
      tables: [{ alias: "a", table: "authors", join: "primary" }],
      conditions: [],
    });
  });

  it("can find by varchar through join", async () => {
    await insertAuthor({ first_name: "a1" });
    await insertAuthor({ first_name: "a2" });
    await insertBook({ title: "b1", author_id: 1 });
    await insertBook({ title: "b2", author_id: 2 });
    await insertBook({ title: "b3", author_id: 2 });

    const em = newEntityManager();
    const where = { author: { firstName: "a2" } } satisfies BookFilter;
    const books = await em.find(Book, where);
    expect(books.length).toEqual(2);
    expect(books[0].title).toEqual("b2");
    expect(books[1].title).toEqual("b3");

    expect(parseFindQuery(bm, where, opts)).toEqual({
      selects: [`"b".*`],
      tables: [
        { alias: "b", table: "books", join: "primary" },
        { alias: "a", table: "authors", join: "inner", col1: "b.author_id", col2: "a.id" },
      ],
      conditions: [{ alias: "a", column: "first_name", cond: { kind: "eq", value: "a2" } }],
    });
  });

  it("can find by varchar through two joins", async () => {
    await insertPublisher({ name: "p1" });
    await insertPublisher({ id: 2, name: "p2" });
    await insertAuthor({ first_name: "a1", publisher_id: 1 });
    await insertAuthor({ first_name: "a2", publisher_id: 2 });
    await insertBook({ title: "b1", author_id: 1 });
    await insertBook({ title: "b2", author_id: 2 });

    const em = newEntityManager();
    const where = { author: { publisher: { name: "p2" } } } satisfies BookFilter;
    const books = await em.find(Book, where);
    expect(books.length).toEqual(1);
    expect(books[0].title).toEqual("b2");

    expect(parseFindQuery(bm, where, opts)).toEqual({
      selects: [`"b".*`],
      tables: [
        { alias: "b", table: "books", join: "primary" },
        { alias: "a", table: "authors", join: "inner", col1: "b.author_id", col2: "a.id" },
        { alias: "p", table: "publishers", join: "inner", col1: "a.publisher_id", col2: "p.id" },
      ],
      conditions: [{ alias: "p", column: "name", cond: { kind: "eq", value: "p2" } }],
    });
  });

  it("can find by foreign key", async () => {
    await insertAuthor({ first_name: "a1" });
    await insertAuthor({ first_name: "a2" });
    await insertBook({ title: "b1", author_id: 1 });
    await insertBook({ title: "b2", author_id: 2 });

    const em = newEntityManager();
    const a2 = await em.load(Author, "a:2");
    // This is different from the next test case b/c Publisher does not currently have any References
    const where = { author: a2 } satisfies BookFilter;
    const books = await em.find(Book, where);
    expect(books.length).toEqual(1);
    expect(books[0].title).toEqual("b2");

    expect(parseFindQuery(bm, where, opts)).toEqual({
      selects: [`"b".*`],
      tables: [{ alias: "b", table: "books", join: "primary" }],
      conditions: [{ alias: "b", column: "author_id", cond: { kind: "eq", value: 2 } }],
    });
  });

  it("can find by foreign key is null", async () => {
    await insertPublisher({ id: 1, name: "p1" });
    await insertAuthor({ id: 2, first_name: "a1" });
    await insertAuthor({ id: 3, first_name: "a2", publisher_id: 1 });

    const em = newEntityManager();
    const where = { publisher: null } satisfies AuthorFilter;
    const authors = await em.find(Author, where);
    expect(authors.length).toEqual(1);
    expect(authors[0].firstName).toEqual("a1");

    expect(parseFindQuery(am, where, opts)).toEqual({
      selects: [`"a".*`],
      tables: [{ alias: "a", table: "authors", join: "primary" }],
      conditions: [{ alias: "a", column: "publisher_id", cond: { kind: "is-null" } }],
    });
  });

  it("skips find by foreign key id is undefined", async () => {
    await insertPublisher({ id: 1, name: "p1" });
    await insertAuthor({ id: 2, first_name: "a1" });
    await insertAuthor({ id: 3, first_name: "a2", publisher_id: 1 });

    const em = newEntityManager();
    const where = { publisher: undefined } satisfies AuthorFilter;
    const authors = await em.find(Author, where);
    expect(authors.length).toEqual(2);

    expect(parseFindQuery(am, where, opts)).toEqual({
      selects: [`"a".*`],
      tables: [{ alias: "a", table: "authors", join: "primary" }],
      conditions: [],
    });
  });

  it("can find by foreign key is new entity", async () => {
    await insertAuthor({ first_name: "a1" });

    const em = newEntityManager();
    const publisher = new SmallPublisher(em, { name: "p1", city: "c1" });
    const where = { publisher } satisfies AuthorFilter;
    const authors = await em.find(Author, where);
    expect(authors.length).toEqual(0);

    expect(parseFindQuery(am, where, opts)).toEqual({
      selects: [`"a".*`],
      tables: [{ alias: "a", table: "authors", join: "primary" }],
      conditions: [{ alias: "a", column: "publisher_id", cond: { kind: "eq", value: -1 } }],
    });
  });

  it("can find by foreign key is not null", async () => {
    await insertPublisher({ id: 1, name: "p1" });
    await insertAuthor({ id: 2, first_name: "a1" });
    await insertAuthor({ id: 3, first_name: "a2", publisher_id: 1 });

    const em = newEntityManager();
    const where = { publisher: { ne: null } } satisfies AuthorFilter;
    const authors = await em.find(Author, where);
    expect(authors.length).toEqual(1);
    expect(authors[0].firstName).toEqual("a2");

    expect(parseFindQuery(am, where, opts)).toEqual({
      selects: [`"a".*`],
      tables: [{ alias: "a", table: "authors", join: "primary" }],
      conditions: [{ alias: "a", column: "publisher_id", cond: { kind: "not-null" } }],
    });
  });

  it("can find by foreign key is not undefined", async () => {
    await insertPublisher({ id: 1, name: "p1" });
    await insertAuthor({ id: 2, first_name: "a1" });
    await insertAuthor({ id: 3, first_name: "a2", publisher_id: 1 });

    const em = newEntityManager();
    const where = { publisher: { ne: undefined } } satisfies AuthorFilter;
    const authors = await em.find(Author, where);
    expect(authors.length).toEqual(2);
    expect(authors[0].firstName).toEqual("a1");

    expect(parseFindQuery(am, where, opts)).toEqual({
      selects: [`"a".*`],
      tables: [{ alias: "a", table: "authors", join: "primary" }],
      conditions: [],
    });
  });

  it("can find by foreign key is flavor", async () => {
    await insertPublisher({ id: 1, name: "p1" });
    await insertAuthor({ id: 2, first_name: "a1" });
    await insertAuthor({ id: 3, first_name: "a2", publisher_id: 1 });

    const em = newEntityManager();
    const publisherId: PublisherId = "1";
    const where = { publisher: { id: publisherId } } satisfies AuthorFilter;
    const authors = await em.find(Author, where);
    expect(authors.length).toEqual(1);
    expect(authors[0].firstName).toEqual("a2");

    expect(parseFindQuery(am, where, opts)).toEqual({
      selects: [`"a".*`],
      tables: [{ alias: "a", table: "authors", join: "primary" }],
      conditions: [{ alias: "a", column: "publisher_id", cond: { kind: "eq", value: 1 } }],
    });
  });

  it("can find by foreign key id in list", async () => {
    await insertPublisher({ id: 1, name: "p1" });
    await insertAuthor({ id: 2, first_name: "a1" });
    await insertAuthor({ id: 3, first_name: "a2", publisher_id: 1 });

    const em = newEntityManager();
    const publisherId: PublisherId = "1";
    const where = { publisher: { id: { in: [publisherId] } } } satisfies AuthorFilter;
    const authors = await em.find(Author, where);
    expect(authors.length).toEqual(1);
    expect(authors[0].firstName).toEqual("a2");

    expect(parseFindQuery(am, where, opts)).toEqual({
      selects: [`"a".*`],
      tables: [{ alias: "a", table: "authors", join: "primary" }],
      conditions: [{ alias: "a", column: "publisher_id", cond: { kind: "in", value: [1] } }],
    });
  });

  it("can find by foreign key id in list that is undefined", async () => {
    await insertPublisher({ id: 1, name: "p1" });
    await insertAuthor({ id: 2, first_name: "a1" });
    await insertAuthor({ id: 3, first_name: "a2", publisher_id: 1 });

    const em = newEntityManager();
    const publisherId: PublisherId = "1";
    const where = { publisher: { id: { in: undefined } } } satisfies AuthorFilter;
    const authors = await em.findGql(Author, where);
    expect(authors.length).toEqual(2);

    expect(parseFindQuery(am, where, opts)).toEqual({
      selects: [`"a".*`],
      tables: [{ alias: "a", table: "authors", join: "primary" }],
      conditions: [],
    });
  });

  it("can find by foreign key id nin list", async () => {
    await insertPublisher({ id: 1, name: "p1" });
    await insertPublisher({ id: 2, name: "p2" });
    await insertAuthor({ id: 2, first_name: "a1", publisher_id: 1 });
    await insertAuthor({ id: 3, first_name: "a2", publisher_id: 2 });

    const em = newEntityManager();
    const publisherId: PublisherId = "1";
    const where = { publisher: { id: { nin: [publisherId] } } } satisfies AuthorFilter;
    const authors = await em.find(Author, where);
    expect(authors.length).toEqual(1);
    expect(authors[0].firstName).toEqual("a2");

    expect(parseFindQuery(am, where, opts)).toEqual({
      selects: [`"a".*`],
      tables: [{ alias: "a", table: "authors", join: "primary" }],
      conditions: [{ alias: "a", column: "publisher_id", cond: { kind: "nin", value: [1] } }],
    });
  });

  it("can find by foreign key id nin list that is undefined", async () => {
    await insertPublisher({ id: 1, name: "p1" });
    await insertPublisher({ id: 2, name: "p2" });
    await insertAuthor({ id: 2, first_name: "a1", publisher_id: 1 });
    await insertAuthor({ id: 3, first_name: "a2", publisher_id: 2 });

    const em = newEntityManager();
    const publisherId: PublisherId = "1";
    const where = { publisher: { id: { nin: undefined } } } satisfies AuthorFilter;
    const authors = await em.findGql(Author, where);
    expect(authors.length).toEqual(2);

    expect(parseFindQuery(am, where, opts)).toEqual({
      selects: [`"a".*`],
      tables: [{ alias: "a", table: "authors", join: "primary" }],
      conditions: [],
    });
  });

  it("can find by foreign key is flavor list", async () => {
    await insertPublisher({ id: 1, name: "p1" });
    await insertAuthor({ id: 2, first_name: "a1" });
    await insertAuthor({ id: 3, first_name: "a2", publisher_id: 1 });

    const em = newEntityManager();
    const publisherId: PublisherId = "1";
    const where = { publisher: [publisherId] } satisfies AuthorFilter;
    const authors = await em.find(Author, where);
    expect(authors.length).toEqual(1);
    expect(authors[0].firstName).toEqual("a2");

    expect(parseFindQuery(am, where, opts)).toEqual({
      selects: [`"a".*`],
      tables: [{ alias: "a", table: "authors", join: "primary" }],
      conditions: [{ alias: "a", column: "publisher_id", cond: { kind: "in", value: [1] } }],
    });
  });

  it("can find by foreign key is entity list", async () => {
    await insertPublisher({ id: 1, name: "p1" });
    await insertAuthor({ id: 2, first_name: "a1" });
    await insertAuthor({ id: 3, first_name: "a2", publisher_id: 1 });

    const em = newEntityManager();
    const publisher = await em.load(Publisher, "p:1");
    const where = { publisher: [publisher] } satisfies AuthorFilter;
    const authors = await em.find(Author, where);
    expect(authors.length).toEqual(1);
    expect(authors[0].firstName).toEqual("a2");

    expect(parseFindQuery(am, where, opts)).toEqual({
      selects: [`"a".*`],
      tables: [{ alias: "a", table: "authors", join: "primary" }],
      conditions: [{ alias: "a", column: "publisher_id", cond: { kind: "in", value: [1] } }],
    });
  });

  it("can find by foreign key is entity list that is undefined", async () => {
    await insertPublisher({ id: 1, name: "p1" });
    await insertAuthor({ id: 2, first_name: "a1" });
    await insertAuthor({ id: 3, first_name: "a2", publisher_id: 1 });

    const em = newEntityManager();
    const publisher = await em.load(Publisher, "p:1");
    const where = { publisher: undefined } satisfies AuthorFilter;
    const authors = await em.find(Author, where);
    expect(authors.length).toEqual(2);

    expect(parseFindQuery(am, where, opts)).toEqual({
      selects: [`"a".*`],
      tables: [{ alias: "a", table: "authors", join: "primary" }],
      conditions: [],
    });
  });

  it("can find by foreign key is tagged flavor", async () => {
    await insertPublisher({ id: 1, name: "p1" });
    await insertAuthor({ id: 2, first_name: "a1" });
    await insertAuthor({ id: 3, first_name: "a2", publisher_id: 1 });

    const em = newEntityManager();
    const publisherId: PublisherId = "p:1";
    const where = { publisher: publisherId } satisfies AuthorFilter;
    const authors = await em.find(Author, where);
    expect(authors.length).toEqual(1);
    expect(authors[0].firstName).toEqual("a2");

    expect(parseFindQuery(am, where, opts)).toEqual({
      selects: [`"a".*`],
      tables: [{ alias: "a", table: "authors", join: "primary" }],
      conditions: [{ alias: "a", column: "publisher_id", cond: { kind: "eq", value: 1 } }],
    });
  });

  it("fails find by foreign key is invalid tagged id", async () => {
    await insertPublisher({ id: 1, name: "p1" });
    await insertAuthor({ id: 2, first_name: "a1" });
    await insertAuthor({ id: 3, first_name: "a2", publisher_id: 1 });

    const em = newEntityManager();
    const publisherId: PublisherId = "a:1";
    const where = { publisher: publisherId } satisfies AuthorFilter;
    await expect(em.find(Author, where)).rejects.toThrow("Invalid tagged id, expected tag p, got a:1");

    expect(() => parseFindQuery(am, where)).toThrow("Invalid tagged id");
  });

  it("can find by foreign key is not flavor", async () => {
    await insertPublisher({ id: 1, name: "p1" });
    await insertAuthor({ id: 2, first_name: "a1" });
    await insertAuthor({ id: 3, first_name: "a2", publisher_id: 1 });

    const em = newEntityManager();
    const publisherId: PublisherId = "1";
    // Technically id != 1 does not match the a1.publisher_id is null. Might fix this.
    const where = { publisher: { ne: publisherId } } satisfies AuthorFilter;
    const authors = await em.find(Author, { publisher: { ne: publisherId } });
    expect(authors.length).toEqual(0);

    expect(parseFindQuery(am, where, opts)).toEqual({
      selects: [`"a".*`],
      tables: [{ alias: "a", table: "authors", join: "primary" }],
      conditions: [{ alias: "a", column: "publisher_id", cond: { kind: "ne", value: 1 } }],
    });
  });

  it("can find books by publisher", async () => {
    await insertPublisher({ name: "p1" });
    await insertPublisher({ id: 2, name: "p2" });
    await insertAuthor({ first_name: "a1", publisher_id: 1 });
    await insertAuthor({ first_name: "a2", publisher_id: 2 });
    await insertBook({ title: "b1", author_id: 1 });
    await insertBook({ title: "b2", author_id: 2 });

    const em = newEntityManager();
    const publisher = await em.load(Publisher, "2");
    const where = { author: { publisher } } satisfies BookFilter;
    const books = await em.find(Book, where);
    expect(books.length).toEqual(1);
    expect(books[0].title).toEqual("b2");

    expect(parseFindQuery(bm, where, opts)).toEqual({
      selects: [`"b".*`],
      tables: [
        { alias: "b", table: "books", join: "primary" },
        { alias: "a", table: "authors", join: "inner", col1: "b.author_id", col2: "a.id" },
      ],
      conditions: [{ alias: "a", column: "publisher_id", cond: { kind: "eq", value: 2 } }],
    });
  });

  it("can find through a o2o entity", async () => {
    await insertAuthor({ first_name: "a1" });
    await insertAuthor({ first_name: "a2" });
    await insertBook({ title: "b1", author_id: 1 });
    await insertBook({ title: "b2", author_id: 2 });
    await insertImage({ book_id: 1, file_name: "1", type_id: 1 });
    await insertImage({ book_id: 2, file_name: "2", type_id: 1 });

    const em = newEntityManager();
    const image = await em.load(Image, "2");
    const where = { image } satisfies BookFilter;
    const books = await em.find(Book, where);
    expect(books.length).toEqual(1);
    expect(books[0].title).toEqual("b2");

    expect(parseFindQuery(bm, where, opts)).toEqual({
      selects: [`"b".*`],
      tables: [
        { alias: "b", table: "books", join: "primary" },
        { alias: "i", table: "images", join: "outer", col1: "b.id", col2: "i.book_id" },
      ],
      conditions: [{ alias: "i", column: "id", cond: { kind: "eq", value: 2 } }],
    });
  });

  it("can find through a o2o filter", async () => {
    await insertAuthor({ first_name: "a1" });
    await insertAuthor({ first_name: "a2" });
    await insertBook({ title: "b1", author_id: 1 });
    await insertBook({ title: "b2", author_id: 2 });
    await insertImage({ book_id: 1, file_name: "1", type_id: 1 });
    await insertImage({ author_id: 2, file_name: "2", type_id: 2 });

    const em = newEntityManager();
    const where = { image: { type: ImageType.BookImage } } satisfies BookFilter;
    const books = await em.find(Book, where);
    expect(books.length).toEqual(1);
    expect(books[0].title).toEqual("b1");

    expect(parseFindQuery(bm, where, opts)).toEqual({
      selects: [`"b".*`],
      tables: [
        { alias: "b", table: "books", join: "primary" },
        { alias: "i", table: "images", join: "outer", col1: "b.id", col2: "i.book_id" },
      ],
      conditions: [{ alias: "i", column: "type_id", cond: { kind: "eq", value: 1 } }],
    });
  });

  it("can find by foreign key using only an id", async () => {
    await insertAuthor({ id: 3, first_name: "a1" });
    await insertAuthor({ id: 4, first_name: "a2" });
    await insertBook({ title: "b1", author_id: 3 });
    await insertBook({ title: "b2", author_id: 4 });

    const em = newEntityManager();
    const where = { author: { id: "4" } } satisfies BookFilter;
    const books = await em.find(Book, where);
    expect(books.length).toEqual(1);
    expect(books[0].title).toEqual("b2");

    expect(parseFindQuery(bm, where, opts)).toEqual({
      selects: [`"b".*`],
      tables: [{ alias: "b", table: "books", join: "primary" }],
      conditions: [{ alias: "b", column: "author_id", cond: { kind: "eq", value: 4 } }],
    });
  });

  it("can find by foreign key using only a tagged id", async () => {
    await insertAuthor({ id: 3, first_name: "a1" });
    await insertAuthor({ id: 4, first_name: "a2" });
    await insertBook({ title: "b1", author_id: 3 });
    await insertBook({ title: "b2", author_id: 4 });

    const em = newEntityManager();
    const where = { author: { id: "a:4" } } satisfies BookFilter;
    const books = await em.find(Book, where);
    expect(books.length).toEqual(1);
    expect(books[0].title).toEqual("b2");

    expect(parseFindQuery(bm, where, opts)).toEqual({
      selects: [`"b".*`],
      tables: [{ alias: "b", table: "books", join: "primary" }],
      conditions: [{ alias: "b", column: "author_id", cond: { kind: "eq", value: 4 } }],
    });
  });

  it("can find by foreign key using a tagged id list", async () => {
    await insertAuthor({ id: 3, first_name: "a1" });
    await insertAuthor({ id: 4, first_name: "a2" });
    await insertBook({ title: "b1", author_id: 3 });
    await insertBook({ title: "b2", author_id: 4 });

    const em = newEntityManager();
    const where = { author: { id: ["a:4"] } } satisfies BookFilter;
    const books = await em.find(Book, where);
    expect(books.length).toEqual(1);
    expect(books[0].title).toEqual("b2");

    expect(parseFindQuery(bm, where, opts)).toEqual({
      selects: [`"b".*`],
      tables: [{ alias: "b", table: "books", join: "primary" }],
      conditions: [{ alias: "b", column: "author_id", cond: { kind: "in", value: [4] } }],
    });
  });

  it("can find by ids", async () => {
    await insertPublisher({ name: "p1" });
    await insertPublisher({ id: 2, name: "p2" });

    const em = newEntityManager();
    const where = { id: ["1", "2"] } satisfies PublisherFilter;
    const pubs = await em.find(Publisher, where);
    expect(pubs.length).toEqual(2);

    expect(parseFindQuery(pm, where)).toEqual({
      selects: [`"p".*`, "p_s0.*", "p_s1.*", `"p".id as id`, expect.anything()],
      tables: [{ alias: "p", table: "publishers", join: "primary" }, expect.anything(), expect.anything()],
      conditions: [{ alias: "p", column: "id", cond: { kind: "in", value: [1, 2] } }],
    });
  });

  it("can find by tagged ids", async () => {
    await insertPublisher({ name: "p1" });
    await insertPublisher({ id: 2, name: "p2" });

    const em = newEntityManager();
    const where = { id: ["p:1", "p:2"] } satisfies PublisherFilter;
    const pubs = await em.find(Publisher, where);
    expect(pubs.length).toEqual(2);

    expect(parseFindQuery(pm, where)).toEqual({
      selects: [`"p".*`, "p_s0.*", "p_s1.*", `"p".id as id`, expect.anything()],
      tables: [
        { alias: "p", table: "publishers", join: "primary" },
        { alias: "p_s0", table: "large_publishers", join: "outer", col1: "p.id", col2: "p_s0.id", distinct: false },
        { alias: "p_s1", table: "small_publishers", join: "outer", col1: "p.id", col2: "p_s1.id", distinct: false },
      ],
      conditions: [{ alias: "p", column: "id", cond: { kind: "in", value: [1, 2] } }],
    });
  });

  it("can find by ids with in clause", async () => {
    await insertPublisher({ name: "p1" });
    await insertPublisher({ id: 2, name: "p2" });

    const em = newEntityManager();
    const where = { id: { in: ["1", "2"] } } satisfies PublisherFilter;
    const pubs = await em.find(Publisher, where);
    expect(pubs.length).toEqual(2);

    expect(parseFindQuery(pm, where)).toEqual({
      selects: [`"p".*`, "p_s0.*", "p_s1.*", `"p".id as id`, expect.anything()],
      tables: [{ alias: "p", table: "publishers", join: "primary" }, expect.anything(), expect.anything()],
      conditions: [{ alias: "p", column: "id", cond: { kind: "in", value: [1, 2] } }],
    });
  });

  it("can find by enums", async () => {
    await insertPublisher({ name: "p1", size_id: 1 });
    await insertPublisher({ id: 2, name: "p2", size_id: 2 });

    const em = newEntityManager();
    const where = { size: PublisherSize.Large } satisfies PublisherFilter;
    const pubs = await em.find(Publisher, where);
    expect(pubs.length).toEqual(1);
    expect(pubs[0].name).toEqual("p2");

    expect(parseFindQuery(pm, where)).toEqual({
      selects: [
        `"p".*`,
        "p_s0.*",
        "p_s1.*",
        `"p".id as id`,
        "CASE WHEN p_s0.id IS NOT NULL THEN 'LargePublisher' WHEN p_s1.id IS NOT NULL THEN 'SmallPublisher' ELSE 'Publisher' END as __class",
      ],
      tables: [
        { alias: "p", table: "publishers", join: "primary" },
        { alias: "p_s0", table: "large_publishers", join: "outer", col1: "p.id", col2: "p_s0.id", distinct: false },
        { alias: "p_s1", table: "small_publishers", join: "outer", col1: "p.id", col2: "p_s1.id", distinct: false },
      ],
      conditions: [{ alias: "p", column: "size_id", cond: { kind: "eq", value: 2 } }],
    });
  });

  it("can find by not equal enum", async () => {
    await insertPublisher({ name: "p1", size_id: 1 });
    await insertPublisher({ id: 2, name: "p2", size_id: 2 });

    const em = newEntityManager();
    const where = { size: { ne: PublisherSize.Large } } satisfies PublisherFilter;
    const pubs = await em.find(Publisher, where);
    expect(pubs.length).toEqual(1);
    expect(pubs[0].name).toEqual("p1");

    expect(parseFindQuery(pm, where)).toEqual({
      selects: [`"p".*`, "p_s0.*", "p_s1.*", `"p".id as id`, expect.anything()],
      tables: [
        { alias: "p", table: "publishers", join: "primary" },
        { alias: "p_s0", table: "large_publishers", join: "outer", col1: "p.id", col2: "p_s0.id", distinct: false },
        { alias: "p_s1", table: "small_publishers", join: "outer", col1: "p.id", col2: "p_s1.id", distinct: false },
      ],
      conditions: [{ alias: "p", column: "size_id", cond: { kind: "ne", value: 2 } }],
    });
  });

  it("can find by simple integer", async () => {
    await insertAuthor({ first_name: "a1", age: 1 });
    await insertAuthor({ first_name: "a2", age: 2 });

    const em = newEntityManager();
    const where = { age: 2 } satisfies AuthorFilter;
    const authors = await em.find(Author, where);
    expect(authors.length).toEqual(1);
    expect(authors[0].firstName).toEqual("a2");

    expect(parseFindQuery(am, where, opts)).toEqual({
      selects: [`"a".*`],
      tables: [{ alias: "a", table: "authors", join: "primary" }],
      conditions: [{ alias: "a", column: "age", cond: { kind: "eq", value: 2 } }],
    });
  });

  it("can find by integer with eq", async () => {
    await insertAuthor({ first_name: "a1", age: 1 });
    await insertAuthor({ first_name: "a2", age: 2 });

    const em = newEntityManager();
    const where = { age: { eq: 2 } } satisfies AuthorFilter;
    const authors = await em.find(Author, where);
    expect(authors.length).toEqual(1);
    expect(authors[0].firstName).toEqual("a2");

    expect(parseFindQuery(am, where, opts)).toEqual({
      selects: [`"a".*`],
      tables: [{ alias: "a", table: "authors", join: "primary" }],
      conditions: [{ alias: "a", column: "age", cond: { kind: "eq", value: 2 } }],
    });
  });

  it("can find by integer with in", async () => {
    await insertAuthor({ first_name: "a1", age: 1 });
    await insertAuthor({ first_name: "a2", age: 2 });

    const em = newEntityManager();
    const where = { age: { in: [1, 2] } } satisfies AuthorFilter;
    const authors = await em.find(Author, where);
    expect(authors.length).toEqual(2);

    expect(parseFindQuery(am, where, opts)).toEqual({
      selects: [`"a".*`],
      tables: [{ alias: "a", table: "authors", join: "primary" }],
      conditions: [{ alias: "a", column: "age", cond: { kind: "in", value: [1, 2] } }],
    });
  });

  it("can find by integer with null", async () => {
    await insertAuthor({ first_name: "a1", age: 1 });
    await insertAuthor({ first_name: "a2" });

    const em = newEntityManager();
    const where = { age: { eq: null } } satisfies AuthorFilter;
    const authors = await em.find(Author, where);
    expect(authors.length).toEqual(1);
    expect(authors[0].firstName).toEqual("a2");

    expect(parseFindQuery(am, where, opts)).toEqual({
      selects: [`"a".*`],
      tables: [{ alias: "a", table: "authors", join: "primary" }],
      conditions: [{ alias: "a", column: "age", cond: { kind: "is-null" } }],
    });
  });

  it("can find by integer with non-op null", async () => {
    await insertAuthor({ first_name: "a1", age: 1 });
    await insertAuthor({ first_name: "a2" });

    const em = newEntityManager();
    const where = { age: null, firstName: undefined };
    const authors = await em.find(Author, where);
    expect(authors.length).toEqual(1);
    expect(authors[0].firstName).toEqual("a2");

    expect(parseFindQuery(am, where, opts)).toEqual({
      selects: [`"a".*`],
      tables: [{ alias: "a", table: "authors", join: "primary" }],
      conditions: [{ alias: "a", column: "age", cond: { kind: "is-null" } }],
    });
  });

  it("can find by greater than", async () => {
    await insertAuthor({ first_name: "a1", age: 1 });
    await insertAuthor({ first_name: "a2", age: 2 });

    const em = newEntityManager();
    const where = { age: { gt: 1 } };
    const authors = await em.find(Author, where);
    expect(authors).toHaveLength(1);
    expect(authors[0].firstName).toEqual("a2");

    expect(parseFindQuery(am, where, opts)).toEqual({
      selects: [`"a".*`],
      tables: [{ alias: "a", table: "authors", join: "primary" }],
      conditions: [{ alias: "a", column: "age", cond: { kind: "gt", value: 1 } }],
    });
  });

  it("can find by greater than or equal to", async () => {
    await insertAuthor({ first_name: "a1", age: 1 });
    await insertAuthor({ first_name: "a2", age: 2 });

    const em = newEntityManager();
    const where = { age: { gte: 2 } };
    const authors = await em.find(Author, where);
    expect(authors).toHaveLength(1);
    expect(authors[0].firstName).toEqual("a2");

    expect(parseFindQuery(am, where, opts)).toEqual({
      selects: [`"a".*`],
      tables: [{ alias: "a", table: "authors", join: "primary" }],
      conditions: [{ alias: "a", column: "age", cond: { kind: "gte", value: 2 } }],
    });
  });

  it("can find by less than", async () => {
    await insertAuthor({ first_name: "a1", age: 1 });
    await insertAuthor({ first_name: "a2", age: 2 });

    const em = newEntityManager();
    const where = { age: { lt: 2 } };
    const authors = await em.find(Author, where);
    expect(authors).toHaveLength(1);
    expect(authors[0].firstName).toEqual("a1");

    expect(parseFindQuery(am, where, opts)).toEqual({
      selects: [`"a".*`],
      tables: [{ alias: "a", table: "authors", join: "primary" }],
      conditions: [{ alias: "a", column: "age", cond: { kind: "lt", value: 2 } }],
    });
  });

  it("can find by less than or equal to", async () => {
    await insertAuthor({ first_name: "a1", age: 1 });
    await insertAuthor({ first_name: "a2", age: 2 });

    const em = newEntityManager();
    const where = { age: { lte: 1 } };
    const authors = await em.find(Author, where);
    expect(authors).toHaveLength(1);
    expect(authors[0].firstName).toEqual("a1");

    expect(parseFindQuery(am, where, opts)).toEqual({
      selects: [`"a".*`],
      tables: [{ alias: "a", table: "authors", join: "primary" }],
      conditions: [{ alias: "a", column: "age", cond: { kind: "lte", value: 1 } }],
    });
  });

  it("can find by less than or equal to and greater than or equal to simultaneously", async () => {
    await insertAuthor({ first_name: "a1", age: 1 });
    await insertAuthor({ first_name: "a2", age: 2 });
    await insertAuthor({ first_name: "a3", age: 3 });
    await insertAuthor({ first_name: "a4", age: 4 });

    const em = newEntityManager();
    const where = { age: { gte: 2, lte: 3 } };
    const authors = await em.find(Author, where);
    expect(authors).toHaveLength(2);
    expect(authors[0].firstName).toEqual("a2");
    expect(authors[1].firstName).toEqual("a3");

    expect(parseFindQuery(am, where, opts)).toEqual({
      selects: [`"a".*`],
      tables: [{ alias: "a", table: "authors", join: "primary" }],
      conditions: [{ alias: "a", column: "age", cond: { kind: "between", value: [2, 3] } }],
    });
  });

  it("can find by greater than and lesser than", async () => {
    await insertAuthor({ first_name: "a1", age: 1 });
    await insertAuthor({ first_name: "a2", age: 2 });

    const em = newEntityManager();
    const where = { age: { gt: 0, lt: 3 } } satisfies AuthorFilter;
    const authors = await em.find(Author, where);
    expect(authors).toHaveLength(2);

    expect(parseFindQuery(am, where, opts)).toEqual({
      selects: [`"a".*`],
      tables: [{ alias: "a", table: "authors", join: "primary" }],
      conditions: [
        { alias: "a", column: "age", cond: { kind: "gt", value: 0 } },
        { alias: "a", column: "age", cond: { kind: "lt", value: 3 } },
      ],
    });
  });

  it("can find by not equal", async () => {
    await insertAuthor({ first_name: "a1", age: 1 });
    await insertAuthor({ first_name: "a2", age: 2 });

    const em = newEntityManager();
    const where = { age: { ne: 1 } };
    const authors = await em.find(Author, where);
    expect(authors.length).toEqual(1);
    expect(authors[0].firstName).toEqual("a2");

    expect(parseFindQuery(am, where, opts)).toEqual({
      selects: [`"a".*`],
      tables: [{ alias: "a", table: "authors", join: "primary" }],
      conditions: [{ alias: "a", column: "age", cond: { kind: "ne", value: 1 } }],
    });
  });

  it("can find by like", async () => {
    await insertAuthor({ first_name: "a1", age: 1 });
    await insertAuthor({ first_name: "a2", age: 2 });

    const em = newEntityManager();
    const where = { firstName: { like: "a%" } };
    const authors = await em.find(Author, where);
    expect(authors.length).toEqual(2);

    expect(parseFindQuery(am, where, opts)).toEqual({
      selects: [`"a".*`],
      tables: [{ alias: "a", table: "authors", join: "primary" }],
      conditions: [{ alias: "a", column: "first_name", cond: { kind: "like", value: "a%" } }],
    });
  });

  it("can find by date", async () => {
    await insertAuthor({ first_name: "a1", graduated: jan1 });
    await insertAuthor({ first_name: "a2", graduated: jan2 });

    const em = newEntityManager();
    const where = { graduated: jan2 } satisfies AuthorFilter;
    const authors = await em.find(Author, where);
    expect(authors.length).toEqual(1);

    expect(parseFindQuery(am, where, opts)).toEqual({
      selects: [`"a".*`],
      tables: [{ alias: "a", table: "authors", join: "primary" }],
      conditions: [{ alias: "a", column: "graduated", cond: { kind: "eq", value: jan2 } }],
    });
  });

  it("can find by ilike", async () => {
    await insertAuthor({ first_name: "a1", age: 1 });
    await insertAuthor({ first_name: "a2", age: 2 });

    const em = newEntityManager();
    const where = { firstName: { ilike: "A%" } };
    const authors = await em.find(Author, where);
    expect(authors.length).toEqual(2);

    expect(parseFindQuery(am, where, opts)).toEqual({
      selects: [`"a".*`],
      tables: [{ alias: "a", table: "authors", join: "primary" }],
      conditions: [{ alias: "a", column: "first_name", cond: { kind: "ilike", value: "A%" } }],
    });
  });

  it("can find by like and join with not equal enum", async () => {
    await insertPublisher({ name: "p1", size_id: 1 });
    await insertPublisher({ id: 2, name: "p2", size_id: 2 });
    await insertAuthor({ first_name: "a", publisher_id: 1 });
    await insertAuthor({ first_name: "a", publisher_id: 2 });

    const em = newEntityManager();
    const where = {
      firstName: "a",
      publisher: {
        size: { ne: PublisherSize.Large },
      },
    } satisfies AuthorFilter;
    const authors = await em.find(Author, where);
    expect(authors.length).toEqual(1);
    expect(authors[0].firstName).toEqual("a");

    expect(parseFindQuery(am, where, opts)).toEqual({
      selects: [`"a".*`],
      tables: [
        { alias: "a", table: "authors", join: "primary" },
        { alias: "p", table: "publishers", join: "inner", col1: "a.publisher_id", col2: "p.id" },
      ],
      conditions: [
        { alias: "a", column: "first_name", cond: { kind: "eq", value: "a" } },
        { alias: "p", column: "size_id", cond: { kind: "ne", value: 2 } },
      ],
    });
  });

  it("can find by one", async () => {
    await insertPublisher({ name: "p1", size_id: 1 });
    const em = newEntityManager();
    const publisher = await em.findOne(Publisher, { name: "p2" });
    expect(publisher).toBeUndefined();
  });

  it("can find by one or fail", async () => {
    await insertPublisher({ name: "p1", size_id: 1 });
    await insertPublisher({ id: 2, name: "p2", size_id: 2 });
    const em = newEntityManager();
    const publisher = await em.findOneOrFail(Publisher, { name: "p2" });
    expect(publisher.name).toEqual("p2");
  });

  it("can find by one when not found", async () => {
    await insertPublisher({ name: "p1", size_id: 1 });
    await insertPublisher({ id: 2, name: "p2", size_id: 2 });
    const em = newEntityManager();
    await expect(em.findOneOrFail(Publisher, { name: "p3" })).rejects.toThrow(NotFoundError);
    await expect(em.findOneOrFail(Publisher, { name: "p3" })).rejects.toThrow("Did not find Publisher for given query");
  });

  it("can find by one when too many found", async () => {
    await insertPublisher({ name: "p", size_id: 1 });
    await insertPublisher({ id: 2, name: "p", size_id: 2 });
    const em = newEntityManager();
    await expect(em.findOneOrFail(Publisher, { name: "p" })).rejects.toThrow(TooManyError);
    await expect(em.findOneOrFail(Publisher, { name: "p" })).rejects.toThrow(
      "Found more than one: SmallPublisher:1, SmallPublisher:2",
    );
  });

  it("can order by string asc", async () => {
    await insertAuthor({ first_name: "a2" });
    await insertAuthor({ first_name: "a1" });
    const em = newEntityManager();

    const orderBy = { firstName: "ASC" } satisfies AuthorOrder;
    const authors = await em.find(Author, {}, { orderBy });
    expect(authors.length).toEqual(2);
    expect(authors[0].firstName).toEqual("a1");
    expect(authors[1].firstName).toEqual("a2");

    expect(parseFindQuery(am, {}, { ...opts, orderBy })).toEqual({
      selects: [`"a".*`],
      tables: [{ alias: "a", table: "authors", join: "primary" }],
      conditions: [],
      orderBys: [{ alias: "a", column: "first_name", order: "ASC" }],
    });
  });

  it("can order by string desc", async () => {
    await insertAuthor({ first_name: "a1" });
    await insertAuthor({ first_name: "a2" });

    const em = newEntityManager();
    const orderBy = { firstName: "DESC" } satisfies AuthorOrder;
    const authors = await em.find(Author, {}, { orderBy });
    expect(authors.length).toEqual(2);
    expect(authors[0].firstName).toEqual("a2");
    expect(authors[1].firstName).toEqual("a1");

    expect(parseFindQuery(am, {}, { ...opts, orderBy })).toEqual({
      selects: [`"a".*`],
      tables: [{ alias: "a", table: "authors", join: "primary" }],
      conditions: [],
      orderBys: [{ alias: "a", column: "first_name", order: "DESC" }],
    });
  });

  it("can order by multiple m2os", async () => {
    await insertPublisher({ id: 1, name: "p1" });
    await insertPublisher({ id: 2, name: "p2" });
    await insertAuthor({ first_name: "a1", publisher_id: 2 });
    await insertAuthor({ first_name: "a2", publisher_id: 1 });

    const em = newEntityManager();
    const orderBy = { currentDraftBook: { title: "ASC" }, publisher: { name: "ASC" } } satisfies AuthorOrder;
    const authors = await em.find(Author, {}, { orderBy });
    expect(authors.length).toEqual(2);
    expect(authors[0].firstName).toEqual("a2");
    expect(authors[1].firstName).toEqual("a1");

    expect(parseFindQuery(am, {}, { ...opts, orderBy })).toEqual({
      selects: [`"a".*`],
      tables: [
        { alias: "a", table: "authors", join: "primary" },
        { alias: "b", table: "books", join: "outer", col1: "a.current_draft_book_id", col2: "b.id", distinct: false },
        { alias: "p", table: "publishers", join: "outer", col1: "a.publisher_id", col2: "p.id", distinct: false },
      ],
      conditions: [],
      orderBys: [
        { alias: "b", column: "title", order: "ASC" },
        { alias: "p", column: "name", order: "ASC" },
      ],
    });
  });

  it("can order by joined string asc", async () => {
    await insertPublisher({ name: "pB" });
    await insertPublisher({ id: 2, name: "pA" });
    await insertAuthor({ first_name: "aB", publisher_id: 1 });
    await insertAuthor({ first_name: "aA", publisher_id: 2 });

    const em = newEntityManager();
    const orderBy = { publisher: { name: "ASC" } } satisfies AuthorOrder;
    const authors = await em.find(Author, {}, { orderBy });
    expect(authors.length).toEqual(2);
    expect(authors[0].firstName).toEqual("aA");
    expect(authors[1].firstName).toEqual("aB");

    expect(parseFindQuery(am, {}, { ...opts, orderBy })).toEqual({
      selects: [`"a".*`],
      tables: [
        { alias: "a", table: "authors", join: "primary" },
        { alias: "p", table: "publishers", join: "outer", col1: "a.publisher_id", col2: "p.id", distinct: false },
      ],
      conditions: [],
      orderBys: [{ alias: "p", column: "name", order: "ASC" }],
    });
  });

  it("can find empty results in a loop", async () => {
    await insertAuthor({ first_name: "a1" });
    const em = newEntityManager();
    resetQueryCount();
    await Promise.all(
      ["a", "b"].map(async (lastName) => {
        const authors = await em.find(Author, { lastName });
        expect(authors.length).toEqual(0);
      }),
    );
    expect(numberOfQueries).toEqual(1);
  });

  it("can find with GQL filters", async () => {
    await insertAuthor({ first_name: "a1", age: 1 });
    await insertAuthor({ first_name: "a2", age: 2 });

    const em = newEntityManager();
    const gqlFilter: GraphQLAuthorFilter = {
      age: { eq: 2 },
    };
    const authors = await em.findGql(Author, gqlFilter);
    expect(authors.length).toEqual(1);
    expect(authors[0].firstName).toEqual("a2");

    expect(parseFindQuery(am, gqlFilter, opts)).toEqual({
      selects: [`"a".*`],
      tables: [{ alias: "a", table: "authors", join: "primary" }],
      conditions: [{ alias: "a", column: "age", cond: { kind: "eq", value: 2 } }],
    });
  });

  it("can findGql by foreign key is not null", async () => {
    await insertPublisher({ id: 1, name: "p1" });
    await insertAuthor({ id: 2, first_name: "a1" });
    await insertAuthor({ id: 3, first_name: "a2", publisher_id: 1 });

    const em = newEntityManager();
    const gqlFilter = { publisher: { ne: null } } as GraphQLAuthorFilter;
    const authors = await em.findGql(Author, gqlFilter);
    expect(authors.length).toEqual(1);
    expect(authors[0].firstName).toEqual("a2");

    expect(parseFindQuery(am, gqlFilter, opts)).toEqual({
      selects: [`"a".*`],
      tables: [{ alias: "a", table: "authors", join: "primary" }],
      conditions: [{ alias: "a", column: "publisher_id", cond: { kind: "not-null" } }],
    });
  });

  it("can find with GQL filters but still use hash declaration", async () => {
    await insertAuthor({ first_name: "a1", age: 1 });
    await insertAuthor({ first_name: "a2", age: 2 });
    const em = newEntityManager();
    const age = 2;
    // The { age } syntax still works i.e. for massaging arguments to findGql in TS
    const authors = await em.findGql(Author, { age });
    expect(authors.length).toEqual(1);
    expect(authors[0].firstName).toEqual("a2");
  });

  it("can find with GQL filters on booleans", async () => {
    await insertAuthor({ first_name: "a1", is_popular: false });
    await insertAuthor({ first_name: "a2", is_popular: true });
    const em = newEntityManager();
    const gqlFilter: GraphQLAuthorFilter = {
      isPopular: true,
    };
    const authors = await em.findGql(Author, gqlFilter);
    expect(authors.length).toEqual(1);
    expect(authors[0].firstName).toEqual("a2");
  });

  it("can find with GQL filters with enums", async () => {
    await insertPublisher({ name: "p1", size_id: 1 });
    const em = newEntityManager();
    const gqlFilter: GraphQLPublisherFilter = { size: [PublisherSize.Small] };
    const publishers = await em.findGql(Publisher, gqlFilter);
    expect(publishers.length).toEqual(1);
  });

  it("can find with GQL by greater than with op/value", async () => {
    await insertAuthor({ first_name: "a1", age: 1 });
    await insertAuthor({ first_name: "a2", age: 2 });

    const em = newEntityManager();
    const gqlFilter = { age: { op: "gt", value: 1 } } satisfies AuthorGraphQLFilter;
    const authors = await em.findGql(Author, gqlFilter);
    expect(authors.length).toEqual(1);

    expect(parseFindQuery(am, gqlFilter, opts)).toEqual({
      selects: [`"a".*`],
      tables: [{ alias: "a", table: "authors", join: "primary" }],
      conditions: [{ alias: "a", column: "age", cond: { kind: "gt", value: 1 } }],
    });
  });

  it("can find with GQL filters with offset/limit", async () => {
    await insertAuthor({ first_name: "a1", age: 1 });
    await insertAuthor({ first_name: "a2", age: 2 });
    const em = newEntityManager();
    const gqlFilter: GraphQLAuthorFilter = { age: { gt: 0 } };
    const authors = await em.findGql(Author, gqlFilter, { offset: 1, limit: 1 });
    expect(authors.length).toEqual(1);
    expect(authors[0].firstName).toEqual("a2");
  });

  it("can offset/limit", async () => {
    await insertPublisher({ name: "p1" });
    await insertPublisher({ id: 2, name: "p2" });
    await insertPublisher({ id: 3, name: "p3" });
    await insertPublisher({ id: 4, name: "p4" });
    const em = newEntityManager();
    const p23 = await em.find(Publisher, {}, { orderBy: { name: "ASC" }, offset: 1, limit: 2 });
    expect(p23.length).toEqual(2);
    expect(p23[0].name).toEqual("p2");
    expect(p23[1].name).toEqual("p3");

    const p43 = await em.find(Publisher, {}, { orderBy: { name: "DESC" }, offset: 2, limit: 2 });
    expect(p43.length).toEqual(2);
    expect(p43[0].name).toEqual("p2");
    expect(p43[1].name).toEqual("p1");
  });

  it("cannot find too many entities", async () => {
    try {
      await insertAuthor({ first_name: "a1" });
      await insertAuthor({ first_name: "a2" });
      await insertAuthor({ first_name: "a3" });

      setEntityLimit(3);
      const em = newEntityManager();
      await expect(em.find(Author, {})).rejects.toThrow("Query returned more than 3 rows");
    } finally {
      setDefaultEntityLimit();
    }
  });

  it("can find in an enum array", async () => {
    await insertAuthor({ first_name: "a1", favorite_colors: [1, 2] });
    await insertAuthor({ first_name: "a2", favorite_colors: [] });
    const em = newEntityManager();
    const authors = await em.find(Author, { favoriteColors: [Color.Red] });
    expect(authors.length).toEqual(1);
    expect(authors[0].firstName).toEqual("a1");
  });

  it("can find equal an enum array", async () => {
    await insertAuthor({ first_name: "a1", favorite_colors: [1, 2] });
    await insertAuthor({ first_name: "a2", favorite_colors: [1] });
    const em = newEntityManager();
    const authors = await em.find(Author, { favoriteColors: { eq: [Color.Red] } });
    expect(authors.length).toEqual(1);
    expect(authors[0].firstName).toEqual("a2");
  });

  it("can find neq an enum array", async () => {
    await insertAuthor({ first_name: "a1", favorite_colors: [1, 2] });
    await insertAuthor({ first_name: "a2", favorite_colors: [1] });
    await insertAuthor({ first_name: "a3", favorite_colors: [] });
    const em = newEntityManager();
    const authors = await em.find(Author, { favoriteColors: { ne: [Color.Red] } });
    expect(authors.length).toEqual(2);
    expect(authors[0].firstName).toEqual("a1");
    expect(authors[1].firstName).toEqual("a3");
  });

  it("can find through a polymorphic reference by id", async () => {
    await insertAuthor({ first_name: "a" });
    await insertBook({ title: "t", author_id: 1 });
    await insertComment({ text: "t1", parent_book_id: 1 });
    await insertComment({ text: "t2" });

    const em = newEntityManager();
    const where = { parent: "b:1" } satisfies CommentFilter;
    const comments = await em.find(Comment, where);
    const [comment] = comments;
    expect(comments.length).toEqual(1);
    expect(comment.text).toEqual("t1");

    expect(parseFindQuery(cm, where)).toEqual({
      selects: [`"c".*`],
      tables: [{ alias: "c", table: "comments", join: "primary" }],
      conditions: [{ alias: "c", column: "parent_book_id", cond: { kind: "eq", value: 1 } }],
    });
  });

  it("can find through a polymorphic reference by entity", async () => {
    await insertAuthor({ first_name: "a" });
    await insertBook({ title: "t", author_id: 1 });
    await insertComment({ text: "t1", parent_book_id: 1 });
    await insertComment({ text: "t2" });

    const em = newEntityManager();
    const book = await em.load(Book, "1");
    const where = { parent: book } satisfies CommentFilter;
    const comments = await em.find(Comment, where);
    const [comment] = comments;
    expect(comments.length).toEqual(1);
    expect(comment.text).toEqual("t1");

    expect(parseFindQuery(cm, where)).toEqual({
      selects: [`"c".*`],
      tables: [{ alias: "c", table: "comments", join: "primary" }],
      conditions: [{ alias: "c", column: "parent_book_id", cond: { kind: "eq", value: 1 } }],
    });
  });

  it("can find through a null polymorphic reference", async () => {
    await insertAuthor({ first_name: "a" });
    await insertBook({ title: "t", author_id: 1 });
    await insertComment({ text: "t1", parent_book_id: 1 });
    await insertComment({ text: "t2" });

    const em = newEntityManager();
    const where = { parent: null } satisfies CommentFilter;
    const comments = await em.find(Comment, where);
    const [comment] = comments;
    expect(comments.length).toEqual(1);
    expect(comment.text).toEqual("t2");

    expect(parseFindQuery(cm, where)).toEqual({
      selects: [`"c".*`],
      tables: [{ alias: "c", table: "comments", join: "primary" }],
      conditions: [
        { alias: "c", column: "parent_author_id", cond: { kind: "is-null" } },
        { alias: "c", column: "parent_book_id", cond: { kind: "is-null" } },
        { alias: "c", column: "parent_book_review_id", cond: { kind: "is-null" } },
        { alias: "c", column: "parent_publisher_id", cond: { kind: "is-null" } },
      ],
    });
  });

  it("can find through polymorphic reference by array of ids/entities", async () => {
    await insertAuthor({ first_name: "a" });
    await insertBook({ title: "t", author_id: 1 });
    await insertBookReview({ book_id: 1, rating: 5 });
    await insertComment({ text: "t1", parent_book_id: 1 });
    await insertComment({ text: "t2", parent_book_review_id: 1 });
    await insertComment({ text: "t3" });

    const em = newEntityManager();
    const where = { parent: ["b:1", "br:1"] } satisfies CommentFilter;
    const comments = await em.find(Comment, where);
    const [c1, c2] = comments;
    expect(comments.length).toEqual(2);
    expect(c1.text).toEqual("t1");
    expect(c2.text).toEqual("t2");

    expect(parseFindQuery(cm, where)).toEqual({
      selects: [`"c".*`],
      tables: [{ alias: "c", table: "comments", join: "primary" }],
      conditions: [],
      complexConditions: [
        {
          op: "or",
          conditions: [
            { alias: "c", column: "parent_book_id", cond: { kind: "in", value: [1] } },
            { alias: "c", column: "parent_book_review_id", cond: { kind: "in", value: [1] } },
          ],
        },
      ],
    });
  });

  it("can find through polymorphic reference by not id", async () => {
    await insertAuthor({ first_name: "a" });
    await insertBook({ title: "t", author_id: 1 });
    await insertBook({ title: "t", author_id: 1 });
    await insertComment({ text: "t1", parent_book_id: 1 });
    await insertComment({ text: "t2", parent_book_id: 2 });

    const em = newEntityManager();
    const where = { parent: { ne: "b:1" } } satisfies CommentFilter;
    const comments = await em.find(Comment, where);
    const [comment] = comments;
    expect(comments.length).toEqual(1);
    expect(comment.text).toEqual("t2");

    expect(parseFindQuery(cm, where)).toEqual({
      selects: [`"c".*`],
      tables: [{ alias: "c", table: "comments", join: "primary" }],
      conditions: [{ alias: "c", column: "parent_book_id", cond: { kind: "ne", value: 1 } }],
    });
  });

  it("can find through o2m to a polymorphic reference", async () => {
    await insertAuthor({ first_name: "a" });
    await insertBook({ title: "t", author_id: 1 });
    await insertComment({ text: "t1", parent_book_id: 1 });
    await insertComment({ text: "t2", parent_book_id: 1 });
    await insertComment({ text: "t3" });

    const em = newEntityManager();
    const book = await em.load(Book, "1");
    const comments = await book.comments.load();
    expect(comments.length).toEqual(2);
    expect(comments.map((c) => c.text)).toEqual(["t1", "t2"]);
  });

  it("can find through o2o to a polymorphic reference", async () => {
    await insertAuthor({ first_name: "a" });
    await insertBook({ title: "t", author_id: 1 });
    await insertBookReview({ rating: 1, book_id: 1 });
    await insertComment({ text: "t1", parent_book_review_id: 1 });

    const em = newEntityManager();
    const review = await em.load(BookReview, "1");
    const comment = await review.comment.load();
    expect(comment).toBeTruthy();
    expect(comment!.text).toEqual("t1");
  });

  it("can find through m2m matching on a primary key", async () => {
    await insertAuthor({ first_name: "a1" });
    await insertAuthor({ first_name: "a2" });
    await insertTag({ name: "t1" });
    await insertAuthorToTag({ author_id: 1, tag_id: 1 });

    const em = newEntityManager();
    const where = { tags: "t:1" } satisfies AuthorFilter;
    const authors = await em.find(Author, where);
    expect(authors.length).toEqual(1);

    expect(parseFindQuery(am, where, opts)).toEqual({
      selects: [`"a".*`],
      tables: [
        { alias: "a", table: "authors", join: "primary" },
        { alias: "att", table: "authors_to_tags", join: "outer", col1: "a.id", col2: "att.author_id" },
      ],
      conditions: [{ alias: "att", column: "tag_id", cond: { kind: "eq", value: 1 } }],
    });
  });

  it("can find through m2m matching on a column value", async () => {
    await insertAuthor({ first_name: "a1" });
    await insertAuthor({ first_name: "a2" });
    await insertTag({ name: "t1" });
    await insertAuthorToTag({ author_id: 1, tag_id: 1 });

    const em = newEntityManager();
    const where = { tags: { name: "t1" } } satisfies AuthorFilter;
    const authors = await em.find(Author, where);
    expect(authors.length).toEqual(1);

    expect(parseFindQuery(am, where, opts)).toEqual({
      selects: [`"a".*`],
      tables: [
        { alias: "a", table: "authors", join: "primary" },
        { alias: "att", table: "authors_to_tags", join: "outer", col1: "a.id", col2: "att.author_id" },
        { alias: "t", table: "tags", join: "outer", col1: "att.tag_id", col2: "t.id" },
      ],
      conditions: [{ alias: "t", column: "name", cond: { kind: "eq", value: "t1" } }],
    });
  });

  it("can have the same table twice in the query", async () => {
    await insertAuthor({ first_name: "a" });
    await insertBook({ title: "b1", author_id: 1 });
    await insertBook({ title: "b2", author_id: 1 });
    await update("authors", { id: 1, current_draft_book_id: 1 });

    const em = newEntityManager();
    const book = await em.findOneOrFail(Book, { title: "b2", author: { currentDraftBook: { title: "b1" } } });
    expect(book.title).toBe("b2");
  });

  it("can find through o2m with all children matching", async () => {
    await insertAuthor({ first_name: "a1" });
    await insertAuthor({ first_name: "a2" });
    await insertBook({ title: "b10", author_id: 1 });
    await insertBook({ title: "b11", author_id: 1 });
    await insertBook({ title: "b2", author_id: 2 });

    const em = newEntityManager();
    const where = { books: { title: { like: "b1%" } } } satisfies AuthorFilter;
    const authors = await em.find(Author, where);
    expect(authors.length).toEqual(1);
    expect(authors[0].firstName).toEqual("a1");

    expect(parseFindQuery(am, where, opts)).toEqual({
      selects: [`"a".*`],
      tables: [
        { alias: "a", table: "authors", join: "primary" },
        { alias: "b", table: "books", join: "outer", col1: "a.id", col2: "b.author_id" },
      ],
      conditions: [{ alias: "b", column: "title", cond: { kind: "like", value: "b1%" } }],
    });
  });

  it("can find through o2m with no children matching", async () => {
    await insertAuthor({ first_name: "a1" });
    await insertAuthor({ first_name: "a2" });
    await insertBook({ title: "b10", author_id: 1 });
    await insertBook({ title: "b11", author_id: 1 });
    await insertBook({ title: "b2", author_id: 2 });

    const em = newEntityManager();
    const where = { books: { title: { eq: "b3" } } } satisfies AuthorFilter;
    const authors = await em.find(Author, where);
    expect(authors.length).toEqual(0);

    expect(parseFindQuery(am, where, opts)).toEqual({
      selects: [`"a".*`],
      tables: [
        { alias: "a", table: "authors", join: "primary" },
        { alias: "b", table: "books", join: "outer", col1: "a.id", col2: "b.author_id" },
      ],
      conditions: [{ alias: "b", column: "title", cond: { kind: "eq", value: "b3" } }],
    });
  });

  it("can find through o2m matching on a primary key", async () => {
    await insertAuthor({ first_name: "a1" });
    await insertBook({ title: "b10", author_id: 1 });
    await insertBook({ title: "b11", author_id: 1 });

    const em = newEntityManager();
    const where = { books: "b:2" } satisfies AuthorFilter;
    const authors = await em.find(Author, where);
    expect(authors.length).toEqual(1);

    expect(parseFindQuery(am, where, opts)).toEqual({
      selects: [`"a".*`],
      tables: [
        { alias: "a", table: "authors", join: "primary" },
        { alias: "b", table: "books", join: "outer", col1: "a.id", col2: "b.author_id" },
      ],
      conditions: [{ alias: "b", column: "id", cond: { kind: "eq", value: 2 } }],
    });
  });

  it("can find through o2m via inheritance", async () => {
    await insertLargePublisher({ name: "p1" });
    await insertAuthor({ first_name: "a1", publisher_id: 1 });
    await insertCritic({ name: "c1", favorite_large_publisher_id: 1 });

    const em = newEntityManager();
    const where = { favoriteLargePublisher: { authors: { firstName: "a1" } } } satisfies CriticFilter;
    const critics = await em.find(Critic, where);
    expect(critics.length).toEqual(1);

    expect(parseFindQuery(criticMeta, where, opts)).toEqual({
      selects: [`"c".*`],
      tables: [
        { alias: "c", table: "critics", join: "primary" },
        { alias: "lp", table: "large_publishers", join: "inner", col1: "c.favorite_large_publisher_id", col2: "lp.id" },
        // Perhaps ideally the `col1` would be `lp_b0.id` but it doesn't matter
        { alias: "a", table: "authors", join: "outer", col1: "lp.id", col2: "a.publisher_id" },
      ],
      conditions: [{ alias: "a", column: "first_name", cond: { kind: "eq", value: "a1" } }],
    });
  });

  it("can find by unique", async () => {
    await insertAuthor({ first_name: "a1", ssn: "12" });
    await insertAuthor({ first_name: "a2", ssn: "13" });
    const em = newEntityManager();
    resetQueryCount();
    // Given two queries with exactly the same where clause
    const [a1, a2, a3] = await Promise.all([
      em.findByUnique(Author, { ssn: "12" }),
      em.findByUnique(Author, { ssn: "13" }),
      em.findByUnique(Author, { ssn: "14" }),
    ]);
    expect(a1!.firstName).toEqual("a1");
    expect(a2!.firstName).toEqual("a2");
    expect(a3).toBeUndefined();
    // Then we only issued a single SQL query
    expect(numberOfQueries).toEqual(1);
  });

  describe("complex queries", () => {
    it("can use aliases for or", async () => {
      await insertAuthor({ first_name: "a1" });
      await insertAuthor({ first_name: "a2" });
      await insertAuthor({ first_name: "a3" });

      const em = newEntityManager();
      const a = alias(Author);
      const conditions = { or: [a.firstName.eq("a1"), a.firstName.eq("a2")] };
      const authors = await em.find(Author, { as: a }, { ...opts, conditions });
      expect(authors.length).toEqual(2);

      expect(parseFindQuery(am, { as: a }, { ...opts, conditions })).toEqual({
        selects: [`"a".*`],
        tables: [{ alias: "a", table: "authors", join: "primary" }],
        conditions: [],
        complexConditions: [
          {
            op: "or",
            conditions: [
              { alias: "a", column: "first_name", cond: { kind: "eq", value: "a1" } },
              { alias: "a", column: "first_name", cond: { kind: "eq", value: "a2" } },
            ],
          },
        ],
      });
    });

    it("can use aliases as an m2o entity filter", async () => {
      await insertLargePublisher({ name: "p1" });
      await insertAuthor({ first_name: "a1", publisher_id: 1 });
      await insertAuthor({ first_name: "a2" });
      const em = newEntityManager();
      const p = alias(Publisher);
      const authors = await em.find(Author, { publisher: p }, { conditions: { and: [p.name.eq("p1")] } });
      expect(authors.length).toEqual(1);
    });

    it("can use aliases as an o2m entity filter", async () => {
      await insertAuthor({ first_name: "a1" });
      await insertBook({ title: "b1", author_id: 1 });
      await insertAuthor({ first_name: "a2" });
      const em = newEntityManager();
      const b = alias(Book);
      const authors = await em.find(Author, { books: b }, { conditions: { and: [b.title.eq("b1")] } });
      expect(authors.length).toEqual(1);
    });

    it("can use aliases for or with nested and", async () => {
      await insertAuthor({ first_name: "a1" });
      await insertAuthor({ first_name: "a2", age: 30 });
      await insertAuthor({ first_name: "a3" });

      const em = newEntityManager();
      const a = alias(Author);
      const authors = await em.find(
        Author,
        { as: a },
        {
          conditions: {
            or: [a.firstName.eq("a1"), { and: [a.firstName.eq("a2"), a.age.eq(30)] }],
          },
        },
      );
      expect(authors.length).toEqual(2);
    });

    it("can use aliases for m2o", async () => {
      await insertAuthor({ first_name: "a1" });
      await insertAuthor({ first_name: "a2" });
      await insertBook({ title: "b1", author_id: 1 });
      await insertBook({ title: "b2", author_id: 2 });

      const em = newEntityManager();
      const b = alias(Book);
      const books = await em.find(
        Book,
        { as: b },
        {
          conditions: { or: [b.author.eq("a:1"), b.author.eq("a:2")] },
        },
      );
      expect(books.length).toEqual(2);
    });

    it("prunes unused joins", async () => {
      const [a, p, b] = aliases(Author, Publisher, Book);
      expect(parseFindQuery(am, { as: a, publisher: { as: p }, books: { as: b } }, opts)).toEqual({
        selects: [`"a".*`],
        tables: [{ alias: "a", table: "authors", join: "primary" }],
        conditions: [],
      });
    });

    it("keeps all joins if pruneJoins is false", async () => {
      const filter = { publisher: {}, books: {} } satisfies AuthorFilter;
      expect(parseFindQuery(am, filter, { ...opts, pruneJoins: false })).toEqual({
        selects: [`"a".*`],
        tables: [
          { alias: "a", table: "authors", join: "primary" },
          { alias: "p", table: "publishers", join: "inner", col1: "a.publisher_id", col2: "p.id" },
          { alias: "b", table: "books", join: "outer", col1: "a.id", col2: "b.author_id" },
        ],
        conditions: [],
      });
    });

    it("keeps marked aliases", async () => {
      const filter = { publisher: {}, books: {} } satisfies AuthorFilter;
      expect(parseFindQuery(am, filter, { ...opts, keepAliases: ["b"] })).toEqual({
        selects: [`"a".*`],
        tables: [
          { alias: "a", table: "authors", join: "primary" },
          { alias: "b", table: "books", join: "outer", col1: "a.id", col2: "b.author_id" },
        ],
        conditions: [],
      });
    });

    it("does not prune joins from complex conditions", async () => {
      const [p, b] = aliases(Publisher, Book);
      expect(
        parseFindQuery(
          am,
          { publisher: { as: p }, books: { as: b } },
          { ...opts, conditions: { and: [b.title.eq("b1")] } },
        ),
      ).toEqual({
        selects: [`"a".*`],
        tables: [
          { alias: "a", table: "authors", join: "primary" },
          { alias: "b", table: "books", join: "outer", col1: "a.id", col2: "b.author_id" },
        ],
        conditions: [],
        complexConditions: [
          { op: "and", conditions: [{ alias: "b", column: "title", cond: { kind: "eq", value: "b1" } }] },
        ],
      });
    });

    it("prunes partially used complex conditions", async () => {
      await insertAuthor({ first_name: "a1" });
      await insertAuthor({ first_name: "a2" });
      await insertAuthor({ first_name: "a3" });

      const em = newEntityManager();
      const a = alias(Author);
      const conditions = { or: [a.firstName.eq("a1"), a.firstName.eq(undefined)] };
      const authors = await em.find(Author, { as: a }, { conditions });
      expect(authors.length).toEqual(1);

      expect(parseFindQuery(am, { as: a }, { ...opts, conditions })).toEqual({
        selects: [`"a".*`],
        tables: [{ alias: "a", table: "authors", join: "primary" }],
        conditions: [],
        complexConditions: [
          {
            op: "or",
            conditions: [{ alias: "a", column: "first_name", cond: { kind: "eq", value: "a1" } }],
          },
        ],
      });
    });

    it("prunes partially used complex conditions completely", async () => {
      await insertAuthor({ first_name: "a1" });
      await insertAuthor({ first_name: "a2" });
      await insertAuthor({ first_name: "a3" });

      const em = newEntityManager();
      const a = alias(Author);
      const conditions = {
        or: [a.firstName.eq("a1"), a.firstName.eq(undefined)],
        pruneIfUndefined: "any",
      } satisfies ExpressionFilter;
      const authors = await em.find(Author, { as: a }, { conditions });
      expect(authors.length).toEqual(3);

      expect(parseFindQuery(am, { as: a }, { ...opts, conditions })).toEqual({
        selects: [`"a".*`],
        tables: [{ alias: "a", table: "authors", join: "primary" }],
        conditions: [],
      });
    });

    it("prunes completely unused conditions", async () => {
      await insertAuthor({ first_name: "a1" });
      await insertAuthor({ first_name: "a2" });
      await insertAuthor({ first_name: "a3" });

      const em = newEntityManager();
      const a = alias(Author);
      const conditions = { or: [a.firstName.eq(undefined), a.firstName.eq(undefined)] };
      const authors = await em.find(Author, { as: a }, { conditions });
      expect(authors.length).toEqual(3);

      expect(parseFindQuery(am, { as: a }, { ...opts, conditions })).toEqual({
        selects: [`"a".*`],
        tables: [{ alias: "a", table: "authors", join: "primary" }],
        conditions: [],
      });
    });

    it("prunes unnecessary soft-deleted conditions", async () => {
      await insertAuthor({ first_name: "a1" });
      await insertBook({ author_id: 1, title: "b1" });

      const em = newEntityManager();
      const where = { books: { title: undefined } } satisfies AuthorFilter;
      const authors = await em.find(Author, where);
      expect(authors.length).toEqual(1);

      expect(parseFindQuery(am, where, { softDeletes: "exclude" })).toEqual({
        selects: [`"a".*`],
        tables: [{ alias: "a", table: "authors", join: "primary" }],
        conditions: [{ alias: "a", column: "deleted_at", cond: { kind: "is-null" }, pruneable: true }],
      });
    });
  });

  describe("aliases", () => {
    it("can eq", async () => {
      const a = alias(Author);
      expect(a.firstName.eq("a1")).toEqual({
        alias: "unset",
        column: "first_name",
        cond: { kind: "eq", value: "a1" },
      });
    });

    it("can ne", async () => {
      const a = alias(Author);
      expect(a.firstName.ne("a1")).toEqual({
        alias: "unset",
        column: "first_name",
        cond: { kind: "ne", value: "a1" },
      });
    });

    it("can eq a native enum", async () => {
      const a = alias(Author);
      expect(a.favoriteShape.ne(FavoriteShape.Square)).toEqual({
        alias: "unset",
        column: "favorite_shape",
        cond: { kind: "ne", value: "square" },
      });
    });

    it("can eq an enum", async () => {
      const p = alias(Publisher);
      expect(p.size.eq(PublisherSize.Large)).toEqual({
        alias: "unset",
        column: "size_id",
        cond: { kind: "eq", value: 2 },
      });
    });

    it("can eq an foreign key", async () => {
      const b = alias(Book);
      expect(b.author.eq("a:1")).toEqual({
        alias: "unset",
        column: "author_id",
        cond: { kind: "eq", value: 1 },
      });
    });

    it("can eq null a foreign key", async () => {
      const b = alias(Book);
      expect(b.author.eq(null)).toEqual({
        alias: "unset",
        column: "author_id",
        cond: { kind: "is-null" },
      });
    });

    it("can in a foreign key", async () => {
      await insertAuthor({ first_name: "a1" });
      const em = newEntityManager();
      const a1 = await em.load(Author, "a:1");
      const b = alias(Book);
      expect(b.author.in([a1, "a:2"])).toEqual({
        alias: "unset",
        column: "author_id",
        cond: { kind: "in", value: [1, 2] },
      });
    });
  });

  describe("types", () => {
    it("catch invalid entity filters", () => {
      // @ts-expect-error
      const a = { books: { foo: 1 } } satisfies AuthorFilter;
    });
  });
});

/** Example AuthorFilter generated by graphql-code-generator. */
interface GraphQLAuthorFilter {
  age?: GraphQLIntFilter | null | undefined;
  isPopular?: boolean | null | undefined;
}

/** Example IntFilter generated by graphql-code-generator. */
interface GraphQLIntFilter {
  eq?: number | null | undefined;
  in?: number[] | null | undefined;
  lte?: number | null | undefined;
  lt?: number | null | undefined;
  gte?: number | null | undefined;
  gt?: number | null | undefined;
  ne?: number | null | undefined;
}

/** Example PublisherFilter generated by graphql-code-generator. */
interface GraphQLPublisherFilter {
  size?: PublisherSize[] | null | undefined;
}
