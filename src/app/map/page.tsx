"use client";

import {
  Avatar,
  Box,
  Button,
  Flex,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import Header from "../components/header/header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faEnvelope,
  faHeart,
  faHouse,
  faLocationDot,
  faPenToSquare,
  faPlus,
  faReply,
  faRetweet,
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
            height="500"
            borderRadius="20"
            border="2px"
            borderColor="orange.500"
            mt="5"
          >
            <Flex direction="column">
              <Text fontSize="2xl" mt="5" ml="5">
                マップ
              </Text>
              {/* 写真 */}
              <Box height="420" background="#FEFCBF" ml="5" mr="5">
                Mapを取得して記録した位置情報を取り出して表示する
              </Box>
              {/* 写真 */}
            </Flex>
          </Box>
          {/* 囲いの中 */}
        </Box>
      </Flex>
      {/* SidebarとPosts */}
    </div>
  );
}
