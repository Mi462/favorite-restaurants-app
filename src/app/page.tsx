'use client'

import { Box, Button, Flex, Heading, Input, Link, Text } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'

export default function Login() {

  const router = useRouter();

  const linkToTop = () => {
    router.push("/top");
  }

  return (
    <div>
      {/* header */}
      <Box background="orange" p="3" display="flex" alignItems="center" m="3" justifyContent="space-between">
        <Heading textColor="white">
          Favorite Restaurants App
        </Heading>
      </Box>
      {/* header */}

      {/* ログイン */}
      <Flex height="80vh" alignItems="center" justifyContent="center">
        <Flex direction="column" background="orange.100" padding="12" rounded="6">
          <Heading textAlign="center" mb="6">
            Log in
          </Heading>
          <Input placeholder='sample@sample.com' background="white" mb="3" type="email" />
          <Input placeholder='********' background="white" mb="6" type="password" />
          <Button mb="6" colorScheme="orange" onClick={linkToTop}>
            Log in
          </Button>
          <Text textAlign="center">
            新規の方は
            <Link color="orange.500" href="/signup">こちら</Link>
            へ
          </Text>
        </Flex>
      </Flex>
      {/* ログイン */}
    </div>
  )
}
