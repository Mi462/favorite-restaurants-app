'use client'

import { Box, Heading } from '@chakra-ui/react'

export default function Header() {
  return (
    <div>
      {/* header */}
      <Box background="orange" p="3">
        <Heading textColor="white">
          Favorite Restaurants App
        </Heading>
      </Box>
      {/* header */}

    </div>
  )
}
