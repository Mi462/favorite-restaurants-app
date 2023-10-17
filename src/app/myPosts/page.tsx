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
  faPenToSquare,
  faPlus,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import Sidebar from "../components/sidebar/sidebar";
import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "@/lib/FirebaseConfig";
import { format } from "date-fns";
import { useRecoilState } from "recoil";
import { loginUser } from "@/states/loginUser";

export default function myPosts() {
  //画面遷移
  const router = useRouter();
  //状態
  const [posts, setPosts] = useState([]);
  //上のプルダウンの状態
  const [selectCategory, setSelectCategory] = useState("全て");
  //ログインユーザーの情報
  const [user, setUser] = useRecoilState(loginUser);
  //Postしたユーザーの情報
  const [postUsers, setPostUsers] = useState<any>([]);

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
  console.log("外2", postUsers);

  //Postの内容を取得する関数
  const postsDataFromFirebase = async () => {
    const postsData = collection(db, "users", user.userUid, "posts");
    //Updateを基準に降順で取得
    const q = query(postsData, orderBy("updatedAt", "desc"));
    await getDocs(q).then((snapShot) => {
      const getPostsData: any = snapShot.docs.map((doc) => {
        const { id, text, category, createdAt, updatedAt, picture, authorUid } =
          doc.data();
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
  console.log("ラスト2", posts);

  const linkToComment = (id: string) => {
    console.log("linkToComment", id);
    router.push(`/comment/${id}`);
  };

  const linkToEdit = (id: string) => {
    router.push(`/edit/${id}`);
  };

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

  const clickDelete = async (id: string) => {
    //firebaseの中のデータを削除する（バック側）
    await deleteDoc(doc(db, "users", user.userUid, "posts", id));
    //表示するための処理（フロント側）
    const deletePost = posts.filter((post: any) => post.id !== id);
    setPosts(deletePost);
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

            {posts?.map((post: any) => {
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
                  //   background="orange.100"
                  border="2px"
                  borderColor="orange.500"
                  mt="5"
                  key={post.id}
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
                            <Text>{post.updatedAt}</Text>
                          </Flex>
                          {/* アカウント */}

                          {/* コメント */}
                          <Text mb="3">カテゴリ：{post.category}</Text>
                          {/* <Box width="100%" height="55%" overflowY="scroll"> */}
                          <Text>{post.text}</Text>
                          {/* </Box> */}
                          {/* コメント */}
                        </Box>
                        {/* 写真横のアカウント・コメント */}

                        {/* ボタン */}
                        <Box
                          height="6"
                          display="flex"
                          alignItems="center"
                          justifyContent="space-between"
                          ml="1"
                          mr="1"
                          mt="1"
                        >
                          {/* コメントボタン */}
                          <FontAwesomeIcon
                            icon={faComment}
                            size="lg"
                            color="#4299E1"
                            onClick={() => {
                              linkToComment(post.id);
                            }}
                            cursor="pointer"
                          />
                          {/* コメントボタン */}

                          {/* いいねボタン */}
                          <FontAwesomeIcon
                            icon={faHeart}
                            size="lg"
                            color="#D53F8C"
                          />
                          {/* いいねボタン */}

                          {/* マップボタン */}
                          <FontAwesomeIcon
                            icon={faLocationDot}
                            size="lg"
                            color="#4299E1"
                            onClick={linkToMap}
                          />
                          {/* マップボタン */}

                          {/* Editボタン */}
                          <FontAwesomeIcon
                            icon={faPenToSquare}
                            size="lg"
                            color="#4299E1"
                            onClick={() => {
                              linkToEdit(post.id);
                            }}
                            cursor="pointer"
                          />
                          {/* Editボタン */}

                          {/* 削除ボタン */}
                          <FontAwesomeIcon
                            icon={faTrashCan}
                            size="lg"
                            color="#4299E1"
                            onClick={() => {
                              clickDelete(post.id);
                            }}
                            cursor="pointer"
                          />
                          {/* 削除ボタン */}
                        </Box>
                        {/* ボタン */}
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
