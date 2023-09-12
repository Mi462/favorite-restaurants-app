'use client'

import { Box, Button, Flex, Heading, Input } from '@chakra-ui/react'
import Header from '../components/header/header'
import { useRouter } from 'next/navigation'

export default function Login() {

  const router = useRouter();

  const linkToLogin = () => {
    router.push("/");
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
            Sign up
          </Heading>
          <Input placeholder='sample@sample.com' background="white" mb="3" type="email" />
          <Input placeholder='********' background="white" mb="6" type="password" />
          <Button mb="6" colorScheme="orange" onClick={linkToLogin}>
            Sign up
          </Button>
        </Flex>
      </Flex>
      {/* ログイン */}
    </div>
  )
}
