"use client";

import { useAuth } from "@/useAuth/useAuth";
import { auth } from "@/lib/FirebaseConfig";
import { Button } from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Logout() {
  //ログインユーザーの情報
  // const user = useRecoilValue(loginUser);
  const loginUserData = useAuth();
  // console.log(loginUserData);
  const router = useRouter();

  const logOut = async () => {
    await signOut(auth)
      .then(() => {
        console.log("ログアウト成功");
        console.log(loginUserData);
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
