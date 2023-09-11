'use client'

import { Button, Flex, Heading, Input } from '@chakra-ui/react'
import Header from '../components/header/header'

export default function Login() {
  return (
    <div>
      {/* header */}
      <Header />
      {/* header */}

      {/* ログイン */}
      <Flex height="80vh" alignItems="center" justifyContent="center">
        <Flex direction="column" background="orange.100" padding="12" rounded="6">
          <Heading textAlign="center" mb="6">
            Sign up
          </Heading>
          <Input placeholder='sample@sample.com' background="white" mb="3" type="email" />
          <Input placeholder='********' background="white" mb="6" type="password" />
          <Button mb="6" textColor="white" background="orange.500">
            Sign up
          </Button>
        </Flex>
      </Flex>
      {/* ログイン */}
    </div>
  )
}
