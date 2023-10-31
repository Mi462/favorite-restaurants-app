"use client";

import { auth } from "@/lib/FirebaseConfig";
import { loginUser } from "@/states/states";
import { Button } from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";

export default function Logout() {
  //ログインユーザーの情報
  const user = useRecoilValue(loginUser);

  const router = useRouter();

  const logOut = async () => {
    await signOut(auth)
      .then(() => {
        console.log("ログアウト成功");
        console.log(user);
        router.push("/");
      })
      .catch((e) => {
        alert("ログアウトに失敗しました");
        console.log(e);
      });
  };

  return (
    <div>
      {/* logoutボタン */}
      <Button onClick={logOut}>LOGOUT</Button>
      {/* logoutボタン */}
    </div>
  );
}