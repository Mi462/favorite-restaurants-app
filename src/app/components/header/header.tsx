"use client";

import { Box, Heading } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logout from "../logout/page";

export default function Header() {
  const router = useRouter();

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
        <Link href="/top">
          <Heading textColor="white">Favorite Restaurants App</Heading>
        </Link>
        <Logout />
      </Box>
      {/* header */}
    </div>
  );
}
