// Normally projects would have this file generated by graphql-code-generator,
// but here we're just hand-coding it for proof-of-concept/diff-based verification.
import { Context } from "@src/context";
import { AdvanceStatus, ImageType, PublisherSize } from "@src/entities";

export type Resolver<R, A, T> = (root: R, args: A, ctx: Context, info: any) => T | Promise<T>;

export type AuthorResolvers = {};
export type BookResolvers = {};
export type BookAdvanceResolvers = {};
export type BookReviewResolvers = {};
export type ImageResolvers = {};
export type PublisherResolvers = {};
export type TagResolvers = {};
export type CriticResolvers = {};

export type SaveAuthorInput = {};
export type SaveBookInput = {};
export type SaveBookAdvanceInput = {};
export type SaveBookReviewInput = {};
export type SaveImageInput = {};
export type SavePublisherInput = {};
export type SaveTagInput = {};
export type SaveCriticInput = {};

export type MutationResolvers = {
  saveAuthor(root: any, args: any, ctx: Context, info: any): any;
  saveBook(root: any, args: any, ctx: Context, info: any): any;
  saveBookAdvance(root: any, args: any, ctx: Context, info: any): any;
  saveBookReview(root: any, args: any, ctx: Context, info: any): any;
  saveImage(root: any, args: any, ctx: Context, info: any): any;
  savePublisher(root: any, args: any, ctx: Context, info: any): any;
  saveTag(root: any, args: any, ctx: Context, info: any): any;
  saveCritic(root: any, args: any, ctx: Context, info: any): any;
};

export type Resolvers = {
  PublisherSizeDetail: {
    code: (root: PublisherSize) => string;
    name: (root: PublisherSize) => string;
  };

  ImageTypeDetail: {
    code: (root: ImageType) => string;
    name: (root: ImageType) => string;
    sortOrder: (root: ImageType) => number;
  };

  AdvanceStatusDetail: {
    code: (root: AdvanceStatus) => string;
    name: (root: AdvanceStatus) => string;
  };
};
