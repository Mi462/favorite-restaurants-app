"use client";

import {
  Avatar,
  Box,
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
import Sidebar from "../../components/sidebar/sidebar";
import { useRecoilState } from "recoil";
import { commentPost, loginUser } from "@/states/states";
import { useState } from "react";
import { Timestamp, doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/FirebaseConfig";
import { v4 as uuidv4 } from "uuid";

export default function CommentCreate({ params }: { params: { id: string } }) {
  const router = useRouter();
  //ログインユーザーの情報
  const [user, setUser] = useRecoilState(loginUser);
  //Comment画面遷移時のPost作成者の情報
  const [commentPostUser, setCommentPostUser] = useRecoilState(commentPost);
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
        commentAuthorUid: user.userUid,
      }
    );
    //コメントの中を空にする
    setCommentData(commentData);
    //comment画面に遷移
    router.push(`/comment/${id}`);
  };
  console.log(comment);

  return (
    <div>
      <Header />

      <Flex>
        {/* Sidebar */}
        <Box width="20%" height="100%" ml="10%" mt="5">
          <Sidebar />
        </Box>
        {/* Sidebar */}

        {/* CommentEdit */}
        <Box
          width="60%"
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
                        name={user.userName}
                        size="sm"
                        src={user.userPicture}
                      ></Avatar>
                    </WrapItem>
                  </Wrap>
                  <Text fontSize="lg" ml="3">
                    {user.userName}
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
    </div>
  );
}
