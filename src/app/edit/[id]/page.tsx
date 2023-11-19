"use client";

import {
  Avatar,
  Box,
  Container,
  Flex,
  Image,
  Select,
  Text,
  Textarea,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import Header from "../../components/header/page";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Timestamp,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/FirebaseConfig";
import { format } from "date-fns";
import { useAuth } from "@/useAuth/useAuth";
import { PostType, LoginUserType } from "@/app/type/type";

export default function Edit({ params }: { params: { id: string } }) {
  //画面遷移用
  const router = useRouter();
  //状態
  const [editPost, setEditPost] = useState<PostType>({
    id: params.id,
    text: "",
    category: "日本料理",
    createdAt: "",
    updatedAt: "",
    picture: "",
    authorUid: "",
    userName: "",
    userPicture: "",
  });
  //ログインユーザー
  const loginUserData = useAuth();
  //Postしたユーザーの情報
  const [postUsers, setPostUsers] = useState<LoginUserType[]>([]);
  //ローディング
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    postUsersDataFromFirebase();
  }, []);

  useEffect(() => {
    postDataFromFirebase();
  }, [postUsers]);

  //1, ユーザーの情報が入った配列とPostの情報が入った配列を用意
  //ユーザーの情報が入った配列の取得
  const postUsersDataFromFirebase = async () => {
    const q = collection(db, "users");
    await getDocs(q).then((snapShot) => {
      const getUsersData: LoginUserType[] = snapShot.docs.map((doc) => {
        const { userPicture, userName, userUid, email } = doc.data();
        return { userPicture, userName, userUid, email };
      });
      setPostUsers(getUsersData);
    });
  };

  const postDataFromFirebase = async () => {
    if (loginUserData.userUid) {
      //渡ってきたidを元にデータベースからデータを取り出してきた
      const docSnap = await getDoc(
        doc(db, "users", loginUserData.userUid, "posts", params.id)
      );
      const { text, category, createdAt, updatedAt, picture, authorUid } =
        docSnap.data() || {};
      const postUser = postUsers.find(
        (p: LoginUserType) => p.userUid === authorUid
      );
      const { userName, userPicture } = postUser || {};
      //取り出したデータをsetEditTodoに設定する
      setEditPost({
        id: params.id,
        text,
        category,
        createdAt: format(createdAt.toDate(), "yyyy/MM/dd HH:mm"),
        updatedAt: format(updatedAt.toDate(), "yyyy/MM/dd HH:mm"),
        picture,
        authorUid,
        userName,
        userPicture,
      });
      setLoading(false);
    }
  };

  //再投稿ボタン押下時にFirebaseにあるデータが更新され、Top画面に遷移する関数
  const onClickEditPost = async (
    id: string,
    e: React.MouseEvent<HTMLElement>
  ) => {
    if (loginUserData.userUid) {
      e.preventDefault();
      //textに何も記入されていない場合は反映されない
      if (editPost.text === "") {
        alert("テキストが入力されていません。");
        return;
      }
      //Firebaseでデータを更新する
      await updateDoc(doc(db, "users", loginUserData.userUid, "posts", id), {
        text: editPost.text,
        category: editPost.category,
        updatedAt: Timestamp.now(),
      });
      //Top画面に遷移する
      router.push("/top");
    }
  };

  return (
    <div>
      <Header />
      <Container maxW="1000">
        <Flex direction="column">
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
              ml="3"
              mr="3"
            >
              {loginUserData.userName}
            </Text>
          </Box>
          {/* ユーザー情報 */}

          {/* Edit */}
          {loading ? (
            <Flex justifyContent="center" mt="100">
              <Flex direction="column" textAlign="center">
                <Text fontSize="3xl">読み込み中…</Text>
              </Flex>
            </Flex>
          ) : (
            <Box
              width="100%"
              height={{ base: "200", md: "300" }}
              borderRadius="20"
              border="2px"
              borderColor="orange.500"
              mt="5"
            >
              <Flex>
                {/* 写真 */}
                <Image
                  src={editPost.picture}
                  alt="imageDataPost"
                  width="50%"
                  height={{ base: "170", md: "250" }}
                  ml={{ base: "3", md: "5" }}
                  mr={{ base: "3", md: "5" }}
                  mt={{ base: "3", md: "5" }}
                />
                {/* 写真 */}

                {/* 写真横のアカウント・コメント・ボタンなど */}
                <Box
                  width="50%"
                  height="250"
                  mr={{ base: "3", md: "5" }}
                  mt={{ base: "3", md: "5" }}
                >
                  <Flex direction="column">
                    {/* 写真横のアカウント・コメント */}
                    <Box height={{ base: "150", md: "210" }}>
                      {/* アカウント */}
                      <Flex alignItems="center" m={{ base: "1", md: "3" }}>
                        <Wrap>
                          <WrapItem>
                            <Avatar
                              name={editPost.userName}
                              size={{ base: "sm", md: "md" }}
                              src={editPost.userPicture}
                            ></Avatar>
                          </WrapItem>
                        </Wrap>
                        <Text
                          fontSize={{ base: "10", md: "lg" }}
                          ml={{ base: "1", md: "3" }}
                        >
                          {editPost.userName}
                        </Text>
                      </Flex>
                      {/* アカウント */}

                      {/* コメント */}
                      <Select
                        size="sm"
                        borderRadius="5"
                        fontSize={{ base: "10", md: "md" }}
                        value={editPost.category}
                        onChange={(e) => {
                          setEditPost({
                            ...editPost,
                            category: e.target.value,
                          });
                        }}
                      >
                        <option value="日本料理">日本料理</option>
                        <option value="中国料理">中国料理</option>
                        <option value="フランス料理">フランス料理</option>
                        <option value="イタリア料理">イタリア料理</option>
                        <option value="エスニック料理">エスニック料理</option>
                      </Select>
                      <Textarea
                        resize="none"
                        borderRadius={5}
                        size="md"
                        fontSize={{ base: "10", md: "md" }}
                        rows={4}
                        mt={1}
                        value={editPost.text}
                        onChange={(e) => {
                          setEditPost({ ...editPost, text: e.target.value });
                        }}
                      />
                      {/* コメント */}
                    </Box>
                    {/* 写真横のアカウント・コメント */}

                    <Flex alignItems="center" justifyContent="end">
                      {/* 投稿ボタン */}
                      <button onClick={(e) => onClickEditPost(params.id, e)}>
                        <Box
                          height="6"
                          display="flex"
                          alignItems="center"
                          ml="1"
                          mr="1"
                          mt={{ base: "1", md: "3" }}
                        >
                          <FontAwesomeIcon
                            icon={faRotateRight}
                            size="lg"
                            color="#fe9611"
                          />
                          <Text ml="1" fontSize={{ base: "10", md: "lg" }}>
                            再投稿
                          </Text>
                        </Box>
                      </button>
                      {/* 投稿ボタン */}
                    </Flex>
                  </Flex>
                </Box>
                {/* 写真横のアカウント・コメント・ボタンなど */}
              </Flex>
            </Box>
          )}
          {/* Edit */}
        </Flex>
      </Container>
    </div>
  );
}
