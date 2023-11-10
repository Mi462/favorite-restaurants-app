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
import {
  faPenToSquare,
  faPlus,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  Query,
  collection,
  collectionGroup,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  runTransaction,
  where,
} from "firebase/firestore";
import { db } from "@/lib/FirebaseConfig";
import { format } from "date-fns";
import { useRecoilState, useRecoilValue } from "recoil";
import { loginUser } from "@/states/states";
import { useAuth } from "@/useAuth/useAuth";

export default function myPage() {
  //画面遷移
  const router = useRouter();
  //状態
  const [posts, setPosts] = useState([]);
  //上のプルダウンの状態
  const [selectCategory, setSelectCategory] = useState("全て");
  //ログインユーザーの情報
  const loginUserData = useAuth();
  // const [loginUserData, setLoginUserData] = useRecoilState(loginUser);
  // console.log(loginUserData.userUid);
  //Postしたユーザーの情報
  const [postUsers, setPostUsers] = useState<any>([]);
  //ローディング
  const [loading, setLoading] = useState<boolean>(true);

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
  // console.log("外2", postUsers);

  //Postの内容を取得する関数
  const postsDataFromFirebase = async () => {
    if (loginUserData.userUid) {
      const postsData = collection(db, "users", loginUserData.userUid, "posts");
      //Updateを基準に降順で取得
      const q = query(postsData, orderBy("updatedAt", "desc"));
      await getDocs(q).then((snapShot) => {
        const getPostsData: any = snapShot.docs.map((doc) => {
          const {
            id,
            text,
            category,
            createdAt,
            updatedAt,
            picture,
            authorUid,
          } = doc.data();
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
  // console.log("ラスト2", posts);
  // console.log("ラスト2 length", posts.length);
  // console.log(loading);

  const linkToEdit = (id: string) => {
    router.push(`/edit/${id}`);
  };

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

  const clickDelete = async (id: string) => {
    //firebaseの中のデータを削除する（バック側）
    if (confirm("Postを削除します。よろしいですか？")) {
      await runTransaction(db, async (transaction) => {
        //いいねが押されている場合、LikedUsersを削除する
        const likedUsersRef = collection(
          db,
          "users",
          loginUserData.userUid,
          "posts",
          id,
          "LikedUsers"
        );
        const likedUsersQuerySnapshot = await getDocs(likedUsersRef);
        // const likedUsersQuerySnapshot = await transaction.get(likedUsersRef);
        likedUsersQuerySnapshot.forEach((doc) => {
          deleteDoc(doc.ref);
        });
        //Commentがある場合、Commentを削除する
        const commentsRef = collection(
          db,
          "users",
          loginUserData.userUid,
          "posts",
          id,
          "comments"
        );
        const commentsQuerySnapshot = await getDocs(commentsRef);
        commentsQuerySnapshot.forEach((doc) => {
          deleteDoc(doc.ref);
        });
        //Postの削除
        await deleteDoc(doc(db, "users", loginUserData.userUid, "posts", id));
        // await transaction.delete(
        //   doc(db, "users", loginUserData.userUid, "posts", id)
        // );
        //表示するための処理（フロント側）
        const deletePost = posts.filter((post: any) => post.id !== id);
        setPosts(deletePost);
      });
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
                    name={loginUserData.userName}
                    size="md"
                    src={loginUserData.userPicture}
                  ></Avatar>
                </WrapItem>
              </Wrap>
              <Text
                // fontSize="2xl"
                fontSize={{
                  base: "md",
                  md: "2xl",
                }}
                bg={{ base: "red.200", md: "green.200" }}
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
                  // pr="10"
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
          {
            // loginUserData.userUid ? (
            loading ? (
              <Flex justifyContent="center" mt="100">
                <Flex direction="column" textAlign="center">
                  <Text fontSize="3xl">読み込み中…</Text>
                </Flex>
              </Flex>
            ) : posts.length > 0 ? (
              posts.map((post: any) => {
                if (
                  selectCategory === "日本料理" &&
                  post.category !== "日本料理"
                )
                  return;
                if (
                  selectCategory === "中国料理" &&
                  post.category !== "中国料理"
                )
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
                    // height="300"
                    height={{ base: "200", md: "300" }}
                    borderRadius="20"
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
                        // height="250"
                        height={{ base: "170", md: "250" }}
                        // ml="5"
                        ml={{ base: "3", md: "5" }}
                        // mr="5"
                        mr={{ base: "3", md: "5" }}
                        // mt="5"
                        mt={{ base: "3", md: "5" }}
                      />
                      {/* 写真 */}

                      {/* 写真横のアカウント・コメント・ボタンなど */}
                      <Box
                        width="50%"
                        height="250"
                        // mr="5"
                        mr={{ base: "3", md: "5" }}
                        // mt="5"
                        mt={{ base: "3", md: "5" }}
                      >
                        <Flex direction="column">
                          {/* 写真横のアカウント・コメント */}
                          <Box
                            // height="220"
                            height={{ base: "150", md: "220" }}
                          >
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
                                      // size="md"
                                      size={{ base: "sm", md: "md" }}
                                      src={post.userPicture}
                                    ></Avatar>
                                  </WrapItem>
                                </Wrap>
                                <Text
                                  // fontSize="lg"
                                  // ml="3"
                                  fontSize={{ base: "10", md: "lg" }}
                                  ml={{ base: "1", md: "3" }}
                                  mr={{ base: "1", md: "3" }}
                                >
                                  {post.userName}
                                </Text>
                              </Flex>
                              <Text fontSize={{ base: "10", md: "md" }}>
                                {post.updatedAt}
                              </Text>
                            </Flex>
                            {/* アカウント */}

                            {/* コメント */}
                            <Text
                              // mb="3"
                              mb={{ base: "1", md: "3" }}
                              fontSize={{ base: "10", md: "md" }}
                            >
                              カテゴリ：{post.category}
                            </Text>
                            {/* <Box width="100%" height="55%" overflowY="scroll"> */}
                            <Text fontSize={{ base: "10", md: "md" }}>
                              {post.text}
                            </Text>
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
                            {/* <FontAwesomeIcon
                              icon={faComment}
                              size="lg"
                              color="#4299E1"
                              onClick={() => {
                                linkToComment(post.id);
                              }}
                              cursor="pointer"
                            /> */}
                            {/* コメントボタン */}

                            {/* いいねボタン */}
                            {/* <FontAwesomeIcon
                              icon={faHeart}
                              size="lg"
                              color="#D53F8C"
                            /> */}
                            {/* いいねボタン */}

                            {/* マップボタン */}
                            {/* <FontAwesomeIcon
                              icon={faLocationDot}
                              size="lg"
                              color="#4299E1"
                              onClick={linkToMap}
                            /> */}
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
              })
            ) : (
              <Flex justifyContent="center" mt="100">
                <Flex direction="column" textAlign="center">
                  <Text fontSize="3xl">投稿は0件です</Text>
                </Flex>
              </Flex>
            )
            // ) : (
            //   <div>
            //     <Flex justifyContent="center" mt="100">
            //       <Flex direction="column" textAlign="center">
            //         <Text fontSize="3xl">ユーザーの情報がありません</Text>
            //         <Text fontSize="3xl">ログインしなおしてください</Text>
            //         <br />
            //       </Flex>
            //     </Flex>
            //     <Flex justifyContent="center">
            //       <Button width="30" colorScheme="orange" onClick={linkToLogin}>
            //         login
            //       </Button>
            //     </Flex>
            //   </div>
            // )
          }
          {/* Postsが出るところ */}
        </Flex>
      </Container>
    </div>
  );
}
