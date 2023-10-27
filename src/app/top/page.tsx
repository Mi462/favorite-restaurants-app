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
} from "@chakra-ui/react";
import Header from "../components/header/header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faHeart,
  faLocationDot,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import Sidebar from "../components/sidebar/sidebar";
import { useCallback, useEffect, useState } from "react";
import {
  collection,
  collectionGroup,
  deleteDoc,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  runTransaction,
  setDoc,
} from "firebase/firestore";
import { db } from "@/lib/FirebaseConfig";
import { format } from "date-fns";
import { useRecoilState } from "recoil";
import { commentPost, loginUser } from "@/states/states";

export default function Top() {
  //画面遷移
  const router = useRouter();
  //Post
  const [posts, setPosts] = useState<any>([]);
  //上のプルダウンの状態
  const [selectCategory, setSelectCategory] = useState<string>("全て");
  // //ログインユーザーの情報
  const [user, setUser] = useRecoilState(loginUser);
  // console.log("top", user);
  //Postしたユーザーの情報
  const [postUsers, setPostUsers] = useState<any>([]);
  //Comment画面遷移時のPost作成者の情報
  const [commentPostUser, setCommentPostUser] = useRecoilState(commentPost);
  //いいねしたユーザーの情報
  const [likedUsers, setLikedUsers] = useState<any>([]);
  // 「いいね」の状態管理
  // const [isLiked, setIsLiked] = useState<boolean | null>(null);
  const [isLiked, setIsLiked] = useState<boolean[] | null>(null);
  // 「いいね」数の状態管理
  const [likeCounts, setLikeCounts] = useState<any>([]);

  useEffect(() => {
    postUsersDataFromFirebase();
  }, []);

  useEffect(() => {
    postsDataFromFirebase();
  }, [postUsers]);

  //1, ユーザーの情報が入った配列とPostの情報が入った配列を用意
  //ユーザーの情報が入った配列の取得
  const postUsersDataFromFirebase = async () => {
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
    //Postの情報が入った配列の取得
    const queryPosts = query(
      collectionGroup(db, "posts"),
      //updatedAtを基準に降順で取得
      orderBy("updatedAt", "desc")
    );
    await getDocs(queryPosts).then((snapShot) => {
      const getPostsData: any = snapShot.docs.map((doc) => {
        const { id, text, category, createdAt, updatedAt, picture, authorUid } =
          doc.data() || {};
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
  };
  console.log(posts);

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

  const linkToMap = () => {
    router.push("/map");
  };

  const linkToCreate = () => {
    router.push("/create");
  };

  //上のcategoryの内容を変更できる
  const onChangePostCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectCategory(e.target.value);
  };

  return (
    <div className="screen">
      <Header />

      {/* SidebarとPosts */}
      <Flex>
        {/* Sidebar */}
        <Box width="20%" height="100%" ml="10%" mt="5">
          <Sidebar />
        </Box>
        {/* Sidebar */}

        {/* Posts */}
        <Box width="60%" height="100%" mb="16">
          <Flex direction="column">
            <Flex justifyContent="space-between">
              <Box mt="3" width="30%" display="flex">
                {/* 上のプルダウンリスト */}
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
                {/* 上のプルダウンリスト */}
              </Box>
              <Box mt="3" display="flex">
                {/* 投稿ボタン */}
                <Button onClick={linkToCreate} borderRadius="50">
                  <Flex>
                    <FontAwesomeIcon icon={faPlus} size="lg" color="#fe9611" />
                    <Text ml="5">投稿</Text>
                  </Flex>
                </Button>
                {/* 投稿ボタン */}
              </Box>
            </Flex>

            {posts.map((post: any) => {
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
                            m="3"
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
                              <Text fontSize="lg" ml="3">
                                {post.userName}
                              </Text>
                            </Flex>

                            {/* <Text>{post.updatedAt}</Text> */}
                          </Flex>
                          {/* アカウント */}

                          {/* コメント */}
                          <Box height="155">
                            <Text mb="3">カテゴリ：{post.category}</Text>
                            {/* <Box width="100%" height="55%" overflowY="scroll"> */}
                            <Text>{post.text}</Text>
                          </Box>
                          <Flex justifyContent="flex-end">
                            <Text>{post.updatedAt}</Text>
                          </Flex>

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
            })}
          </Flex>
        </Box>
        {/* Posts */}
      </Flex>
      {/* SidebarとPosts */}
    </div>
  );
}
