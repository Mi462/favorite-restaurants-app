"use client";

import { loginUser } from "@/states/states";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import {
  faFolder,
  faHouse,
  faLocationDot,
  faPlus,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";

export default function Sidebar() {
  const router = useRouter();
  //ログインユーザー
  const loginUserData = useRecoilValue(loginUser);
  // console.log("sidebar", loginUserData);

  const linkToUser = () => {
    router.push("/user");
  };

  const linkToMyPage = () => {
    router.push("/myPage");
  };

  const linkToTop = () => {
    router.push("/top");
  };

  const linkToCreate = () => {
    router.push("/create");
  };

  const linkToMap = () => {
    router.push("/map");
  };

  return (
    <div>
      <Flex>
        {/* Sidebar */}

        <Flex direction="column" width="full">
          {/* アカウント表示 */}
          <Box
            display="flex"
            alignItems="center"
            m="3"
            // w={["150px", "300px", "500px", "700px", "1000px"]}
          >
            <Wrap>
              <WrapItem>
                <Avatar
                  name={loginUserData.userName}
                  size="md"
                  src={loginUserData.userPicture}
                ></Avatar>
              </WrapItem>
            </Wrap>
            <Text fontSize="2xl" ml="3">
              {loginUserData.userName}
            </Text>
          </Box>
          {/* アカウント表示 */}

          {/* ユーザーボタン */}
          <Button ml="1" mr="3" mb="1" onClick={linkToUser}>
            <FontAwesomeIcon icon={faUser} size="lg" color="#fe9611" />
            <Text ml="5">ユーザー</Text>
          </Button>
          {/* ユーザーボタン */}

          {/* My Pageボタン */}
          <Button ml="1" mr="3" mb="1" onClick={linkToMyPage}>
            <FontAwesomeIcon icon={faFolder} size="lg" color="#fe9611" />
            <Text ml="5">マイページ</Text>
          </Button>
          {/* My Pageボタン */}

          {/* ホームボタン */}
          <Button ml="1" mr="3" mb="1" onClick={linkToTop}>
            <FontAwesomeIcon icon={faHouse} size="lg" color="#fe9611" />
            <Text ml="5">ホーム</Text>
          </Button>
          {/* ホームボタン */}

          {/* マップボタン */}
          <Button ml="1" mr="3" mb="3" onClick={linkToMap}>
            <FontAwesomeIcon icon={faLocationDot} size="lg" color="#fe9611" />
            <Text ml="5">マップ</Text>
          </Button>
          {/* マップボタン */}

          {/* 投稿ボタン */}
          <Button ml="1" mr="3" mb="1" borderRadius="50" onClick={linkToCreate}>
            <Flex justify="start">
              <FontAwesomeIcon icon={faPlus} size="lg" color="#fe9611" />
              <Text ml="5">投稿</Text>
            </Flex>
          </Button>
          {/* 投稿ボタン */}
        </Flex>

        {/* Sidebar */}
      </Flex>
    </div>
  );
}
