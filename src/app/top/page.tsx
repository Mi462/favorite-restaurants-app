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
import { useEffect, useState } from "react";
import {
  collection,
  collectionGroup,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/lib/FirebaseConfig";
import { format } from "date-fns";
import { useRecoilState } from "recoil";
import { loginUser } from "@/states/loginUser";
import { v4 as uuidv4 } from "uuid";

export default function Top() {
  //画面遷移
  const router = useRouter();
  //Post
  const [posts, setPosts] = useState<any>([]);
  //上のプルダウンの状態
  const [selectCategory, setSelectCategory] = useState("全て");
  //ログインユーザーの情報
  const [user, setUser] = useRecoilState(loginUser);
  // console.log("top", user);
  //Postしたユーザーの情報
  const [postUsers, setPostUsers] = useState({
    userPicture: "",
    userName: "",
    userUid: "",
  });
  // const [combinededPosts, setCombinededPosts] = useState<any>([]);

  //Postの内容を取得する関数
  const postDataFromFirebase = async () => {
    //ユーザーデータを取得
    const queryUser = query(collection(db, "users"));
    await getDocs(queryUser).then((snapShot) => {
      const getUsersData: any = snapShot.docs.map((doc) => {
        const { userPicture, userName, userUid } = doc.data();
        return { userPicture, userName, userUid };
      });
      setPostUsers(getUsersData);
    });
    //Postを取得
    const queryPosts = query(
      collectionGroup(db, "posts"),
      //Updateを基準に降順で取得
      orderBy("updatedAt", "desc")
    );
    await getDocs(queryPosts).then((snapShot) => {
      const getPostsData: any = snapShot.docs.map((doc) => {
        const { id, text, category, createdAt, updatedAt, picture, autherUid } =
          doc.data() || {};
        return {
          id,
          text,
          category,
          createdAt: format(createdAt.toDate(), "yyyy/MM/dd HH:mm"),
          updatedAt: format(updatedAt.toDate(), "yyyy/MM/dd HH:mm"),
          picture,
          autherUid,
        };
      });
      setPosts(getPostsData);
    });

    // const combinedPosts = posts.map((post: any) => {
    //   const postUser = postUsers.find(
    //     (post: any) => post.autherUid === post.userUid
    //   );
    //   if (postUser) {
    //     delete postUser.autherUid;
    //     posts.userData = postUser;
    //   }
    //   return posts;
    // });

    const combinedPosts = posts.flatMap((post: any) =>
      post.autherUid === postUsers.userUid ? [...post, postUsers] : post
    );
    setPosts(combinedPosts);
    // posts.filter((post: any) => post.id !== id);
    // const postsData = collection(db, "users");
    // const queryUser = query(
    //   collectionGroup(db, "users"),
    //   where("userUid", "==", "autherUid"),
    //   where("updatedAt", "!=", ""),
    //   orderBy("updatedAt", "desc")
    // );
  };
  console.log(posts);
  console.log(postUsers);

  useEffect(() => {
    postDataFromFirebase();
  }, []);

  const linkToComment = (id: string) => {
    router.push(`/comment/${id}`);
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
                                {/* {post.userName} */}
                              </Text>
                            </Box>
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
