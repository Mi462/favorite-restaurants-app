"use client";

import {
  Avatar,
  Box,
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
import Sidebar from "../../components/sidebar/sidebar";
import { useEffect, useState } from "react";
import { Timestamp, doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "@/lib/FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { format } from "date-fns";

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
  });
  //ログインユーザー
  const [userUid, setUserUid] = useState("");
  console.log(userUid);
  console.log(params.id);

  useEffect(() => {
    loginUserFromFirebase();
    postDataFromFirebase();
  }, []);

  //再投稿ボタン押下時にFirebaseにあるデータが更新され、Top画面に遷移する関数
  const onClickEditPost = async (
    id: string,
    e: React.MouseEvent<HTMLElement>
  ) => {
    e.preventDefault();
    //textに何も記入されていない場合は反映されない
    if (editPost.text === "") return;
    //Firebaseでデータを更新する
    await updateDoc(doc(db, "posts", id), {
      text: editPost.text,
      category: editPost.category,
      updatedAt: Timestamp.now(),
    });
    //Top画面に遷移する
    router.push("/top");
  };

  //ログインしているユーザーを取得する関数
  const loginUserFromFirebase = async () => {
    await onAuthStateChanged(auth, (user) => {
      if (user) {
        const currentUser = auth.currentUser;
        // console.log("top", currentUser);
        const uid = user.uid;
        setUserUid(uid);
        console.log(1);
        // console.log("top", uid);
        // setUser({
        //   userName: currentUser?.displayName,
        //   email: currentUser?.email,
        //   userPicture: currentUser?.photoURL,
        //   uid: currentUser?.uid,
        // });
      } else {
        console.log("else");
      }
    });
  };

  const postDataFromFirebase = async () => {
    //渡ってきたidを元にデータベースからデータを取り出してきた
    // const docRef = doc(db, "users", params.id);
    console.log(2);
    const docRef2 = doc(db, "users", userUid, "posts", params.id);
    console.log(3);

    const docSnap = await getDoc(docRef2);
    // const { text, category, createdAt, updatedAt, picture } =
    //   docSnap.data() || {};
    //取り出したデータをsetEditTodoに設定する
    setEditPost({
      id: params.id,
      text: docSnap.data()?.text,
      category: docSnap.data()?.category,
      createdAt: format(docSnap.data()?.createdAt.toDate(), "yyyy/MM/dd HH:mm"),
      updatedAt: format(docSnap.data()?.updatedAt.toDate(), "yyyy/MM/dd HH:mm"),
      picture: docSnap.data()?.picture,
    });
    // console.log(editPost);
    console.log(4);
  };
  console.log(editPost);

  return (
    <div>
      <Header />

      <Flex>
        {/* Sidebar */}
        <Box width="20%" height="100%" ml="10%" mt="5">
          <Sidebar />
        </Box>
        {/* Sidebar */}

        {/* Create */}
        <Box
          width="60%"
          height="300"
          borderRadius="20"
          border="2px"
          borderColor="orange.500"
          mr="10%"
          mt="5"
        >
          <Flex>
            {/* 写真 */}
            <Image
              src={editPost.picture}
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
                <Box height="210">
                  {/* アカウント */}
                  <Flex alignItems="center" m="1">
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
                  </Flex>
                  {/* アカウント */}

                  {/* コメント */}
                  <Select
                    size="sm"
                    borderRadius="5"
                    value={editPost.category}
                    onChange={(e) => {
                      setEditPost({ ...editPost, category: e.target.value });
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
                    rows={5}
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
                    mt="1"
                  >
                    <FontAwesomeIcon
                      icon={faLocationDot}
                      size="lg"
                      color="#4299E1"
                    />
                    <Text ml="1">ミスタードーナツ</Text>
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
                      mt="1"
                    >
                      <FontAwesomeIcon
                        icon={faRotateRight}
                        size="lg"
                        color="#fe9611"
                      />
                      <Text ml="1">再投稿</Text>
                    </Box>
                  </button>
                  {/* 投稿ボタン */}
                </Flex>
              </Flex>
            </Box>
            {/* 写真横のアカウント・コメント・ボタンなど */}
          </Flex>
        </Box>
        {/* Create */}
      </Flex>
    </div>
  );
}
