import { loginUserType } from "@/app/type/type";
import { atom } from "recoil";

export const loginUser = atom<any>({
  key: "loginUser",
  default: {
    userName: "",
    userPicture: "",
    email: "",
    userUid: "",
  },
});
