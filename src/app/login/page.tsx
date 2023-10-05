"use client";

import { auth } from "@/lib/FirebaseConfig";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Link,
  Text,
} from "@chakra-ui/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [user, setUser] = useState({
    userName: "",
    password: "",
    email: "",
    userPicture: "",
  });

  const handleSubmit = async () => {
    await signInWithEmailAndPassword(auth, user.email, user.password)
      .then((userCredential) => {
        //Sign in 成功！
        const user = userCredential.user;
        console.log(user);
        // const uid = userCredential.user.uid;
        // console.log(uid);
        const logInUser = auth.currentUser;
        if (logInUser !== null) {
          // const displayName: any = logInUser.displayName;
          // const email = logInUser.email;
          // const photoURL: any = logInUser.photoURL;
          // const emailVerified = logInUser.emailVerified;
          // const uid = logInUser.uid;
          // setUser({
          //   userName: displayName,
          //   password: user.password,
          //   email: user.email,
          //   userPicture: photoURL,
          // });
        }
        //Top画面へ遷移
        // router.push("/top");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
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
              "アカウントの作成に失敗しました。通信環境がいい所で再度やり直してください。"
            );
        }
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
            type="email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <Input
            placeholder="********"
            background="white"
            mb="6"
            type="password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />

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
