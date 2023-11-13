"use client";

import {
  Avatar,
  Box,
  Container,
  Flex,
  Text,
  Textarea,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import Header from "../../components/header/header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Timestamp, doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/FirebaseConfig";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "@/useAuth/useAuth";
import { CreateCommentType } from "@/app/type/type";

export default function CommentCreate() {
  const router = useRouter();
  //Post作成者の情報
  const searchParams = useSearchParams();
  const postAuthorUid = searchParams.get("postAuthorUid");
  //Postのid
  const params = useParams();
  const id = params.id as string;
  //ログインユーザーの情報
  const loginUserData = useAuth();
  //コメントの内容
  const commentData = {
    commentId: uuidv4(),
    text: "",
    createdAt: Timestamp.now(),
    commentAuthorUid: "",
    userName: "",
    userPicture: "",
  };
  const [comment, setCommentData] = useState<CreateCommentType>(commentData);

  //「//投稿ボタン押下時にFirebaseにデータが登録され、Top画面に遷移する関数
  const createComment = async (
    id: string,
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    e.preventDefault();
    //コメントが入力されているかチェック
    if (comment.text === "") {
      alert(" コメントが入力されていません。");
      return;
    }
    //textに100文字以上入力されていないかチェック
    if (comment.text.replace(/\n/g, "").length > 100) {
      alert("入力できる文字数は100までです。");
      return;
    }
    //Firebaseにデータを登録する
    if (postAuthorUid && id) {
      await setDoc(
        doc(
          db,
          "users",
          postAuthorUid,
          "posts",
          id,
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
      router.push(`/comment/${id}?postAuthorUid=${postAuthorUid}`);
    }
  };

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
                    name={loginUserData.userName!}
                    size="md"
                    src={loginUserData.userPicture!}
                  ></Avatar>
                </WrapItem>
              </Wrap>
              <Text
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
            height={{ base: "230", md: "255" }}
            borderRadius="20"
            border="2px"
            borderColor="orange.500"
            mt={{ base: "3", md: "5" }}
          >
            <Flex direction="column">
              {/* アカウント・Edit・ボタンなど */}
              <Box
                height={{ base: "10", md: "210" }}
                m={{ base: "3", md: "5" }}
              >
                {/* アカウント・Edit */}
                <Box height={{ base: "170", md: "180" }}>
                  {/* アカウント */}
                  <Flex alignItems="center" m="1">
                    <Wrap>
                      <WrapItem>
                        <Avatar
                          name={loginUserData.userName!}
                          size="sm"
                          src={loginUserData.userPicture!}
                        ></Avatar>
                      </WrapItem>
                    </Wrap>
                    <Text
                      fontSize={{ base: "10", md: "lg" }}
                      ml={{ base: "1", md: "3" }}
                    >
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
                    {/* <FontAwesomeIcon
                      icon={faLocationDot}
                      size="lg"
                      color="#4299E1"
                    />
                    <Text ml="1" fontSize={{ base: "10", md: "lg" }}>
                      場所を挿入
                    </Text> */}
                  </Box>
                  {/* マップボタン */}

                  {/* 投稿ボタン */}
                  <button
                    onClick={(e) => {
                      createComment(id, e);
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
                      <Text ml="1" fontSize={{ base: "10", md: "lg" }}>
                        コメント
                      </Text>
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
