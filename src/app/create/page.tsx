"use client";

import {
  Avatar,
  Box,
  Container,
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
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Timestamp, doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/FirebaseConfig";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useAuth } from "@/useAuth/useAuth";
import { CreatePostType } from "../type/type";

export default function Create() {
  //画面遷移用
  const router = useRouter();
  //画像のURL管理
  const [createObjectURL, setCreateObjectURL] = useState<string>();
  //fileのオブジェクト管理
  const [image, setImage] = useState<Blob | MediaSource | string>();
  //categoryの状態
  const [selectCategory, setSelectCategory] = useState<string>("日本料理");
  //ログインユーザー
  const loginUserData = useAuth();
  //投稿内容
  const postData = {
    id: uuidv4(),
    text: "",
    category: "日本料理",
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
    picture: "",
    authorUid: "",
    userName: "",
    userPicture: "",
  };
  const [post, setPost] = useState<CreatePostType>(postData);

  //投稿ボタン押下時にFirebaseにデータが登録され、Top画面に遷移する関数
  const createPost = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    //ユーザーデータのチェック
    if (!loginUserData.userUid) {
      alert(
        "ユーザーのデータがありません。ログインページから入りなおしてください。"
      );
      return;
    }
    //textに何も記入されていない場合は反映されない
    if (post.text === "") {
      alert("テキストが入力されていません。");
      return;
    }
    //textに50文字以上入力されていないかチェック
    if (post.text.replace(/\n/g, "").length > 40) {
      alert("入力できる文字数は40までです。");
      return;
    }
    //画像がセットされていない場合は反映されない
    if (image === undefined) {
      alert("画像が選択されていません。");
      return;
    }
    //Firebaseにデータを登録する
    await setDoc(doc(db, "users", loginUserData.userUid, "posts", post.id), {
      id: post.id,
      text: post.text,
      category: selectCategory,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      picture: createObjectURL,
      authorUid: loginUserData.userUid,
    });
    //textの中身を空にする
    setPost(postData);
    //Top画面に遷移する
    router.push("/top");
  };

  //categoryの内容を変更できる関数
  const onChangePostCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectCategory(e.target.value);
  };

  //画像を選択してFirebaseにアップロードとダウンロード、さらに表示する関数
  const onFileUploadToFirebase = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setImage(file);

      //Storageに画像をアップロードする
      const storage = getStorage();
      const storageRef = ref(storage, "/image" + file.name);
      await uploadBytes(storageRef, file)
        .then((snapshot) => {
          console.log("Uploaded a blob or file!");
        })
        .catch((error) => {
          console.log(error);
        });

      //Storageから画像をダウンロードする
      await getDownloadURL(ref(storage, "/image" + file.name))
        .then((url) => {
          setCreateObjectURL(url);
        })
        .catch((error) => {
          console.log(error);
        });
    }
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
          {/* Create */}
          <Box
            width="100%"
            height={{ base: "200", md: "300" }}
            borderRadius="20"
            border="2px"
            borderColor="orange.500"
            mt="5"
          >
            <Flex>
              {/* 写真 */}
              <Box width="50%" height="250" mr={{ base: "5", md: "10" }}>
                {createObjectURL === undefined ? (
                  <label htmlFor="form-image" style={{ cursor: "pointer" }}>
                    <Box
                      width="100%"
                      height={{ base: "170", md: "250" }}
                      background="#FEFCBF"
                      ml={{ base: "3", md: "5" }}
                      mr={{ base: "3", md: "5" }}
                      mt={{ base: "3", md: "5" }}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <FontAwesomeIcon
                        icon={faImage}
                        size="lg"
                        color="#4299E1"
                      />
                      <Text fontSize={{ base: "10", md: "lg" }}>
                        画像を選択
                      </Text>
                    </Box>
                    <Input
                      display="none"
                      multiple
                      name="imageURL"
                      type="file"
                      id="form-image"
                      accept=".png, .jpeg, .jpg"
                      onChange={onFileUploadToFirebase}
                    />
                  </label>
                ) : (
                  <Image
                    src={createObjectURL}
                    alt="imageDataPost"
                    width="100%"
                    height={{ base: "170", md: "250" }}
                    ml={{ base: "3", md: "5" }}
                    mr={{ base: "3", md: "5" }}
                    mt={{ base: "3", md: "5" }}
                  />
                )}
              </Box>

              {/* 写真 */}

              {/* 写真横のアカウント・コメント・ボタンなど */}
              <Box
                width="50%"
                height="250"
                mr={{ base: "3", md: "5" }}
                mt={{ base: "3", md: "5" }}
              >
                <Flex direction="column">
                  {/* 写真横のアカウント・コメント */}
                  <Box height={{ base: "150", md: "210" }}>
                    {/* アカウント */}
                    <Flex alignItems="center" m={{ base: "1", md: "3" }}>
                      <Wrap>
                        <WrapItem>
                          <Avatar
                            name={loginUserData.userName!}
                            size={{ base: "sm", md: "md" }}
                            src={loginUserData.userPicture!}
                          ></Avatar>
                        </WrapItem>
                      </Wrap>
                      <Text
                        fontSize={{ base: "10", md: "lg" }}
                        ml={{ base: "1", md: "3" }}
                      >
                        {loginUserData.userName}
                      </Text>
                    </Flex>
                    {/* アカウント */}

                    {/* コメント */}
                    <Select
                      size="sm"
                      fontSize={{ base: "10", md: "md" }}
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
                      fontSize={{ base: "10", md: "md" }}
                      rows={4}
                      mt={1}
                      onChange={(e) =>
                        setPost({ ...post, text: e.target.value })
                      }
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
                      mt={{ base: "1", md: "3" }}
                    >
                      <FontAwesomeIcon
                        icon={faLocationDot}
                        size="lg"
                        color="#4299E1"
                      />
                      <Text ml="1" fontSize={{ base: "10", md: "lg" }}>
                        場所を挿入
                      </Text>
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
                        mt={{ base: "1", md: "3" }}
                      >
                        <FontAwesomeIcon
                          icon={faCirclePlus}
                          size="lg"
                          color="#fe9611"
                        />
                        <Text ml="1" fontSize={{ base: "10", md: "lg" }}>
                          投稿
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
          {/* Create */}
        </Flex>
      </Container>
    </div>
  );
}
