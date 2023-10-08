"use client";

import {
  Avatar,
  Box,
  Flex,
  Image,
  Input,
  Select,
  Text,
  Textarea,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import Header from "../components/header/header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faImage,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import Sidebar from "../components/sidebar/sidebar";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Timestamp, doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/FirebaseConfig";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { onAuthStateChanged } from "firebase/auth";

export default function Create() {
  //画面遷移用
  const router = useRouter();
  //画像のURL管理
  const [createObjectURL, setCreateObjectURL] = useState<string>();
  //fileのオブジェクト管理
  const [image, setImage] = useState<any>();
  //categoryの状態
  const [selectCategory, setSelectCategory] = useState("日本料理");

  const [user, setUser] = useState<any>({
    userName: "",
    email: "",
    userPicture: "",
    uid: "",
  });

  const postData = {
    id: uuidv4(),
    text: "",
    category: "日本料理",
    createdAt: "",
    updatedAt: "",
    picture: "",
  };

  //状態
  const [post, setPost] = useState(postData);

  //ログインしているユーザーを取得する関数
  const loginUserFromFirebase = async () => {
    await onAuthStateChanged(auth, (user) => {
      if (user) {
        const currentUser = auth.currentUser;
        // console.log("create", currentUser);
        const uid = user.uid;
        // console.log("create", uid);
        setUser({
          userName: currentUser?.displayName,
          email: currentUser?.email,
          userPicture: currentUser?.photoURL,
          uid: uid,
        });
      } else {
        console.log("else");
      }
    });
  };
  // console.log("create", user);

  useEffect(() => {
    loginUserFromFirebase();
  }, []);

  //投稿ボタン押下時にFirebaseにデータが登録され、Top画面に遷移する関数
  const createPost = async (e: any) => {
    e.preventDefault();
    //textに何も記入されていない場合は反映されない
    if (post.text === "") {
      alert("テキストが入力されていません。");
      return;
    }
    // console.log(post.text);
    //画像がセットされていない場合は反映されない
    if (image === undefined) {
      alert("画像が選択されていません。");
      return;
    }
    //Firebaseにデータを登録する
    await setDoc(doc(db, "users", user.uid, "posts", post.id), {
      id: post.id,
      text: post.text,
      category: selectCategory,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      picture: createObjectURL,
    });
    //textの中身を空にする
    setPost(postData);
    // console.log(post);

    //Top画面に遷移する
    router.push("/top");
  };

  //categoryの内容を変更できる関数
  const onChangePostCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectCategory(e.target.value);
  };

  //画像を選択してFirebaseにアップロードとダウンロード、さらに表示する関数
  const onFileUploadToFirebase = async (e: any) => {
    const file = e.target.files[0];
    // console.log(file);
    setImage(file);

    //Storageに画像をアップロードする
    const storage = getStorage();
    const storageRef = ref(storage, "/image" + file.name);
    await uploadBytes(storageRef, file)
      .then((snapshot) => {
        // console.log("Uploaded a blob or file!");
      })
      .catch((error) => {
        console.log(error);
      });

    //Storageから画像をダウンロードする
    await getDownloadURL(ref(storage, "/image" + file.name))
      .then((url) => {
        // console.log(url);
        setCreateObjectURL(url);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // console.log(image);

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
            {createObjectURL === undefined ? (
              <Box
                width="50%"
                height="250"
                background="#FEFCBF"
                ml="5"
                mr="5"
                mt="5"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <label htmlFor="form-image" style={{ cursor: "pointer" }}>
                  <FontAwesomeIcon icon={faImage} size="lg" color="#4299E1" />
                  画像を選択
                </label>
                <Input
                  display="none"
                  multiple
                  name="imageURL"
                  type="file"
                  id="form-image"
                  accept=".png, .jpeg, .jpg"
                  onChange={onFileUploadToFirebase}
                />
              </Box>
            ) : (
              <Image
                src={createObjectURL}
                alt="imageDataPost"
                width="50%"
                height="250"
                ml="5"
                mr="5"
                mt="5"
              />
            )}
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
                          name={user.userName}
                          size="sm"
                          src={user.userPicture}
                        ></Avatar>
                      </WrapItem>
                    </Wrap>
                    <Text fontSize="lg" ml="3">
                      {user.userName}
                    </Text>
                  </Flex>
                  {/* アカウント */}

                  {/* コメント */}
                  <Select
                    size="sm"
                    borderRadius="5"
                    onChange={(e) => {
                      onChangePostCategory(e);
                    }}
                  >
                    <option value="日本料理">日本料理</option>
                    <option value="中国料理">中国料理</option>
                    <option value="フランス料理">フランス料理</option>
                    <option value="イタリア料理">イタリア料理</option>
                    <option value="エスニック料理">エスニック料理</option>
                  </Select>
                  <Textarea
                    placeholder="おすすめのお店・料理は？"
                    value={post.text}
                    resize="none"
                    borderRadius={5}
                    size="md"
                    rows={5}
                    mt={1}
                    onChange={(e) => setPost({ ...post, text: e.target.value })}
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
                    <Text ml="1">場所を挿入</Text>
                  </Box>
                  {/* マップボタン */}

                  {/* 投稿ボタン */}
                  <button onClick={createPost}>
                    <Box
                      height="6"
                      display="flex"
                      alignItems="center"
                      ml="1"
                      mr="1"
                      mt="1"
                    >
                      <FontAwesomeIcon
                        icon={faCirclePlus}
                        size="lg"
                        color="#fe9611"
                      />
                      <Text ml="1">投稿</Text>
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
