"use client";

import {
  Avatar,
  Box,
  Container,
  Flex,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import Header from "../components/header/header";
import { useAuth } from "@/useAuth/useAuth";

export default function Top() {
  //ログインユーザー
  const loginUserData = useAuth();

  return (
    <div>
      <Header />
      <Container maxW="1000">
        {/* ユーザー情報とプルダウンリストと投稿ボタン */}
        <Flex direction="column">
          <Flex alignItems="center" justifyContent="space-between">
            {/* ユーザー情報 */}
            <Box display="flex" alignItems="center" p="3">
              <Wrap>
                <WrapItem>
                  <Avatar
                    name={loginUserData.userName!}
                    size="md"
                    src={loginUserData.userPicture!}
                  ></Avatar>
                </WrapItem>
              </Wrap>
              <Text
                fontSize={{
                  base: "md",
                  md: "2xl",
                }}
                // bg={{ base: "red.200", md: "green.200" }}
                ml="3"
                mr="3"
              >
                {loginUserData.userName}
              </Text>
            </Box>
            {/* ユーザー情報 */}
          </Flex>
          {/* ユーザー情報とプルダウンリストと投稿ボタン */}
          <Box width="100%" height="100%" mb="5">
            {/* 囲いの中 */}
            <Box
              height="500"
              borderRadius="20"
              border="2px"
              borderColor="orange.500"
              mt="5"
            >
              <Flex direction="column">
                <Text
                  fontSize={{
                    base: "md",
                    md: "2xl",
                  }}
                  mt="5"
                  ml="5"
                >
                  マップ
                </Text>
                {/* 写真 */}
                <Box height="420" background="#FEFCBF" ml="5" mr="5">
                  Mapを取得して記録した位置情報を取り出して表示する
                </Box>
                {/* 写真 */}
              </Flex>
            </Box>
            {/* 囲いの中 */}
          </Box>
        </Flex>
      </Container>
    </div>
  );
}
