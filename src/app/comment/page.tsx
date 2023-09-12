'use client'

import { Avatar, Box, Flex, Text, Wrap, WrapItem } from '@chakra-ui/react';
import Header from '../components/header/header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart, faLocationDot, faPenToSquare, faReply, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import Sidebar from '../components/sidebar/sidebar';

export default function Comment() {

  const router = useRouter();

  const linkToMap = () => {
    router.push("/map");
  }

  const linkToEdit = () => {
    router.push("/edit");
  }

  const linkToCommentEdit = () => {
    router.push("/commentEdit");
  }

  const linkToCommentCreate = () => {
    router.push("/commentCreate");
  }

  return (
    <div>
      <Header />

      <Flex>
        {/* Sidebar */}
        <Box width="20%" height="100%" ml="10%" mt="5">
          <Sidebar />
        </Box> 
        {/* Sidebar */}

      {/* Posts */}
      <Box width="60%" height="100%" mb="16">
      <Flex direction="column">
      <Box height="300" borderRadius="20" background="orange.200" border="2px" borderColor="orange.500" mt="5">
        <Flex>

          {/* 写真 */}
          <Box width="50%" height="250" background="#FEFCBF" ml="5" mr="5" mt="5"></Box>
          {/* 写真 */}

          {/* 写真横のアカウント・コメント・ボタンなど */}
          <Box width="50%" height="250" mr="5" mt="5">
            <Flex direction="column">

              {/* 写真横のアカウント・コメント */}
              <Box height="220">

                {/* アカウント */}
                <Flex alignItems="center" m="3" justifyContent="space-between">
                  <Box display="flex">
                    <Wrap>
                      <WrapItem>
                        <Avatar name="Tarou" size="sm" src="https://bit.ly/dan-abramov"></Avatar>
                      </WrapItem>
                    </Wrap>
                    <Text fontSize="lg" ml="3">アカウント名</Text>
                  </Box>
                  <Text>2023/00/00 00:00:00</Text>
                </Flex>
                {/* アカウント */}

                {/* コメント */}
                <Text mb="3">ジャンル： 日本料理</Text>
                <Text>
                ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。 ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。スタバの新作が気になる。
                </Text>
                {/* コメント */}
                
              </Box>
              {/* 写真横のアカウント・コメント */}

              {/* ボタン */}
              <Box height="6" display="flex" alignItems="center" justifyContent="space-between" ml="1" mr="1" mt="1">

                {/* 返信ボタン */}
                <button onClick={linkToCommentCreate}>
                  <FontAwesomeIcon icon={faReply} size="lg" color="#4299E1"/>
                </button>
                {/* 返信ボタン */}

                {/* いいねボタン */}
                <FontAwesomeIcon icon={faHeart} size="lg" color="#4299E1"/>
                {/* いいねボタン */}

                {/* マップボタン */}
                <button onClick={linkToMap}>
                  <FontAwesomeIcon icon={faLocationDot} size="lg" color="#4299E1"/>
                </button>
                {/* マップボタン */}

                {/* 編集ボタン */}
                <button onClick={linkToEdit}>
                  <FontAwesomeIcon icon={faPenToSquare} size="lg" color="#4299E1"/>
                </button>
                {/* 編集ボタン */}
                
              </Box>
              {/* ボタン */}

            </Flex>
          </Box>
          {/* 写真横のアカウント・コメント・ボタンなど */}

        </Flex>
      </Box>
      {/* Posts */}

      {/* Comment1 */}
      <Box width="95%" height="200" borderRadius="20" background="orange.100" border="2px" borderColor="orange.500" mt="5" ml="5">
        <Flex>

          {/* 写真横のアカウント・コメント・ボタンなど */}
          <Box height="190" mr="5" ml="5">
            <Flex direction="column">

              {/* 写真横のアカウント・コメント */}
              <Box height="160">

                {/* アカウント */}
                <Flex alignItems="center" m="3" justifyContent="space-between">
                  <Box display="flex">
                    <Wrap>
                      <WrapItem>
                        <Avatar name="Zirou" size="sm" src="https://bit.ly/kent-c-dodds"></Avatar>
                      </WrapItem>
                    </Wrap>
                    <Text fontSize="lg" ml="3">アカウント名</Text>
                  </Box>
                  <Text>2023/00/00 00:00:00</Text>
                </Flex>
                {/* アカウント */}

                {/* コメント */}
                <Text>
                ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。 ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。スタバしか勝たん。
                </Text>
                {/* コメント */}
                
              </Box>
              {/* 写真横のアカウント・コメント */}

              {/* ボタン */}
              <Box height="6" display="flex" alignItems="center" justifyContent="space-between" ml="10" mr="10" mt="1">

                {/* 返信ボタン */}
                <button onClick={linkToCommentCreate}>
                  <FontAwesomeIcon icon={faReply} size="lg" color="#4299E1"/>
                </button>
                {/* 返信ボタン */}

                {/* いいねボタン */}
                <FontAwesomeIcon icon={faHeart} size="lg" color="#D53F8C"/>
                {/* いいねボタン */}

                {/* Editボタン */}
                <button onClick={linkToCommentEdit}>
                  <FontAwesomeIcon icon={faPenToSquare} size="lg" color="#4299E1"/>
                </button>
                {/* Editボタン */}

              </Box>
              {/* ボタン */}

            </Flex>
          </Box>
          {/* 写真横のアカウント・コメント・ボタンなど */}

        </Flex>
      </Box>
      {/* Comment1 */}

      {/* Comment2 */}
      <Box width="95%" height="200" borderRadius="20" background="orange.100" border="2px" borderColor="orange.500" mt="5" ml="5">
        <Flex>

          {/* 写真横のアカウント・コメント・ボタンなど */}
          <Box height="190" mr="5" ml="5">
            <Flex direction="column">

              {/* 写真横のアカウント・コメント */}
              <Box height="160">

                {/* アカウント */}
                <Flex alignItems="center" m="3" justifyContent="space-between">
                  <Box display="flex">
                    <Wrap>
                      <WrapItem>
                        <Avatar name="Tarou" size="sm" src="https://bit.ly/dan-abramov"></Avatar>
                      </WrapItem>
                    </Wrap>
                    <Text fontSize="lg" ml="3">アカウント名</Text>
                  </Box>
                  <Text>2023/00/00 00:00:00</Text>
                </Flex>
                {/* アカウント */}

                {/* コメント */}
                <Text>
                ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。 ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。よな。
                </Text>
                {/* コメント */}
                
              </Box>
              {/* 写真横のアカウント・コメント */}

              {/* ボタン */}
              <Box height="6" display="flex" alignItems="center" justifyContent="space-between" ml="10" mr="10" mt="1">

                {/* 返信ボタン */}
                <button onClick={linkToCommentCreate}>
                  <FontAwesomeIcon icon={faReply} size="lg" color="#4299E1"/>
                </button>
                {/* 返信ボタン */}

                {/* いいねボタン */}
                <FontAwesomeIcon icon={faHeart} size="lg" color="#4299E1"/>
                {/* いいねボタン */}

                {/* Editボタン */}
                <button onClick={linkToCommentEdit}>
                  <FontAwesomeIcon icon={faPenToSquare} size="lg" color="#4299E1"/>
                </button>
                {/* Editボタン */}

              </Box>
              {/* ボタン */}

            </Flex>
          </Box>
          {/* 写真横のアカウント・コメント・ボタンなど */}

        </Flex>
      </Box>
      {/* Comment2 */}
      
      </Flex>
      </Box>
      </Flex>
    </div>
  )
}
