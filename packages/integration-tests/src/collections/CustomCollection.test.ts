import { EntityManager } from "joist-orm";
import { Book, Image, ImageType, Publisher } from "../entities";
import { insertAuthor, insertBook, insertImage, insertPublisher } from "@src/entities/inserts";
import { knex } from "../setupDbTests";

describe("CustomCollection", () => {
  it("can load a collection", async () => {
    await insertPublisher({ name: "p" });
    await insertAuthor({ first_name: "a1", publisher_id: 1 });
    await insertBook({ title: "b1", author_id: 1 });
    await insertImage({ file_name: "i1", type_id: 3, publisher_id: 1 });
    await insertImage({ file_name: "i2", type_id: 2, author_id: 1 });
    await insertImage({ file_name: "i3", type_id: 1, book_id: 1 });

    const em = new EntityManager(knex);
    const publisher = await em.load(Publisher, "1");
    const images = await publisher.allImages.load();
    expect(images).toHaveLength(3);
  });

  it("can populate a collection", async () => {
    await insertPublisher({ name: "p" });
    await insertAuthor({ first_name: "a1", publisher_id: 1 });
    await insertBook({ title: "b1", author_id: 1 });
    await insertImage({ file_name: "i1", type_id: 3, publisher_id: 1 });
    await insertImage({ file_name: "i2", type_id: 2, author_id: 1 });
    await insertImage({ file_name: "i3", type_id: 1, book_id: 1 });

    const em = new EntityManager(knex);
    const publisher = await em.load(Publisher, "1", "allImages");
    expect(publisher.allImages.get).toHaveLength(3);
  });

  it("does not cache the collection value", async () => {
    await insertPublisher({ name: "p" });
    await insertAuthor({ first_name: "a1", publisher_id: 1 });
    await insertBook({ title: "b1", author_id: 1 });
    await insertImage({ file_name: "i1", type_id: 3, publisher_id: 1 });
    await insertImage({ file_name: "i2", type_id: 2, author_id: 1 });

    const em = new EntityManager(knex);
    const book = await em.load(Book, "1", "image");
    const publisher = await em.load(Publisher, "1", "allImages");

    expect(publisher.allImages.get).toHaveLength(2);
    em.create(Image, { book, type: ImageType.BookImage, fileName: "i3" });
    expect(publisher.allImages.get).toHaveLength(3);
  });

  it("can set a collection", async () => {
    await insertPublisher({ name: "p" });
    await insertAuthor({ first_name: "a1", publisher_id: 1 });
    await insertBook({ title: "b1", author_id: 1 });
    await insertImage({ file_name: "i1", type_id: 3, publisher_id: 1 });
    await insertImage({ file_name: "i2", type_id: 2, author_id: 1 });
    await insertImage({ file_name: "i3", type_id: 1, book_id: 1 });

    const em = new EntityManager(knex);
    const publisher = await em.load(Publisher, "1", "allImages");
    const [i1, i2, i3] = await em.loadAll(Image, ["1", "2", "3"], "owner");
    const i4 = em.createPartial(Image, { fileName: "i4" });

    expect(publisher.allImages.get).toEqual([i1, i2, i3]);
    publisher.allImages.set([i2, i4]);
    await em.flush();
    expect(publisher.allImages.get).toEqual([i4, i2]);
  });

  it("can set a collection through opts", async () => {
    await insertPublisher({ name: "p" });
    await insertAuthor({ first_name: "a1", publisher_id: 1 });
    await insertBook({ title: "b1", author_id: 1 });
    await insertImage({ file_name: "i1", type_id: 3, publisher_id: 1 });
    await insertImage({ file_name: "i2", type_id: 2, author_id: 1 });
    await insertImage({ file_name: "i3", type_id: 1, book_id: 1 });

    const em = new EntityManager(knex);
    const publisher = await em.load(Publisher, "1", "allImages");
    const [i1, i2, i3] = await em.loadAll(Image, ["1", "2", "3"], "owner");
    const i4 = em.createPartial(Image, { fileName: "i4" });

    expect(publisher.allImages.get).toEqual([i1, i2, i3]);
    publisher.setPartial({ allImages: [i2, i4] } as any);
    await em.flush();
    expect(publisher.allImages.get).toEqual([i4, i2]);
  });

  it("can add to a collection", async () => {
    await insertPublisher({ name: "p" });
    await insertAuthor({ first_name: "a1", publisher_id: 1 });
    await insertBook({ title: "b1", author_id: 1 });
    await insertImage({ file_name: "i1", type_id: 3, publisher_id: 1 });
    await insertImage({ file_name: "i2", type_id: 2, author_id: 1 });
    await insertImage({ file_name: "i3", type_id: 1, book_id: 1 });

    const em = new EntityManager(knex);
    const publisher = await em.load(Publisher, "1", "allImages");
    const [i1, i2, i3] = await em.loadAll(Image, ["1", "2", "3"], "owner");
    const i4 = em.createPartial(Image, { fileName: "i4" });

    expect(publisher.allImages.get).toEqual([i1, i2, i3]);
    publisher.allImages.add(i4);
    await em.flush();
    expect(publisher.allImages.get).toEqual([i1, i4, i2, i3]);
  });

  it("can remove from a collection", async () => {
    await insertPublisher({ name: "p" });
    await insertAuthor({ first_name: "a1", publisher_id: 1 });
    await insertBook({ title: "b1", author_id: 1 });
    await insertImage({ file_name: "i1", type_id: 3, publisher_id: 1 });
    await insertImage({ file_name: "i2", type_id: 2, author_id: 1 });
    await insertImage({ file_name: "i3", type_id: 1, book_id: 1 });

    const em = new EntityManager(knex);
    const publisher = await em.load(Publisher, "1", "allImages");
    const [i1, i2, i3] = await em.loadAll(Image, ["1", "2", "3"], "owner");

    expect(publisher.allImages.get).toEqual([i1, i2, i3]);
    publisher.allImages.remove(i2);
    await em.flush();
    expect(publisher.allImages.get).toEqual([i1, i3]);
  });
});
