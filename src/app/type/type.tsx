import { Timestamp } from "firebase/firestore";

// export type CreatePostType = {
//   id: string;
//   text: string;
//   category: string;
//   createdAt: Timestamp;
//   updatedAt: Timestamp;
//   picture: string;
//   authorUid: string | undefined;
//   userName: string | undefined;
//   userPicture: string | undefined;
// };

export type CreatePostType = {
  id: string;
  text: string;
  category: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  picture: string;
  authorUid: string;
  userName: string;
  userPicture: string;
};

export type CreateCommentType = {
  commentId: string;
  text: string;
  createdAt: Timestamp;
  commentAuthorUid: string;
  userName: string;
  userPicture: string;
};

export type ExampleType = {
  id: string;
  userName: string;
  userPicture: string;
  authorUid: string;
};

export type CommentPostUserType = {
  id: string;
  userName: string;
  userPicture: string;
  authorUid: string;
};

// export type PostType = {
//   id: string;
//   text: string;
//   category: string;
//   createdAt: string;
//   updatedAt: string;
//   picture: string;
//   authorUid: string;
//   userName: string | undefined;
//   userPicture: string | undefined;
// };

export type PostType = {
  id: string;
  text: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  picture: string;
  authorUid: string;
  userName: string | undefined;
  userPicture: string | undefined;
};

export type PostSecondType = {
  id: string | null;
  text: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  picture: string;
  authorUid: string | null;
  userName: string | undefined;
  userPicture: string | undefined;
};

export type PostPostType = {
  id: string;
  text: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  picture: string;
  authorUid: string;
  userName: string;
  userPicture: string;
};

// export type CommentPostType = {
//   commentId: string;
//   text: string;
//   createdAt: string;
//   commentAuthorUid: string;
//   userName: string | undefined;
//   userPicture: string | undefined;
// };

export type CommentPostType = {
  commentId: string;
  text: string;
  createdAt: string;
  commentAuthorUid: string;
  userName: string | undefined;
  userPicture: string | undefined;
};

export type loginUserType = {
  userName: string;
  email: string;
  userPicture: string;
  userUid: string;
};
