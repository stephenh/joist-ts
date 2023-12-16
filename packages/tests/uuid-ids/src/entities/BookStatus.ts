import { EnumMetadata } from "joist-orm";

export enum BookStatus {
  Draft = "DRAFT",
  Published = "PUBLISHED",
}

export type BookStatusDetails = { id: string; code: BookStatus; name: string };

const details: Record<BookStatus, BookStatusDetails> = {
  [BookStatus.Draft]: { id: "00000000-0000-0000-0000-000000000001", code: BookStatus.Draft, name: "Draft" },
  [BookStatus.Published]: { id: "00000000-0000-0000-0000-000000000002", code: BookStatus.Published, name: "Published" },
};

export const BookStatusDetails: Record<BookStatus[0], BookStatusDetails> = {
  Draft: details[BookStatus.Draft],
  Published: details[BookStatus.Published],
};

export const BookStatuses: EnumMetadata<BookStatus, BookStatusDetails, string> = {
  name: "BookStatus",

  getByCode(code: BookStatus): BookStatusDetails {
    return details[code];
  },

  findByCode(code: string): BookStatusDetails | undefined {
    return details[code as BookStatus];
  },

  findById(id: string): BookStatusDetails | undefined {
    return Object.values(details).find((d) => d.id === id);
  },

  getValues(): ReadonlyArray<BookStatus> {
    return Object.values(BookStatus);
  },

  getDetails(): ReadonlyArray<BookStatusDetails> {
    return Object.values(details);
  },
};
