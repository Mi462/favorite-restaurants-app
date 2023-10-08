"use client";

import { auth } from "@/lib/FirebaseConfig";
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
  faHouse,
  faLocationDot,
  faPlus,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const router = useRouter();
  const [user, setUser] = useState<any>({
    userName: "",
    email: "",
    userPicture: "",
    uid: "",
  });

  const linkToUser = () => {
    router.push("/user");
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

  //ログインしているユーザーを取得する関数
  const loginUserFromFirebase = async () => {
    await onAuthStateChanged(auth, (user) => {
      if (user) {
        const currentUser = auth.currentUser;
        // console.log("sidebar", currentUser);
        const uid = user.uid;
        // console.log("sidebar", uid);
        setUser({
          userName: currentUser?.displayName,
          email: currentUser?.email,
          userPicture: currentUser?.photoURL,
          uid: currentUser?.uid,
        });
      } else {
        console.log("else");
      }
    });
  };
  // console.log("sidebar", user);

  useEffect(() => {
    loginUserFromFirebase();
  }, []);

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
                  name={user.userName}
                  size="md"
                  src={user.userPicture}
                ></Avatar>
              </WrapItem>
            </Wrap>
            <Text fontSize="2xl" ml="3">
              {user.userName}
            </Text>
          </Box>
          {/* アカウント表示 */}

          {/* ユーザーボタン */}
          <Button ml="1" mr="3" mb="1" onClick={linkToUser}>
            <FontAwesomeIcon icon={faUser} size="lg" color="#fe9611" />
            <Text ml="5">ユーザー</Text>
          </Button>
          {/* ユーザーボタン */}

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
