"use client";

import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function Error404() {
  const router = useRouter();

  const linkToTop = () => {
    router.push("/top");
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
        <Heading textColor="white">Favorite Restaurants App</Heading>
      </Box>
      {/* header */}

      <Flex justifyContent="center" mt="100">
        <Flex direction="column" textAlign="center">
          <Text fontSize="6xl">404</Text>
          <Text fontSize="lg">このページは存在しません。</Text>
          <br />
        </Flex>
      </Flex>
      <Flex justifyContent="center">
        <Button colorScheme="orange" onClick={linkToTop}>
          Home
        </Button>
      </Flex>
    </div>
  );
}
