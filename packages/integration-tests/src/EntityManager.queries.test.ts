import { EntityManager, NotFoundError, TooManyError } from "joist-orm";
import { Author, Book, Publisher, PublisherId, PublisherSize } from "./entities";
import { insertAuthor, insertBook, insertPublisher } from "./entities/factories";
import { knex, numberOfQueries, resetQueryCount } from "./setupDbTests";

describe("EntityManager.queries", () => {
  it("can find all", async () => {
    await insertAuthor({ first_name: "a1" });
    await insertAuthor({ first_name: "a2" });
    const em = new EntityManager(knex);
    const authors = await em.find(Author, {});
    expect(authors.length).toEqual(2);
    expect(authors[0].firstName).toEqual("a1");
    expect(authors[1].firstName).toEqual("a2");
  });

  it("can find by simple varchar", async () => {
    await insertAuthor({ first_name: "a1" });
    await insertAuthor({ first_name: "a2" });
    const em = new EntityManager(knex);
    const authors = await em.find(Author, { firstName: "a2" });
    expect(authors.length).toEqual(1);
    expect(authors[0].firstName).toEqual("a2");
  });

  it("can find by simple varchar not null", async () => {
    await insertAuthor({ first_name: "a1", last_name: "l1" });
    await insertAuthor({ first_name: "a2" });
    const em = new EntityManager(knex);
    const authors = await em.find(Author, { lastName: { ne: null } });
    expect(authors.length).toEqual(1);
    expect(authors[0].firstName).toEqual("a1");
  });

  it("can find by simple varchar not undefined", async () => {
    await insertAuthor({ first_name: "a1", last_name: "l1" });
    await insertAuthor({ first_name: "a2" });
    const em = new EntityManager(knex);
    const authors = await em.find(Author, { lastName: { ne: undefined } });
    expect(authors.length).toEqual(1);
    expect(authors[0].firstName).toEqual("a1");
  });

  it("can find by varchar through join", async () => {
    await insertAuthor({ first_name: "a1" });
    await insertAuthor({ first_name: "a2" });
    await insertBook({ title: "b1", author_id: 1 });
    await insertBook({ title: "b2", author_id: 2 });
    await insertBook({ title: "b3", author_id: 2 });

    const em = new EntityManager(knex);
    const books = await em.find(Book, { author: { firstName: "a2" } });
    expect(books.length).toEqual(2);
    expect(books[0].title).toEqual("b2");
    expect(books[1].title).toEqual("b3");
  });

  it("can find by varchar through two joins", async () => {
    await insertPublisher({ name: "p1" });
    await insertPublisher({ name: "p2" });
    await insertAuthor({ first_name: "a1", publisher_id: 1 });
    await insertAuthor({ first_name: "a2", publisher_id: 2 });
    await insertBook({ title: "b1", author_id: 1 });
    await insertBook({ title: "b2", author_id: 2 });

    const em = new EntityManager(knex);
    const books = await em.find(Book, { author: { publisher: { name: "p2" } } });
    expect(books.length).toEqual(1);
    expect(books[0].title).toEqual("b2");
  });

  it("can find by foreign key", async () => {
    await insertAuthor({ first_name: "a1" });
    await insertAuthor({ first_name: "a2" });
    await insertBook({ title: "b1", author_id: 1 });
    await insertBook({ title: "b2", author_id: 2 });

    const em = new EntityManager(knex);
    const a2 = await em.load(Author, "2");
    // This is different from the next test case b/c Publisher does not currently have any References
    const books = await em.find(Book, { author: a2 });
    expect(books.length).toEqual(1);
    expect(books[0].title).toEqual("b2");
  });

  it("can find by foreign key is null", async () => {
    await insertPublisher({ id: 1, name: "p1" });
    await insertAuthor({ id: 2, first_name: "a1" });
    await insertAuthor({ id: 3, first_name: "a2", publisher_id: 1 });
    const em = new EntityManager(knex);
    const authors = await em.find(Author, { publisher: null });
    expect(authors.length).toEqual(1);
    expect(authors[0].firstName).toEqual("a1");
  });

  it("can find by foreign key is new entity", async () => {
    await insertAuthor({ first_name: "a1" });
    const em = new EntityManager(knex);
    const publisher = new Publisher(em, { name: "p1" });
    const authors = await em.find(Author, { publisher });
    expect(authors.length).toEqual(0);
  });

  it("can find by foreign key is not null", async () => {
    await insertPublisher({ id: 1, name: "p1" });
    await insertAuthor({ id: 2, first_name: "a1" });
    await insertAuthor({ id: 3, first_name: "a2", publisher_id: 1 });
    const em = new EntityManager(knex);
    const authors = await em.find(Author, { publisher: { ne: null } });
    expect(authors.length).toEqual(1);
    expect(authors[0].firstName).toEqual("a2");
  });

  it("can find by foreign key is not undefined", async () => {
    await insertPublisher({ id: 1, name: "p1" });
    await insertAuthor({ id: 2, first_name: "a1" });
    await insertAuthor({ id: 3, first_name: "a2", publisher_id: 1 });
    const em = new EntityManager(knex);
    const authors = await em.find(Author, { publisher: { ne: undefined } });
    expect(authors.length).toEqual(1);
    expect(authors[0].firstName).toEqual("a2");
  });

  it("can find by foreign key is flavor", async () => {
    await insertPublisher({ id: 1, name: "p1" });
    await insertAuthor({ id: 2, first_name: "a1" });
    await insertAuthor({ id: 3, first_name: "a2", publisher_id: 1 });
    const em = new EntityManager(knex);
    const publisherId: PublisherId = "1";
    const authors = await em.find(Author, { publisher: publisherId });
    expect(authors.length).toEqual(1);
    expect(authors[0].firstName).toEqual("a2");
  });

  it("can find by foreign key is flavor list", async () => {
    await insertPublisher({ id: 1, name: "p1" });
    await insertAuthor({ id: 2, first_name: "a1" });
    await insertAuthor({ id: 3, first_name: "a2", publisher_id: 1 });
    const em = new EntityManager(knex);
    const publisherId: PublisherId = "1";
    const authors = await em.find(Author, { publisher: [publisherId] });
    expect(authors.length).toEqual(1);
    expect(authors[0].firstName).toEqual("a2");
  });

  it("can find by foreign key is not flavor", async () => {
    await insertPublisher({ id: 1, name: "p1" });
    await insertAuthor({ id: 2, first_name: "a1" });
    await insertAuthor({ id: 3, first_name: "a2", publisher_id: 1 });
    const em = new EntityManager(knex);
    const publisherId: PublisherId = "1";
    // Technically id != 1 does not match the a1.publisher_id is null. Might fix this.
    const authors = await em.find(Author, { publisher: { ne: publisherId } });
    expect(authors.length).toEqual(0);
  });

  it("can find books by publisher", async () => {
    await insertPublisher({ name: "p1" });
    await insertPublisher({ name: "p2" });
    await insertAuthor({ first_name: "a1", publisher_id: 1 });
    await insertAuthor({ first_name: "a2", publisher_id: 2 });
    await insertBook({ title: "b1", author_id: 1 });
    await insertBook({ title: "b2", author_id: 2 });

    const em = new EntityManager(knex);
    const publisher = await em.load(Publisher, "2");
    const books = await em.find(Book, { author: { publisher } });
    expect(books.length).toEqual(1);
    expect(books[0].title).toEqual("b2");
  });

  it("can find by foreign key using only an id", async () => {
    await insertAuthor({
      id: 3,
      first_name: "a1",
    });
    await insertAuthor({ id: 4, first_name: "a2" });
    await insertBook({ title: "b1", author_id: 3 });
    await insertBook({ title: "b2", author_id: 4 });

    const em = new EntityManager(knex);
    const books = await em.find(Book, { author: { id: "4" } });
    expect(books.length).toEqual(1);
    expect(books[0].title).toEqual("b2");
  });

  it("can find by ids", async () => {
    await insertPublisher({ name: "p1" });
    await insertPublisher({ name: "p2" });
    const em = new EntityManager(knex);
    const pubs = await em.find(Publisher, { id: ["1", "2"] });
    expect(pubs.length).toEqual(2);
  });

  it("can find by enums", async () => {
    await insertPublisher({ name: "p1", size_id: 1 });
    await insertPublisher({ name: "p2", size_id: 2 });
    const em = new EntityManager(knex);
    const pubs = await em.find(Publisher, { size: PublisherSize.Large });
    expect(pubs.length).toEqual(1);
    expect(pubs[0].name).toEqual("p2");
  });

  it("can find by not equal enum", async () => {
    await insertPublisher({ name: "p1", size_id: 1 });
    await insertPublisher({ name: "p2", size_id: 2 });
    const em = new EntityManager(knex);
    const pubs = await em.find(Publisher, { size: { ne: PublisherSize.Large } });
    expect(pubs.length).toEqual(1);
    expect(pubs[0].name).toEqual("p1");
  });

  it("can find by simple integer", async () => {
    await insertAuthor({ first_name: "a1", age: 1 });
    await insertAuthor({ first_name: "a2", age: 2 });
    const em = new EntityManager(knex);
    const authors = await em.find(Author, { age: 2 });
    expect(authors.length).toEqual(1);
    expect(authors[0].firstName).toEqual("a2");
  });

  it("can find by integer with eq", async () => {
    await insertAuthor({ first_name: "a1", age: 1 });
    await insertAuthor({ first_name: "a2", age: 2 });
    const em = new EntityManager(knex);
    const authors = await em.find(Author, { age: { eq: 2 } });
    expect(authors.length).toEqual(1);
    expect(authors[0].firstName).toEqual("a2");
  });

  it("can find by integer with in", async () => {
    await insertAuthor({ first_name: "a1", age: 1 });
    await insertAuthor({ first_name: "a2", age: 2 });
    const em = new EntityManager(knex);
    const authors = await em.find(Author, { age: { in: [1, 2] } });
    expect(authors.length).toEqual(2);
  });

  it("can find by integer with null", async () => {
    await insertAuthor({ first_name: "a1", age: 1 });
    await insertAuthor({ first_name: "a2" });
    const em = new EntityManager(knex);
    const authors = await em.find(Author, { age: { eq: null } });
    expect(authors.length).toEqual(1);
    expect(authors[0].firstName).toEqual("a2");
  });

  it("can find by integer with non-op null", async () => {
    await insertAuthor({ first_name: "a1", age: 1 });
    await insertAuthor({ first_name: "a2" });
    const em = new EntityManager(knex);
    const authors = await em.find(Author, { age: null });
    expect(authors.length).toEqual(1);
    expect(authors[0].firstName).toEqual("a2");
  });

  it("can find by greater than", async () => {
    await insertAuthor({ first_name: "a1", age: 1 });
    await insertAuthor({ first_name: "a2", age: 2 });
    const em = new EntityManager(knex);
    const authors = await em.find(Author, { age: { gt: 1 } });
    expect(authors.length).toEqual(1);
  });

  it("can find by greater than or equal two", async () => {
    await insertAuthor({ first_name: "a1", age: 1 });
    await insertAuthor({ first_name: "a2", age: 2 });
    const em = new EntityManager(knex);
    const authors = await em.find(Author, { age: { gte: 1 } });
    expect(authors.length).toEqual(2);
  });

  it("can find by not equal", async () => {
    await insertAuthor({ first_name: "a1", age: 1 });
    await insertAuthor({ first_name: "a2", age: 2 });
    const em = new EntityManager(knex);
    const authors = await em.find(Author, { age: { ne: 1 } });
    expect(authors.length).toEqual(1);
    expect(authors[0].firstName).toEqual("a2");
  });

  it("can find by like", async () => {
    await insertAuthor({ first_name: "a1", age: 1 });
    await insertAuthor({ first_name: "a2", age: 2 });
    const em = new EntityManager(knex);
    const authors = await em.find(Author, { firstName: { like: "a%" } });
    expect(authors.length).toEqual(2);
  });

  it("can find by like and join with not equal enum", async () => {
    await insertPublisher({ name: "p1", size_id: 1 });
    await insertPublisher({ name: "p2", size_id: 2 });
    await insertAuthor({ first_name: "a", publisher_id: 1 });
    await insertAuthor({ first_name: "a", publisher_id: 2 });
    const em = new EntityManager(knex);
    const authors = await em.find(Author, {
      firstName: "a",
      publisher: {
        size: { ne: PublisherSize.Large },
      },
    });
    expect(authors.length).toEqual(1);
    expect(authors[0].firstName).toEqual("a");
  });

  it("can find by one", async () => {
    await insertPublisher({ name: "p1", size_id: 1 });
    const em = new EntityManager(knex);
    const publisher = await em.findOne(Publisher, { name: "p2" });
    expect(publisher).toBeUndefined();
  });

  it("can find by one or fail", async () => {
    await insertPublisher({ name: "p1", size_id: 1 });
    await insertPublisher({ name: "p2", size_id: 2 });
    const em = new EntityManager(knex);
    const publisher = await em.findOneOrFail(Publisher, { name: "p2" });
    expect(publisher.name).toEqual("p2");
  });

  it("can find by one when not found", async () => {
    await insertPublisher({ name: "p1", size_id: 1 });
    await insertPublisher({ name: "p2", size_id: 2 });
    const em = new EntityManager(knex);
    await expect(em.findOneOrFail(Publisher, { name: "p3" })).rejects.toThrow(NotFoundError);
    await expect(em.findOneOrFail(Publisher, { name: "p3" })).rejects.toThrow("Did not find Publisher for given query");
  });

  it("can find by one when too many found", async () => {
    await insertPublisher({ name: "p", size_id: 1 });
    await insertPublisher({ name: "p", size_id: 2 });
    const em = new EntityManager(knex);
    await expect(em.findOneOrFail(Publisher, { name: "p" })).rejects.toThrow(TooManyError);
    await expect(em.findOneOrFail(Publisher, { name: "p" })).rejects.toThrow(
      "Found more than one: Publisher#1, Publisher#2",
    );
  });

  it("can order by string asc", async () => {
    await insertAuthor({ first_name: "a2" });
    await insertAuthor({ first_name: "a1" });
    const em = new EntityManager(knex);
    const authors = await em.find(Author, {}, { orderBy: { firstName: "ASC" } });
    expect(authors.length).toEqual(2);
    expect(authors[0].firstName).toEqual("a1");
    expect(authors[1].firstName).toEqual("a2");
  });

  it("can order by string desc", async () => {
    await insertAuthor({ first_name: "a1" });
    await insertAuthor({ first_name: "a2" });
    const em = new EntityManager(knex);
    const authors = await em.find(Author, {}, { orderBy: { firstName: "DESC" } });
    expect(authors.length).toEqual(2);
    expect(authors[0].firstName).toEqual("a2");
    expect(authors[1].firstName).toEqual("a1");
  });

  it("can order by joined string asc", async () => {
    await insertPublisher({ name: "pB" });
    await insertPublisher({ name: "pA" });
    await insertAuthor({ first_name: "aB", publisher_id: 1 });
    await insertAuthor({ first_name: "aA", publisher_id: 2 });
    const em = new EntityManager(knex);
    const authors = await em.find(Author, {}, { orderBy: { publisher: { name: "ASC" } } });
    expect(authors.length).toEqual(2);
    expect(authors[0].firstName).toEqual("aA");
    expect(authors[1].firstName).toEqual("aB");
  });

  it("can find empty results in a loop", async () => {
    await insertAuthor({ first_name: "a1" });
    const em = new EntityManager(knex);
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
    const em = new EntityManager(knex);
    const gqlFilter: GraphQLAuthorFilter = {
      age: { eq: 2 },
    };
    const authors = await em.findGql(Author, gqlFilter);
    expect(authors.length).toEqual(1);
    expect(authors[0].firstName).toEqual("a2");
  });

  it("can find with GQL filters but still use hash declaration", async () => {
    await insertAuthor({ first_name: "a1", age: 1 });
    await insertAuthor({ first_name: "a2", age: 2 });
    const em = new EntityManager(knex);
    const age = 2;
    // The { age } syntax still works i.e. for massaging arguments to findGql in TS
    const authors = await em.findGql(Author, { age });
    expect(authors.length).toEqual(1);
    expect(authors[0].firstName).toEqual("a2");
  });

  it("can find with GQL filters on booleans", async () => {
    await insertAuthor({ first_name: "a1", is_popular: false });
    await insertAuthor({ first_name: "a2", is_popular: true });
    const em = new EntityManager(knex);
    const gqlFilter: GraphQLAuthorFilter = {
      isPopular: true,
    };
    const authors = await em.findGql(Author, gqlFilter);
    expect(authors.length).toEqual(1);
    expect(authors[0].firstName).toEqual("a2");
  });

  it("can find with GQL filters with enums", async () => {
    await insertPublisher({ name: "p1", size_id: 1 });
    const em = new EntityManager(knex);
    const gqlFilter: GraphQLPublisherFilter = {
      size: [PublisherSize.Small],
    };
    const authors = await em.findGql(Publisher, gqlFilter);
    expect(authors.length).toEqual(1);
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
