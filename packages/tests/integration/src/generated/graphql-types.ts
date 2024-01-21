// Normally projects would have this file generated by graphql-code-generator,
// but here we're just hand-coding it for proof-of-concept/diff-based verification.
import { Context } from "@src/context";
import {
  AdvanceStatus,
  Author,
  AuthorStat,
  Book,
  BookAdvance,
  BookReview,
  Color,
  Comment,
  Critic,
  Image,
  ImageType,
  LargePublisher,
  Publisher,
  PublisherGroup,
  PublisherSize,
  PublisherType,
  SmallPublisher,
  Tag,
  User,
} from "@src/entities";

export type MaybePromise<T> = T | Promise<T>;
export type Resolver<R, A, T> = (root: R, args: A, ctx: Context, info: any) => MaybePromise<T>;

export type AuthorResolvers = {
  firstName: Resolver<Author, any, string>;
  lastName: Resolver<Author, any, string | undefined>;
  graphqlOnlyField: Resolver<Author, number, number>;
};
export type AuthorStatResolvers = {
  smallint: Resolver<AuthorStat, any, number>;
};
export type BookResolvers = {
  title: Resolver<Book, any, string>;
};
export type BookAdvanceResolvers = {
  status: Resolver<BookAdvance, any, AdvanceStatus>;
};
export type BookReviewResolvers = {
  rating: Resolver<BookReview, any, number>;
};
export type CommentResolvers = {
  comment: Resolver<Comment, any, string | undefined | null>;
};
export type ImageResolvers = {
  fileName: Resolver<Image, any, string>;
};
export type PublisherResolvers = {
  name: Resolver<Publisher, any, string>;
};
export type LargePublisherResolvers = {
  name: Resolver<LargePublisher, any, string>;
  country: Resolver<LargePublisher, any, string | undefined>;
};
export type SmallPublisherResolvers = {
  name: Resolver<SmallPublisher, any, string>;
  city: Resolver<SmallPublisher, any, string>;
};
export type PublisherGroupResolvers = {
  name: Resolver<PublisherGroup, any, string | undefined>;
};
export type TagResolvers = {
  name: Resolver<Tag, any, string>;
};
export type CriticResolvers = {
  name: Resolver<Critic, any, string>;
};

export type UserResolvers = {
  name: Resolver<User, any, string>;
  email: Resolver<User, any, string>;
};

export type SaveAuthorInput = {};
export type SaveBookInput = {};
export type SaveAuthorStatInput = {};
export type SaveBookAdvanceInput = {};
export type SaveBookReviewInput = {};
export type SaveCommentInput = {};
export type SaveImageInput = {};
export type SavePublisherInput = {};
export type SaveSmallPublisherInput = {};
export type SaveLargePublisherInput = {};
export type SavePublisherGroupInput = {};
export type SaveTagInput = {};
export type SaveCriticInput = {};
export type SaveUserInput = {};

export type MutationResolvers = {
  saveAuthor(root: any, args: any, ctx: Context, info: any): any;
  saveAuthorStat(root: any, args: any, ctx: Context, info: any): any;
  saveBook(root: any, args: { input: SaveBookInput }, ctx: Context, info: any): any;
  saveBookAdvance(root: any, args: any, ctx: Context, info: any): any;
  saveBookReview(root: any, args: any, ctx: Context, info: any): any;
  saveComment(root: any, args: any, ctx: Context, info: any): any;
  saveImage(root: any, args: any, ctx: Context, info: any): any;
  savePublisher(root: any, args: any, ctx: Context, info: any): any;
  saveLargePublisher(root: any, args: any, ctx: Context, info: any): any;
  saveSmallPublisher(root: any, args: any, ctx: Context, info: any): any;
  savePublisherGroup(root: any, args: any, ctx: Context, info: any): any;
  saveTag(root: any, args: any, ctx: Context, info: any): any;
  saveCritic(root: any, args: any, ctx: Context, info: any): any;
  saveUser(root: any, args: any, ctx: Context, info: any): any;
};

export type Resolvers = {
  PublisherSizeDetail: {
    code: (root: PublisherSize) => string;
    name: (root: PublisherSize) => string;
  };

  PublisherTypeDetail: {
    code: (root: PublisherType) => string;
    name: (root: PublisherType) => string;
  };

  ImageTypeDetail: {
    code: (root: ImageType) => string;
    name: (root: ImageType) => string;
    sortOrder: (root: ImageType) => number;
    visible: (root: ImageType) => boolean;
    nickname: (root: ImageType) => string;
  };

  AdvanceStatusDetail: {
    code: (root: AdvanceStatus) => string;
    name: (root: AdvanceStatus) => string;
  };

  ColorDetail: {
    code: (root: Color) => string;
    name: (root: Color) => string;
  };
};
