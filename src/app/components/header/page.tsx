"use client";

import {
  Box,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import Link from "next/link";
import Logout from "../logout/page";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolder,
  faHouse,
  faPlus,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

export default function Header() {
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
          <Heading textColor="white" size={{ base: "md", md: "lg" }}>
            Favorite Restaurants App
          </Heading>
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
                href="/loginUserEdit"
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
