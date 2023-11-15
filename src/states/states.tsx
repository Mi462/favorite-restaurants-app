import { ControlLoginUserType } from "@/app/type/type";
import { atom } from "recoil";

export const loginUser = atom<ControlLoginUserType>({
  key: "loginUser",
  default: {
    userName: "",
    userPicture: "",
    email: "",
    userUid: "",
  },
});
