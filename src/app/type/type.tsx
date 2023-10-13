import { Timestamp } from "firebase/firestore";

export type PostType = {
  id: string;
  text: string;
  category: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  picture: string;
};

export type loginUserType = {
  userName: string;
  password: string;
  email: string;
  userPicture: string;
  userUid: string;
};
