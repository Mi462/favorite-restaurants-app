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
            {/* プルダウンリストと投稿ボタン */}
            <Box display="flex" alignItems="center" p="3">
              {/* 上のプルダウンリスト */}
              <Box mt="3" width="50%" display="flex" mr="3">
                {/* <Select
                  name="status"
                  borderColor="orange.500"
                  value={selectCategory}
                  onChange={(e) => onChangePostCategory(e)}
                >
                  <option value="全て">全て</option>
                  <option value="日本料理">日本料理</option>
                  <option value="中国料理">中国料理</option>
                  <option value="フランス料理">フランス料理</option>
                  <option value="イタリア料理">イタリア料理</option>
                  <option value="エスニック料理">エスニック料理</option>
                </Select> */}
              </Box>
              {/* 上のプルダウンリスト */}
              {/* 投稿ボタン */}
              <Box mt="3" width="20%">
                {/* <Button
                  // onClick={linkToCreate}
                  borderRadius="50"
                  pl="10"
                  pr="10"
                >
                  <Flex alignItems="center">
                    <FontAwesomeIcon icon={faPlus} size="lg" color="#fe9611" />
                    <Text ml="5">投稿</Text>
                  </Flex>
                </Button> */}
              </Box>
              {/* 投稿ボタン */}
            </Box>
            {/* プルダウンリストと投稿ボタン */}
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
