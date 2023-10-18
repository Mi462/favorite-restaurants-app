"use client";

import {
  Avatar,
  Box,
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
import { useRecoilState } from "recoil";
import { loginUser } from "@/states/states";
import { useEffect, useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { auth, db } from "@/lib/FirebaseConfig";
import { Timestamp, doc, getDoc, updateDoc } from "firebase/firestore";

export default function Top() {
  const router = useRouter();
  const [userImage, setUserImage] = useState();
  const [editUserPictureURL, setEditUserPictureURL] = useState<string>();
  //ログインユーザーの情報
  const [loginUserData, setLoginUserData] = useRecoilState(loginUser);
  //編集後のログインユーザーの情報
  const [editUser, setEditUser] = useState({
    userName: "",
    userPicture: "",
    email: "",
    userUid: "",
    password: "",
  });

  useEffect(() => {
    loginUserDataFromFirebase();
  }, []);

  //ログインユーザーの情報を取得
  const loginUserDataFromFirebase = async () => {
    const currentUser: any = auth.currentUser;
    // console.log(currentUser);
    const docSnap = await getDoc(doc(db, "users", currentUser.uid));
    const { userName, userPicture, email, password, userUid } =
      docSnap.data() || {};
    setEditUser({
      userName,
      userPicture,
      email,
      password,
      userUid,
    });
  };

  //ログインユーザーの編集
  const editLoginUser = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    //名前に何も記入されていない場合は反映されない
    if (editUser.userName === "") {
      alert("ユーザー名が入力されていません。");
      return;
    }
    //画像がセットされていない場合は反映されない
    if (userImage === undefined) {
      alert("ユーザー画像が新たに選択されていません。");
      return;
    }
    //Firebaseでデータを更新する
    await updateDoc(doc(db, "users", editUser.userUid), {
      userName: editUser.userName,
      userPicture: editUserPictureURL,
      updatedAt: Timestamp.now(),
    });
    //Recoilで設定したログインユーザーも更新させる
    setLoginUserData({
      ...loginUserData,
      userName: editUser.userName,
      userPicture: editUserPictureURL,
    });
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

        <Box width="60%" height="100%" mb="5">
          {/* 囲いの中 */}
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
                      <Avatar
                        name="t"
                        size="2xl"
                        m="3"
                        src={editUser.userPicture}
                      ></Avatar>
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
                <label htmlFor="form-image" style={{ cursor: "pointer" }}>
                  <Text
                    display="flex"
                    justifyContent="center"
                    fontSize="md"
                    mb="3"
                  >
                    画像の選択
                  </Text>
                </label>
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
              <Box mr="3" width="85%" height="180">
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
                <Text>メール</Text>
                <Text>{loginUserData.email}</Text>

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

                {/* 投稿ボタン */}
              </Box>
            </Flex>
          </Box>
          {/* 囲いの中 */}
        </Box>
      </Flex>
      {/* SidebarとPosts */}
    </div>
  );
}
