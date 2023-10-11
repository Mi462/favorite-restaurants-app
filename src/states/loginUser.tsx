import { atom } from "recoil";

export const loginUser = atom<any>({
  key: "loginUser",
  default: {
    userName: "",
    userPicture: "",
    email: "",
    userUid: "",
    password: "",
  },
});
