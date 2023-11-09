"use client";

import { auth, db } from "@/lib/FirebaseConfig";
import { loginUser } from "@/states/states";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Link,
  Text,
} from "@chakra-ui/react";
import {
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";

export default function Login() {
  const router = useRouter();
  //ローディング
  const [loading, setLoading] = useState<boolean>(true);
  //ログイン時に入力したときの情報
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  //ログイン成功時のログイン情報
  // const setLoginUserData = useSetRecoilState(loginUser);

  const handleSubmit = async () => {
    setPersistence(auth, browserSessionPersistence)
      .then(async () => {
        // return signInWithEmailAndPassword(auth, email, password);

        return await signInWithEmailAndPassword(auth, user.email, user.password)
          .then(async (userCredential) => {
            //Login 成功！
            // await auth.onAuthStateChanged((authUser) => {
            //   if (authUser) {
            //     setLoginUserData({
            //       userName: authUser.displayName,
            //       userPicture: authUser.photoURL,
            //       email: authUser.email,
            //       userUid: authUser.uid,
            //     });
            //   }
            // });
            //Top画面へ遷移
            router.push("/top");
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // console.log(errorCode);
            // console.log(errorMessage);
            switch (errorCode) {
              case "auth/wrong-password":
                alert("パスワードが正しくありません。");
                break;
              case "auth/weak-password":
                alert("パスワードが短すぎます。6文字以上を入力してください。");
                break;
              case "auth/invalid-email":
                alert("メールアドレスが正しくありません。");
                break;
              case "auth/user-not-found":
                alert("このユーザーは存在しません。");
                break;
              case "auth/user-disabled":
                alert("ユーザーが無効になっています。");
                break;
              case "auth/too-many-requests":
                alert(
                  "ログイン試行が何度も失敗したため、このアカウントへのアクセスは一時的に無効になっています。数分後に再度お試しください。"
                );
                break;
              case "auth/network-request-failed":
                alert(
                  "通信がエラーになったのか、またはタイムアウトになりました。通信環境がいい所で再度やり直してください。"
                );
                break;
              default:
                alert(
                  "ログインに失敗しました。通信環境がいい所で再度やり直してください。"
                );
            }
          });
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  };

  return (
    <div>
      {/* header */}
      <Box
        background="orange"
        p="3"
        display="flex"
        alignItems="center"
        m="3"
        justifyContent="space-between"
      >
        <Heading textColor="white">Favorite Restaurants App</Heading>
      </Box>
      {/* header */}

      {/* ログイン */}
      <Flex height="80vh" alignItems="center" justifyContent="center">
        <Flex
          direction="column"
          background="orange.100"
          padding="12"
          rounded="6"
        >
          <Heading textAlign="center" mb="6">
            Log in
          </Heading>
          <Input
            placeholder="sample@sample.com"
            background="white"
            mb="3"
            type="sample@sample.com"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <Input
            placeholder="********"
            background="white"
            mb="6"
            type="password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <Box mb="6">
            <Text textAlign="center">デモユーザー</Text>
            <Text>Email: sample@gmail.com</Text>
            <Text>password: 123456</Text>
          </Box>
          <Button
            mb="6"
            colorScheme="orange"
            onClick={() => {
              handleSubmit();
            }}
          >
            Log in
          </Button>

          <Text textAlign="center">
            新規の方は
            <Link color="orange.500" href="/signup">
              こちら
            </Link>
            へ
          </Text>
        </Flex>
      </Flex>
      {/* ログイン */}
    </div>
  );
}
