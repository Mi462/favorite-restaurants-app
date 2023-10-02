"use client";

import {
  Avatar,
  Box,
  Button,
  Flex,
  Input,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import Header from "../components/header/header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faComment,
  faEnvelope,
  faHeart,
  faHouse,
  faLocationDot,
  faPenToSquare,
  faPlus,
  faReply,
  faRetweet,
  faRotateRight,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import Sidebar from "../components/sidebar/sidebar";

export default function Top() {
  const router = useRouter();

  const linkToTop = () => {
    router.push("/top");
  };

  const linkToShow = () => {
    router.push("/show");
  };

  const linkToCreate = () => {
    router.push("/create");
  };

  const linkToEdit = () => {
    router.push("/edit");
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
              <Box ml="3" width="30%" height="180">
                <Wrap display="flex" justifyContent="center">
                  <WrapItem>
                    <Avatar
                      name="Tarou"
                      size="2xl"
                      m="3"
                      src="https://bit.ly/dan-abramov"
                    ></Avatar>
                  </WrapItem>
                </Wrap>
                <Text
                  display="flex"
                  justifyContent="center"
                  fontSize="md"
                  mb="3"
                >
                  アカウント画像の選択
                </Text>
              </Box>
              {/* アカウント画像の編集 */}
              <Box mr="3" ml="3" width="70%" height="180">
                <Text mt="5">ユーザー名</Text>
                <Input
                  placeholder="ユーザー名"
                  background="white"
                  mb="3"
                  type="userName"
                />
                <Text>メール</Text>
                <Text>email@co.jp</Text>

                {/* 更新ボタン */}
                <Flex justifyContent="end">
                  <Box height="6" display="flex" ml="1" mr="1" mt="1">
                    <FontAwesomeIcon
                      icon={faRotateRight}
                      size="lg"
                      color="#fe9611"
                    />
                    <Text ml="1">更新</Text>
                  </Box>
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
