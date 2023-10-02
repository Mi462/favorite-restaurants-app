"use client";

import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Wrap,
  WrapItem,
  Text,
} from "@chakra-ui/react";
import Header from "../components/header/header";
import { useRouter } from "next/navigation";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const router = useRouter();

  const linkToLogin = () => {
    router.push("/");
  };

  //新しいユーザーの登録
  // const email: any = document.getElementById('input-email').value;
  // const password: any = document.getElementById('input-password').value;
  // const auth = getAuth();
  // createUserWithEmailAndPassword(auth, email, password)
  //   .then((userCredential) => {
  //     console.log("登録成功！")
  //     // const user = userCredential.user;
  //   })
  //   .catch((error) => {
  //     console.log("エラーです")
  //     // const errorCode = error.code;
  //     // const errorMessage = error.message;
  //   })

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
            Sign up
          </Heading>
          <Box display="flex" justifyContent="center">
            <Wrap>
              <WrapItem>
                <Avatar
                  name="Tarou"
                  size="md"
                  src="https://bit.ly/dan-abramov"
                ></Avatar>
              </WrapItem>
            </Wrap>
          </Box>
          <Text display="flex" justifyContent="center" fontSize="md" mb="3">
            アカウント画像の選択
          </Text>

          <Input
            placeholder="ユーザー名"
            background="white"
            mb="3"
            type="userName"
          />
          <Input
            placeholder="sample@sample.com"
            background="white"
            mb="3"
            type="email"
          />
          <Input
            placeholder="********"
            background="white"
            mb="6"
            type="password"
          />
          <Button mb="6" colorScheme="orange" onClick={linkToLogin}>
            Sign up
          </Button>
        </Flex>
      </Flex>
      {/* ログイン */}
    </div>
  );
}
