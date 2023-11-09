"use client";

import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  Input,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import Header from "../components/header/header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import Sidebar from "../components/sidebar/sidebar";
import { useEffect, useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { auth, db } from "@/lib/FirebaseConfig";
import { Timestamp, doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuth } from "@/useAuth/useAuth";
import { updateProfile } from "firebase/auth";

export default function Top() {
  const router = useRouter();
  const [userImage, setUserImage] = useState();
  const [editUserPictureURL, setEditUserPictureURL] = useState<string>();
  //ローディング
  const [loading, setLoading] = useState<boolean>(true);
  //ログインユーザーの情報
  const loginUserData = useAuth();
  // console.log(loginUserData);
  //編集後のログインユーザーの情報
  const [editUser, setEditUser] = useState({
    userName: "",
    userPicture: "",
    email: "",
    userUid: "",
  });

  useEffect(() => {
    loginUserDataFromFirebase();
  }, [loginUserData]);

  //ログインユーザーの情報を取得
  const loginUserDataFromFirebase = async () => {
    if (loginUserData.userUid) {
      const docSnap = await getDoc(doc(db, "users", loginUserData.userUid));
      const { userName, userPicture, email, userUid } = docSnap.data() || {};
      setEditUser({
        userName,
        userPicture,
        email,
        userUid,
      });
      setLoading(false);
    }
  };
  console.log(loading);

  //「更新」ボタン押下時に動く関数
  const editLoginUser = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    //名前に何も記入されていない場合は反映されない
    if (editUser.userName === "") {
      alert("ユーザー名が入力されていません。");
      return;
    }
    if (editUser.userName.replace(/\n/g, "").length > 7) {
      alert("入力できる文字数は7までです。");
      return;
    }
    //Database
    if (userImage === undefined) {
      //画像が新たに登録されていない場合
      //AuthenticationとDatabaseでデータを更新する
      //Authentication
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: editUser.userName,
        })
          .then(() => {
            // Profile updated!
            console.log("Profile updated!1 (user Page)");
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        console.log("error 1");
      }

      //Database
      await updateDoc(doc(db, "users", editUser.userUid), {
        userName: editUser.userName,
        updatedAt: Timestamp.now(),
      });
    } else {
      //画像が新たに登録された場合
      //AuthenticationとDatabaseでデータを更新する
      //Authentication
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: editUser.userName,
          photoURL: editUserPictureURL,
        })
          .then(() => {
            // Profile updated!
            console.log("Profile updated!2 (user Page)");
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        console.log("error 2");
      }
      //Database
      await updateDoc(doc(db, "users", editUser.userUid), {
        userName: editUser.userName,
        userPicture: editUserPictureURL,
        updatedAt: Timestamp.now(),
      });
    }
    //Top画面に遷移する
    router.push("/top");
  };

  //アカウント画像登録
  const userPictureUploadToFirebase = async (e: any) => {
    const file = e.target.files[0];
    setUserImage(file);

    //Storageにユーザー画像をアップロードする
    const storage = getStorage();
    const storageRef = ref(storage, "/image" + file.name);
    await uploadBytes(storageRef, file);

    //Storageからユーザー画像をダウンロードする
    await getDownloadURL(ref(storage, "/image" + file.name))
      .then((url) => {
        // console.log(url);
        setEditUserPictureURL(url);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const linkToLogin = () => {
    router.push("/");
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
              <Text fontSize="2xl" ml="3" mr="3">
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
          <Box width="100%" height="100%" mb="5">
            {loginUserData.userUid ? (
              loading ? (
                <Flex justifyContent="center" mt="100">
                  <Flex direction="column" textAlign="center">
                    <Text fontSize="3xl">読み込み中…</Text>
                  </Flex>
                </Flex>
              ) : (
                <Box
                  height="190"
                  borderRadius="20"
                  border="2px"
                  borderColor="orange.500"
                  mt="5"
                >
                  <Flex>
                    {/* アカウント画像の編集 */}
                    <Box width="25%" height="180">
                      <Wrap display="flex" justifyContent="center">
                        <WrapItem>
                          {userImage === undefined ? (
                            <label
                              htmlFor="form-image"
                              style={{ cursor: "pointer" }}
                            >
                              <Avatar
                                name="t"
                                size="2xl"
                                m="3"
                                src={editUser.userPicture}
                              ></Avatar>
                            </label>
                          ) : (
                            <Avatar
                              name="s"
                              size="2xl"
                              m="3"
                              src={editUserPictureURL}
                            ></Avatar>
                          )}
                        </WrapItem>
                      </Wrap>
                      <Text
                        display="flex"
                        justifyContent="center"
                        fontSize="md"
                        mb="3"
                      >
                        画像の選択
                      </Text>
                      <Input
                        display="none"
                        multiple
                        name="userImageURL"
                        type="file"
                        id="form-image"
                        accept=".png, .jpeg, .jpg"
                        onChange={userPictureUploadToFirebase}
                      />
                    </Box>
                    {/* アカウント画像の編集 */}

                    {/* アカウント画像の右横 */}
                    <Box mr="3" width="85%" height="180">
                      {/* ユーザー名編集 */}
                      <Text mt="5">ユーザー名</Text>
                      <Input
                        value={editUser.userName}
                        background="white"
                        mb="3"
                        type="userName"
                        onChange={(e) =>
                          setEditUser({
                            ...editUser,
                            userName: e.target.value,
                          })
                        }
                      />
                      {/* ユーザー名編集 */}

                      {/* ユーザーのメール */}
                      <Text>メール</Text>
                      {/* <Text>{loginUserData.email}</Text> */}
                      <Text>{editUser.email}</Text>
                      {/* ユーザーのメール */}

                      {/* 更新ボタン */}
                      <Flex justifyContent="end">
                        <button onClick={editLoginUser}>
                          <Box height="6" display="flex" ml="1" mr="1" mt="1">
                            <FontAwesomeIcon
                              icon={faRotateRight}
                              size="lg"
                              color="#fe9611"
                            />
                            <Text ml="1">更新</Text>
                          </Box>
                        </button>
                      </Flex>
                      {/* 更新ボタン */}
                    </Box>
                    {/* アカウント画像の右横 */}
                  </Flex>
                </Box>
              )
            ) : (
              <div>
                <Flex justifyContent="center" mt="100">
                  <Flex direction="column" textAlign="center">
                    <Text fontSize="3xl">ユーザーの情報がありません</Text>
                    <Text fontSize="3xl">ログインしなおしてください</Text>
                    <br />
                  </Flex>
                </Flex>
                <Flex justifyContent="center">
                  <Button width="30" colorScheme="orange" onClick={linkToLogin}>
                    login
                  </Button>
                </Flex>
              </div>
            )}
            {/* 囲いの中 */}
          </Box>
        </Flex>
        {/* SidebarとPosts */}
      </Container>
    </div>
  );
}
