"use client";

import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  Image,
  Select,
  Text,
  Textarea,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import Header from "../../components/header/header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";
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
import { useRecoilValue } from "recoil";
import { loginUser } from "@/states/states";
import { useAuth } from "@/useAuth/useAuth";

export default function Edit({ params }: { params: { id: string } }) {
  //画面遷移用
  const router = useRouter();
  //状態
  const [editPost, setEditPost] = useState({
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
  // console.log(loginUserData);
  // const user = useRecoilValue(loginUser);
  // console.log("edit", user);
  // console.log(params.id);
  //Postしたユーザーの情報
  const [postUsers, setPostUsers] = useState<any>([]);

  //ローディング
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    postUsersDataFromFirebase();
  }, []);

  useEffect(() => {
    postDataFromFirebase();
  }, [postUsers]);

  useEffect(() => {
    console.log(postUsers);
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
  // console.log("外3", postUsers);

  const postDataFromFirebase = async () => {
    if (loginUserData.userUid) {
      //渡ってきたidを元にデータベースからデータを取り出してきた
      const docSnap = await getDoc(
        doc(db, "users", loginUserData.userUid, "posts", params.id)
      );
      const { text, category, createdAt, updatedAt, picture, authorUid } =
        docSnap.data() || {};
      const postUser = postUsers.find((p: any) => p.userUid === authorUid);
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
  // console.log("ラスト3", editPost);

  //再投稿ボタン押下時にFirebaseにあるデータが更新され、Top画面に遷移する関数
  const onClickEditPost = async (
    id: string,
    e: React.MouseEvent<HTMLElement>
  ) => {
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
  };

  return (
    <div>
      <Header />
      <Container maxW="1000">
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
                  // onClick={linkToCreate}
                  borderRadius="50"
                  pl="10"
                  pr="10"
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
              // height="300"
              height={{ base: "200", md: "300" }}
              borderRadius="20"
              border="2px"
              borderColor="orange.500"
              // mr="10%"
              mt="5"
            >
              <Flex>
                {/* 写真 */}
                <Image
                  src={editPost.picture}
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
                      // height="210"
                      height={{ base: "150", md: "210" }}
                    >
                      {/* アカウント */}
                      <Flex
                        alignItems="center"
                        // m="1"
                        m={{ base: "1", md: "3" }}
                      >
                        <Wrap>
                          <WrapItem>
                            <Avatar
                              name={editPost.userName}
                              // size="sm"
                              size={{ base: "sm", md: "md" }}
                              src={editPost.userPicture}
                            ></Avatar>
                          </WrapItem>
                        </Wrap>
                        <Text
                          // fontSize="lg"
                          // ml="3"
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

                    <Flex alignItems="center" justifyContent="space-between">
                      {/* マップボタン */}
                      <Box
                        height="6"
                        display="flex"
                        alignItems="center"
                        ml="1"
                        mr="1"
                        // mt="1"
                      >
                        <FontAwesomeIcon
                          icon={faLocationDot}
                          size="lg"
                          color="#4299E1"
                        />
                        <Text ml="1" fontSize={{ base: "10", md: "lg" }}>
                          ミスド
                        </Text>
                      </Box>
                      {/* マップボタン */}

                      {/* 投稿ボタン */}
                      <button onClick={(e) => onClickEditPost(params.id, e)}>
                        <Box
                          height="6"
                          display="flex"
                          alignItems="center"
                          ml="1"
                          mr="1"
                          // mt="1"
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
