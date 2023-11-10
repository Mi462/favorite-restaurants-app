import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "recoil-persist",
  storage: typeof window === "undefined" ? undefined : sessionStorage,
});

export const loginUser = atom<any>({
  key: "loginUser",
  default: {
    userName: "",
    userPicture: "",
    email: "",
    userUid: "",
  },
});

export const commentPost = atom<any>({
  key: "commentPost",
  default: {
    userName: "",
    userPicture: "",
    authorUid: "",
  },
  effects_UNSTABLE: [persistAtom],
});
