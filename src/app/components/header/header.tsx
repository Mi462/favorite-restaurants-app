"use client";

import {
  Avatar,
  Box,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import Link from "next/link";
import Logout from "../logout/page";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDoorOpen,
  faFolder,
  faHouse,
  faLocationDot,
  faPlus,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/FirebaseConfig";
import { useAuth } from "@/useAuth/useAuth";
import { useRouter } from "next/navigation";

export default function Header() {
  const loginUserData = useAuth();
  return (
    <div>
      {/* header */}
      <Box
        background="orange"
        p="3"
        display="flex"
        alignItems="center"
        m="3"
        justifyContent="space-between"
      >
        {/* アプリのタイトル欄 */}
        <Link href="/top">
          <Heading textColor="white">Favorite Restaurants App</Heading>
        </Link>
        {/* アプリのタイトル欄 */}

        {/* ユーザー情報とメニュー欄とLogoutボタン */}
        <Box display="flex">
          {/* メニュー欄 */}
          <Menu>
            <MenuButton
              bg="yellow"
              mr="3"
              borderRadius="6"
              pl="5"
              pr="5"
              fontWeight="600"
            >
              Menu
            </MenuButton>
            <MenuList>
              <MenuItem
                as="a"
                href="/user"
                icon={
                  <FontAwesomeIcon icon={faUser} size="lg" color="#fe9611" />
                }
              >
                ユーザー
              </MenuItem>
              <MenuItem
                as="a"
                href="/myPage"
                icon={
                  <FontAwesomeIcon icon={faFolder} size="lg" color="#fe9611" />
                }
              >
                マイページ
              </MenuItem>
              <MenuItem
                as="a"
                href="/top"
                icon={
                  <FontAwesomeIcon icon={faHouse} size="lg" color="#fe9611" />
                }
              >
                ホーム
              </MenuItem>
              <MenuItem
                as="a"
                href="/map"
                icon={
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    size="lg"
                    color="#fe9611"
                  />
                }
              >
                マップ
              </MenuItem>
              <MenuItem
                as="a"
                href="/create"
                icon={
                  <FontAwesomeIcon icon={faPlus} size="lg" color="#fe9611" />
                }
              >
                投稿
              </MenuItem>
            </MenuList>
          </Menu>
          {/* メニュー欄 */}

          {/* Logoutボタン */}
          <Logout />
          {/* Logoutボタン */}
        </Box>
        {/* メニュー欄とLogoutボタン */}
      </Box>
      {/* header */}
    </div>
  );
}
