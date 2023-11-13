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
import { useEffect, useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { auth, db } from "@/lib/FirebaseConfig";
import { Timestamp, doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuth } from "@/useAuth/useAuth";
import { updateProfile } from "firebase/auth";
import { loginUserType } from "../type/type";

export default function Top() {
  const router = useRouter();
  const [userImage, setUserImage] = useState<Blob | MediaSource | string>();
  const [editUserPictureURL, setEditUserPictureURL] = useState<string>();
  //ローディング
  const [loading, setLoading] = useState<boolean>(true);
  //ログインユーザーの情報
  const loginUserData = useAuth();
  // console.log(loginUserData);
  //編集後のログインユーザーの情報
  const [editUser, setEditUser] = useState<loginUserType>({
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
  // console.log(loading);

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
  const userPictureUploadToFirebase = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
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
    }
  };

  const linkToLogin = () => {
    router.push("/");
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
              ml="3"
              mr="3"
              fontSize={{
                base: "md",
                md: "2xl",
              }}
              // bg={{ base: "red.200", md: "green.200" }}
            >
              {loginUserData.userName}
            </Text>
          </Box>
          {/* ユーザー情報 */}

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
                  height={{ base: "140", md: "190" }}
                  borderRadius="20"
                  border="2px"
                  borderColor="orange.500"
                  mt="5"
                >
                  <Flex>
                    {/* アカウント画像の編集 */}
                    <Box width="25%" height={{ base: "130", md: "180" }} m="1">
                      <Wrap display="flex" justifyContent="center">
                        <WrapItem>
                          {userImage === undefined ? (
                            <label
                              htmlFor="form-image"
                              style={{ cursor: "pointer" }}
                            >
                              <Avatar
                                name="t"
                                size={{ base: "lg", md: "2xl" }}
                                m="3"
                                src={editUser.userPicture}
                              ></Avatar>
                            </label>
                          ) : (
                            <Avatar
                              name="s"
                              size={{ base: "lg", md: "2xl" }}
                              m="3"
                              src={editUserPictureURL}
                            ></Avatar>
                          )}
                        </WrapItem>
                      </Wrap>
                      <Text
                        display="flex"
                        justifyContent="center"
                        fontSize={{ base: "10", md: "md" }}
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
                    <Box
                      mt="1"
                      mr="3"
                      width="85%"
                      height={{ base: "130", md: "180" }}
                    >
                      {/* ユーザー名編集 */}
                      <Text
                        mt={{ base: "1", md: "3" }}
                        fontSize={{ base: "10", md: "md" }}
                      >
                        ユーザー名
                      </Text>
                      <Input
                        value={editUser.userName}
                        fontSize={{ base: "10", md: "md" }}
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
                      <Text fontSize={{ base: "10", md: "md" }}>メール</Text>
                      <Text fontSize={{ base: "10", md: "md" }}>
                        {editUser.email}
                      </Text>
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
                            <Text ml="1" fontSize={{ base: "10", md: "md" }}>
                              更新
                            </Text>
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
      </Container>
    </div>
  );
}
