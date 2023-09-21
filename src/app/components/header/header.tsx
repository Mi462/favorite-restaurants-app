"use client";

import { Box, Button, Heading } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  const linkToLogin = () => {
    router.push("/");
  };

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
        <Button onClick={linkToLogin}>LOGOUT</Button>
      </Box>
      {/* header */}
    </div>
  );
}
