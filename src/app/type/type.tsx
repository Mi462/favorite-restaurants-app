import { Timestamp } from "firebase/firestore";

export type PostType = {
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

export type loginUserType = {
  userName: string;

  email: string;
  userPicture: string;
  userUid: string;
};

export type CombinededPostsType = {
  id: string;
  text: string;
  category: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  picture: string;
  autherUid: string;
  userData: {
    userPicture: string;
    userName: string;
  };
};
