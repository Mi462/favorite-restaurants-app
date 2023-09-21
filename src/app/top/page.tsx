"use client";

import { Avatar, Box, Flex, Text, Wrap, WrapItem } from "@chakra-ui/react";
import Header from "../components/header/header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faHeart,
  faLocationDot,
  faPenToSquare,
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

export default function Top() {
  //画面遷移
  const router = useRouter();
  //状態
  const [posts, setPosts] = useState([]);

  //Firebaseからデータを取り出す
  useEffect(() => {
    //データベースからデータを取得
    const postsData = collection(db, "posts");
    //Updateを基準に降順で取得
    const q = query(postsData, orderBy("updatedAt", "desc"));
    getDocs(q).then((snapShot) => {
      const getPostsData: any = snapShot.docs.map((doc) => {
        return {
          id: doc.data().id,
          text: doc.data().text,
          category: doc.data().category,
          createdAt: format(doc.data().createdAt.toDate(), "yyyy/MM/dd HH:mm"),
          updatedAt: format(doc.data().updatedAt.toDate(), "yyyy/MM/dd HH:mm"),
        };
      });
      setPosts(getPostsData);
      console.log(posts);
    });
  }, []);

  console.log(posts);

  const linkToComment = () => {
    router.push("/comment");
  };

  const linkToEdit = (id: string) => {
    router.push(`/edit/${id}`);
  };

  const linkToMap = () => {
    router.push("/map");
  };

  const clickDelete = (id: string) => {
    //firebaseの中のデータを削除する（バック側）
    deleteDoc(doc(db, "posts", id));
    //表示するための処理（フロント側）
    const deletePost = posts.filter((post: any) => post.id !== id);
    setPosts(deletePost);
  };

  return (
    <div>
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
            {posts?.map((post: any) => {
              return (
                <Box
                  height="300"
                  borderRadius="20"
                  background="orange.100"
                  border="2px"
                  borderColor="orange.500"
                  mt="5"
                  key={post.id}
                >
                  <Flex>
                    {/* 写真 */}
                    <Box
                      width="50%"
                      height="250"
                      background="#FEFCBF"
                      ml="5"
                      mr="5"
                      mt="5"
                    ></Box>
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
                            <Box display="flex">
                              <Wrap>
                                <WrapItem>
                                  <Avatar
                                    name="Tarou"
                                    size="sm"
                                    src="https://bit.ly/dan-abramov"
                                  ></Avatar>
                                </WrapItem>
                              </Wrap>
                              <Text fontSize="lg" ml="3">
                                アカウント名
                              </Text>
                            </Box>
                            <Text>{post.updatedAt}</Text>
                          </Flex>
                          {/* アカウント */}

                          {/* コメント */}
                          <Text mb="3">カテゴリ：{post.category}</Text>
                          <Text>{post.text}</Text>
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
                          <button onClick={linkToComment}>
                            <FontAwesomeIcon
                              icon={faComment}
                              size="lg"
                              color="#4299E1"
                            />
                          </button>
                          {/* コメントボタン */}

                          {/* いいねボタン */}
                          <FontAwesomeIcon
                            icon={faHeart}
                            size="lg"
                            color="#D53F8C"
                          />
                          {/* いいねボタン */}

                          {/* マップボタン */}
                          <button onClick={linkToMap}>
                            <FontAwesomeIcon
                              icon={faLocationDot}
                              size="lg"
                              color="#4299E1"
                            />
                          </button>
                          {/* マップボタン */}

                          {/* Editボタン */}
                          <button
                            onClick={() => {
                              linkToEdit(post.id);
                            }}
                          >
                            <FontAwesomeIcon
                              icon={faPenToSquare}
                              size="lg"
                              color="#4299E1"
                            />
                          </button>
                          {/* Editボタン */}

                          {/* 削除ボタン */}
                          <button
                            onClick={() => {
                              clickDelete(post.id);
                            }}
                          >
                            <FontAwesomeIcon
                              icon={faTrashCan}
                              size="lg"
                              color="#4299E1"
                            />
                          </button>
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
