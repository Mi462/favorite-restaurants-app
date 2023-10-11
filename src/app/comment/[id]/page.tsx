"use client";

import {
  Avatar,
  Box,
  Flex,
  Text,
  Wrap,
  WrapItem,
  Button,
  Image,
} from "@chakra-ui/react";
import Header from "../../components/header/header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faLocationDot,
  faPenToSquare,
  faReply,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/sidebar";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/FirebaseConfig";
import { format } from "date-fns";
import { useRecoilState } from "recoil";
import { loginUser } from "@/states/loginUser";

export default function Comment({ params }: { params: { id: string } }) {
  const router = useRouter();
  //ログインユーザー
  const [user, setUser] = useRecoilState(loginUser);
  //状態
  const [subPost, setSubPost] = useState<any>({
    id: params.id,
    text: "",
    category: "日本料理",
    createdAt: "",
    updatedAt: "",
    picture: "",
  });

  const linkToMap = () => {
    router.push("/map");
  };

  const linkToEdit = (id: string) => {
    router.push(`/edit/${id}`);
  };

  const linkToCommentCreate = () => {
    router.push("/commentCreate");
  };

  //Firebaseからデータを取り出す
  const postDataFromFirebase = async () => {
    //渡ってきたidを元にデータベースからデータを取り出す
    const docSnap = await getDoc(
      doc(db, "users", user.userUid, "posts", params.id)
    );
    const { text, category, createdAt, updatedAt, picture } =
      docSnap.data() || {};
    //取り出したデータをsetEditTodoに設定する
    setSubPost({
      id: params.id,
      text,
      category,
      createdAt: format(createdAt.toDate(), "yyyy/MM/dd HH:mm"),
      updatedAt: format(updatedAt.toDate(), "yyyy/MM/dd HH:mm"),
      picture,
    });
  };
  console.log(subPost);

  useEffect(() => {
    postDataFromFirebase();
  }, []);

  return (
    <div>
      <Header />

      <Flex>
        {/* Sidebar */}
        <Box width="20%" height="100%" ml="10%" mt="5">
          <Sidebar />
        </Box>
        {/* Sidebar */}

        {/* Posts */}
        <Box width="60%" height="100%" mb="16">
          <Flex direction="column">
            <Box
              height="300"
              borderRadius="20"
              background="orange.200"
              border="2px"
              borderColor="orange.500"
              mt="5"
            >
              <Flex>
                {/* 写真 */}
                <Image
                  src={subPost.picture}
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
                          </Text>
                        </Box>
                        <Text>{subPost.updatedAt}</Text>
                      </Flex>
                      {/* アカウント */}

                      {/* コメント */}
                      <Text mb="3">ジャンル： {subPost.category}</Text>
                      <Text>{subPost.text}</Text>
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
                      {/* 返信ボタン */}
                      <FontAwesomeIcon
                        icon={faReply}
                        size="lg"
                        color="#4299E1"
                        onClick={linkToCommentCreate}
                        cursor="pointer"
                      />
                      {/* 返信ボタン */}

                      {/* いいねボタン */}
                      <FontAwesomeIcon
                        icon={faHeart}
                        size="lg"
                        color="#4299E1"
                      />
                      {/* いいねボタン */}

                      {/* マップボタン */}
                      <FontAwesomeIcon
                        icon={faLocationDot}
                        size="lg"
                        color="#4299E1"
                        onClick={linkToMap}
                        cursor="pointer"
                      />
                      {/* マップボタン */}

                      {/* 編集ボタン */}
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        size="lg"
                        color="#4299E1"
                        cursor="pointer"
                        onClick={() => {
                          linkToEdit(params.id);
                        }}
                      />
                      {/* 編集ボタン */}
                    </Box>
                    {/* ボタン */}
                  </Flex>
                </Box>
                {/* 写真横のアカウント・コメント・ボタンなど */}
              </Flex>
            </Box>
            {/* Posts */}

            {/* Comment1 */}
            <Box
              width="95%"
              height="200"
              borderRadius="20"
              background="orange.100"
              border="2px"
              borderColor="orange.500"
              mt="5"
              ml="5"
            >
              <Flex>
                {/* 写真横のアカウント・コメント・ボタンなど */}
                <Box height="190" mr="5" ml="5">
                  <Flex direction="column">
                    {/* 写真横のアカウント・コメント */}
                    <Box height="160">
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
                                name="Zirou"
                                size="sm"
                                src="https://bit.ly/kent-c-dodds"
                              ></Avatar>
                            </WrapItem>
                          </Wrap>
                          <Text fontSize="lg" ml="3">
                            アカウント名
                          </Text>
                        </Box>
                        <Text>2023/00/00 00:00:00</Text>
                      </Flex>
                      {/* アカウント */}

                      {/* コメント */}
                      <Text>
                        ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。
                        ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。スタバしか勝たん。
                      </Text>
                      {/* コメント */}
                    </Box>
                    {/* 写真横のアカウント・コメント */}
                  </Flex>
                </Box>
                {/* 写真横のアカウント・コメント・ボタンなど */}
              </Flex>
            </Box>
            {/* Comment1 */}
            {/* Comment2 */}
            <Box
              width="95%"
              height="200"
              borderRadius="20"
              background="orange.100"
              border="2px"
              borderColor="orange.500"
              mt="5"
              ml="5"
            >
              <Flex>
                {/* 写真横のアカウント・コメント・ボタンなど */}
                <Box height="190" mr="5" ml="5">
                  <Flex direction="column">
                    {/* 写真横のアカウント・コメント */}
                    <Box height="160">
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
                        <Text>2023/00/00 00:00:00</Text>
                      </Flex>
                      {/* アカウント */}

                      {/* コメント */}
                      <Text>
                        ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。
                        ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。よな。
                      </Text>
                      {/* コメント */}
                    </Box>
                    {/* 写真横のアカウント・コメント */}
                  </Flex>
                </Box>
                {/* 写真横のアカウント・コメント・ボタンなど */}
              </Flex>
            </Box>
            {/* Comment2 */}
          </Flex>
        </Box>
      </Flex>
    </div>
  );
}
