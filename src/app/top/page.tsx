"use client";

import {
  Avatar,
  Box,
  Flex,
  Text,
  Wrap,
  WrapItem,
  Select,
  Button,
  Image,
  Container,
} from "@chakra-ui/react";
import Header from "../components/header/header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  collection,
  collectionGroup,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "@/lib/FirebaseConfig";
import { format } from "date-fns";
import { useSetRecoilState } from "recoil";
import { commentPost } from "@/states/states";
import { useAuth } from "@/useAuth/useAuth";

export default function Top() {
  //画面遷移
  const router = useRouter();
  //Post
  const [posts, setPosts] = useState<any>([]);
  //上のプルダウンの状態
  const [selectCategory, setSelectCategory] = useState<string>("全て");
  //ログインユーザーの情報
  const loginUserData = useAuth();
  // console.log("top", loginUserData);
  //Postしたユーザーの情報
  const [postUsers, setPostUsers] = useState<any>([]);
  //Comment画面遷移時のPost作成者の情報
  const setCommentPostUser = useSetRecoilState(commentPost);
  //ローディング
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    postUsersDataFromFirebase();
  }, []);

  useEffect(() => {
    postsDataFromFirebase();
  }, [postUsers]);

  // ログインしていなければログインページへ転送
  // if (!useAuth()) router.replace("/");

  //ログインが成功しているか確認した後で、
  //1,ユーザーの情報が入った配列とPostの情報が入った配列を用意
  const postUsersDataFromFirebase = async () => {
    //ユーザーの情報が入った配列の取得
    const q = collection(db, "users");
    await getDocs(q).then((snapShot) => {
      const getUsersData: any = snapShot.docs.map((doc) => {
        const { userPicture, userName, userUid } = doc.data();
        return { userPicture, userName, userUid };
      });
      setPostUsers(getUsersData);
    });
  };

  const postsDataFromFirebase = async () => {
    if (loginUserData.userUid) {
      //Postの情報が入った配列の取得
      const queryPosts = query(
        collectionGroup(db, "posts"),
        //updatedAtを基準に降順で取得
        orderBy("updatedAt", "desc")
      );
      await getDocs(queryPosts).then((snapShot) => {
        const getPostsData: any = snapShot.docs.map((doc) => {
          const {
            id,
            text,
            category,
            createdAt,
            updatedAt,
            picture,
            authorUid,
          } = doc.data() || {};
          const postUser = postUsers.find((p: any) => p.userUid === authorUid);
          const { userName, userPicture } = postUser || {};
          return {
            id,
            text,
            category,
            createdAt: format(createdAt.toDate(), "yyyy/MM/dd HH:mm"),
            updatedAt: format(updatedAt.toDate(), "yyyy/MM/dd HH:mm"),
            picture,
            authorUid,
            userName,
            userPicture,
          };
        });
        setPosts(getPostsData);
      });
      setLoading(false);
    }
  };
  // console.log(posts);

  const linkToComment = (
    id: string,
    userName: string,
    userPicture: string,
    authorUid: string
  ) => {
    router.push(`/comment/${id}`);
    setCommentPostUser({
      userName: userName,
      userPicture: userPicture,
      authorUid: authorUid,
    });
  };
  // console.log(commentPostUser);

  const linkToCreate = () => {
    router.push("/create");
  };

  const linkToLogin = () => {
    router.push("/");
  };

  //上のcategoryの内容を変更できる
  const onChangePostCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectCategory(e.target.value);
  };

  const breakpoints = {
    sm: "30em", // 480px以上
    md: "48em", // 768px以上
    lg: "62em", // 992px以上
    xl: "80em", // 1280px以上
    "2xl": "96em", // 1536px以上
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
                <Select
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
                </Select>
              </Box>
              {/* 上のプルダウンリスト */}
              {/* 投稿ボタン */}
              <Box mt="3" width="20%">
                <Button
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
                </Button>
              </Box>
              {/* 投稿ボタン */}
            </Box>
            {/* プルダウンリストと投稿ボタン */}
          </Flex>
          {/* ユーザー情報とプルダウンリストと投稿ボタン */}

          {/* Postsが出るところ */}
          {loading ? (
            <Flex justifyContent="center" mt="100">
              <Flex direction="column" textAlign="center">
                <Text fontSize="3xl">読み込み中…</Text>
              </Flex>
            </Flex>
          ) : posts.length > 0 ? (
            posts.map((post: any) => {
              if (selectCategory === "日本料理" && post.category !== "日本料理")
                return;
              if (selectCategory === "中国料理" && post.category !== "中国料理")
                return;
              if (
                selectCategory === "フランス料理" &&
                post.category !== "フランス料理"
              )
                return;
              if (
                selectCategory === "イタリア料理" &&
                post.category !== "イタリア料理"
              )
                return;
              if (
                selectCategory === "フランス料理" &&
                post.category !== "フランス料理"
              )
                return;
              if (
                selectCategory === "エスニック料理" &&
                post.category !== "エスニック料理"
              )
                return;
              return (
                <Box
                  // sx={{
                  //   position: "fixed",

                  //   "@media (min-width: 768px)": {},
                  // }}
                  height="300"
                  borderRadius="20"
                  background="orange.100"
                  border="2px"
                  borderColor="orange.500"
                  mt="5"
                  cursor="pointer"
                  key={post.id}
                  onClick={() => {
                    linkToComment(
                      post.id,
                      post.userName,
                      post.userPicture,
                      post.authorUid
                    );
                  }}
                >
                  <Flex>
                    {/* 写真 */}
                    <Image
                      src={post.picture}
                      alt="imageDataPost"
                      width="50%"
                      height="250"
                      ml="5"
                      mr="5"
                      mt="5"
                    />
                    {/* 写真 */}

                    {/* 写真横のアカウント・コメント・ボタンなど */}
                    <Box width="50%" height="250" mr="5" mt="5">
                      <Flex direction="column">
                        {/* 写真横のアカウント・コメント */}
                        <Box height="220">
                          {/* アカウント */}
                          <Flex
                            alignItems="center"
                            // m="3"
                            m={{ base: "1", md: "3" }}
                            justifyContent="space-between"
                          >
                            <Flex alignItems="center">
                              <Wrap>
                                <WrapItem>
                                  <Avatar
                                    name={post.userName}
                                    size="md"
                                    src={post.userPicture}
                                  ></Avatar>
                                </WrapItem>
                              </Wrap>
                              <Text
                                fontSize="lg"
                                ml={{ base: "1", md: "3" }}
                                // ml="3"
                              >
                                {post.userName}
                              </Text>
                            </Flex>
                            <Text>{post.updatedAt}</Text>
                          </Flex>
                          {/* アカウント */}

                          {/* コメント */}
                          <Box height="155">
                            <Text mb="3">カテゴリ：{post.category}</Text>
                            {/* <Box width="100%" height="55%" overflowY="scroll"> */}
                            <Text>{post.text}</Text>
                          </Box>
                          {/* </Box> */}
                          {/* コメント */}
                        </Box>
                        {/* 写真横のアカウント・コメント */}
                      </Flex>
                    </Box>
                    {/* 写真横のアカウント・コメント・ボタンなど */}
                  </Flex>
                </Box>
              );
            })
          ) : (
            <Flex justifyContent="center" mt="100">
              <Flex direction="column" textAlign="center">
                <Text fontSize="3xl">投稿は0件です</Text>
              </Flex>
            </Flex>
          )}
          {/* Postsが出るところ */}
        </Flex>
      </Container>
    </div>
  );
}
