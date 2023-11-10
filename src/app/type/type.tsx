import { Timestamp } from "firebase/firestore";

export type CreatePostType = {
  id: string;
  text: string;
  category: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  picture: string;
  authorUid: string | undefined;
  userName: string | undefined;
  userPicture: string | undefined;
};

export type CommentPostUserType = {
  id: string;
  userName: string;
  userPicture: string;
  authorUid: string;
};

export type PostType = {
  id: string;
  text: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  picture: string;
  authorUid: string | undefined;
  userName: string | undefined;
  userPicture: string | undefined;
};

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
  email: string | undefined;
  userPicture: string;
  userUid: string;
};
