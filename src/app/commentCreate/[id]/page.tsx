"use client";

import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  Text,
  Textarea,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import Header from "../../components/header/header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";
import { commentPost, loginUser } from "@/states/states";
import { useState } from "react";
import { Timestamp, doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/FirebaseConfig";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "@/useAuth/useAuth";

export default function CommentCreate({ params }: { params: { id: string } }) {
  const router = useRouter();
  //ログインユーザーの情報
  // const user = useRecoilValue(loginUser);
  const loginUserData = useAuth();
  // console.log(loginUserData);
  //Comment画面遷移時のPost作成者の情報
  const commentPostUser = useRecoilValue(commentPost);
  const commentData = {
    commentId: uuidv4(),
    text: "",
    createdAt: "",
    commentAuthorUid: "",
  };
  //コメントの内容
  const [comment, setCommentData] = useState(commentData);

  const createComment = async (id: string, e: any) => {
    e.preventDefault();
    if (comment.text === "") {
      alert(" コメントが入力されていません。");
      return;
    }
    //Firebaseにデータを登録する
    await setDoc(
      doc(
        db,
        "users",
        commentPostUser.authorUid,
        "posts",
        params.id,
        "comments",
        comment.commentId
      ),
      {
        commentId: uuidv4(),
        text: comment.text,
        createdAt: Timestamp.now(),
        commentAuthorUid: loginUserData.userUid,
      }
    );
    //コメントの中を空にする
    setCommentData(commentData);
    //comment画面に遷移
    router.push(`/comment/${id}`);
  };
  // console.log(comment);

  return (
    <div>
      <Header />
      <Container maxW="1000" mb="16">
        {/* ユーザー情報とプルダウンリストと投稿ボタン */}
        <Flex direction="column">
          <Flex alignItems="center" justifyContent="space-between">
            {/* ユーザー情報 */}
            <Box display="flex" alignItems="center" p="3">
              <Wrap>
                <WrapItem>
                  <Avatar
                    name={loginUserData.userName}
                    size="md"
                    src={loginUserData.userPicture}
                  ></Avatar>
                </WrapItem>
              </Wrap>
              <Text
                // fontSize="2xl"
                ml="3"
                mr="3"
                fontSize={{
                  base: "md",
                  md: "2xl",
                }}
                bg={{ base: "red.200", md: "green.200" }}
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
                  onClick={linkToCreate}
                  borderRadius="50"
                  // pl="10"
                  pl={{ base: "3", md: "10" }}
                  pr={{ base: "3", md: "10" }}
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

          {/* CommentEdit */}
          <Box
            width="100%"
            height="255"
            borderRadius="20"
            border="2px"
            borderColor="orange.500"
            mr="10%"
            mt="5"
          >
            <Flex direction="column">
              {/* アカウント・Edit・ボタンなど */}
              <Box height="250" m="5">
                {/* アカウント・Edit */}
                <Box height="180">
                  {/* アカウント */}
                  <Flex alignItems="center" m="1">
                    <Wrap>
                      <WrapItem>
                        <Avatar
                          name={loginUserData.userName}
                          size="sm"
                          src={loginUserData.userPicture}
                        ></Avatar>
                      </WrapItem>
                    </Wrap>
                    <Text fontSize="lg" ml="3">
                      {loginUserData.userName}
                    </Text>
                  </Flex>
                  {/* アカウント */}

                  {/* コメント */}
                  <Textarea
                    placeholder="会話をしよう！"
                    resize="none"
                    borderRadius={5}
                    size="md"
                    rows={5}
                    mt={1}
                    onChange={(e) =>
                      setCommentData({ ...comment, text: e.target.value })
                    }
                  />
                  {/* コメント */}
                </Box>
                {/* 写真横のアカウント・コメント */}

                <Flex alignItems="center" justifyContent="space-between">
                  {/* マップボタン */}
                  <Box
                    height="6"
                    display="flex"
                    alignItems="center"
                    ml="1"
                    mr="1"
                    mt="1"
                  >
                    <FontAwesomeIcon
                      icon={faLocationDot}
                      size="lg"
                      color="#4299E1"
                    />
                    <Text ml="1">場所を挿入</Text>
                  </Box>
                  {/* マップボタン */}

                  {/* 投稿ボタン */}
                  <button
                    onClick={(e) => {
                      createComment(params.id, e);
                    }}
                  >
                    <Box
                      height="6"
                      display="flex"
                      alignItems="center"
                      ml="1"
                      mr="1"
                      mt="1"
                    >
                      <FontAwesomeIcon
                        icon={faCirclePlus}
                        size="lg"
                        color="#fe9611"
                      />
                      <Text ml="1">コメント</Text>
                    </Box>
                  </button>
                  {/* 投稿ボタン */}
                </Flex>
              </Box>
              {/* 写真横のアカウント・コメント・ボタンなど */}
            </Flex>
          </Box>
          {/* Create */}
        </Flex>
      </Container>
    </div>
  );
}
