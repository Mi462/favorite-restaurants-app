import { atom } from "recoil";

export const userData = atom<any>({
  key: "userData",
  default: {
    userName: "",
    password: "",
    email: "",
    userPicture: "",
  },
});
