import { Timestamp } from "firebase/firestore";

export type SignupUserDataType = {
  userName: string;
  password: string;
  email: string;
  userPicture: string;
};

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

export type ShowPostType = {
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

export type CreateCommentPostType = {
  commentId: string;
  text: string;
  createdAt: Timestamp;
  commentAuthorUid: string;
  userName: string;
  userPicture: string;
};

export type CommentPostType = {
  commentId: string;
  text: string;
  createdAt: string;
  commentAuthorUid: string;
  userName: string | undefined;
  userPicture: string | undefined;
};

export type LoginUserDataType = {
  email: string;
  password: string;
};

export type LoginUserType = {
  userName: string;
  email: string;
  userPicture: string;
  userUid: string;
};

export type ControlLoginUserType = {
  userName: string | null;
  email: string | null;
  userPicture: string | null;
  userUid: string | null;
};
