'use client'

import { Box, Button, Heading } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'

export default function Header() {

  const router = useRouter();

  const linkToLogin = () => {
    router.push("/login");
  }

  return (
    <div>
      {/* header */}
      <Box background="orange" p="3" display="flex" alignItems="center" m="3" justifyContent="space-between">
        <Heading textColor="white">
          Favorite Restaurants App
        </Heading>
        <Button onClick={linkToLogin}>LOGOUT</Button>
      </Box>
      {/* header */}

    </div>
  )
}
