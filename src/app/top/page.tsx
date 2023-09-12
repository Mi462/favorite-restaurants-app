'use client'

import { Avatar, Box, Flex, Text, Wrap, WrapItem } from '@chakra-ui/react';
import Header from '../components/header/header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart, faLocationDot, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import Sidebar from '../components/sidebar/sidebar';

export default function Top() {

  const router = useRouter();

  const linkToComment = () => {
    router.push("/comment");
  }

  const linkToEdit = () => {
    router.push("/edit");
  }

  const linkToMap = () => {
    router.push("/map");
  }

  return (
    <div>
      <Header />

      {/* SidebarとPosts */}
      <Flex>
        
        {/* Sidebar */}
        <Box width="20%" height="100%" ml="10%" mt="5">
          <Sidebar />
        </Box> 
        {/* Sidebar */}

        {/* Posts */}
        <Box width="60%" height="100%" mb="16">
          <Flex direction="column">

            {/* Posts1 */}
            <Box height="300" borderRadius="20" background="orange.100" border="2px" borderColor="orange.500" mt="5">
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
                      ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。 ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。食欲の秋！！
                      </Text>
                      {/* コメント */}
                
                    </Box>
                    {/* 写真横のアカウント・コメント */}

                    {/* ボタン */}
                    <Box height="6" display="flex" alignItems="center" justifyContent="space-between" ml="1" mr="1" mt="1">

                      {/* コメントボタン */}
                      <button onClick={linkToComment}>
                        <FontAwesomeIcon icon={faComment} size="lg" color="#4299E1"/>
                      </button>
                      {/* コメントボタン */}

                      {/* いいねボタン */}
                      <FontAwesomeIcon icon={faHeart} size="lg" color="#D53F8C"/>
                      {/* いいねボタン */}

                      {/* マップボタン */}
                      <button onClick={linkToMap}>
                        <FontAwesomeIcon icon={faLocationDot} size="lg" color="#4299E1"/>
                      </button>
                      {/* マップボタン */}

                      {/* Editボタン */}
                      <button onClick={linkToEdit}>
                        <FontAwesomeIcon icon={faPenToSquare} size="lg" color="#4299E1"/>
                      </button>
                      {/* Editボタン */}

                      {/* 削除ボタン */}
                      <FontAwesomeIcon icon={faTrashCan} size="lg" color="#4299E1"/>
                      {/* 削除ボタン */}

                    </Box>
                    {/* ボタン */}

                  </Flex>
                </Box>
                {/* 写真横のアカウント・コメント・ボタンなど */}

              </Flex>
            </Box>
            {/* Posts1 */}

            {/* Posts2 */}
            <Box height="300" borderRadius="20" background="orange.100" border="2px" borderColor="orange.500" mt="5">
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
                              <Avatar name="Zirou" size="sm" src="https://bit.ly/kent-c-dodds"></Avatar>
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
                      ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。 ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。月見バーガー出てきた！
                      </Text>
                      {/* コメント */}
                
                    </Box>
                    {/* 写真横のアカウント・コメント */}

                    {/* ボタン */}
                    <Box height="6" display="flex" alignItems="center" justifyContent="space-between" ml="1" mr="1" mt="1">
                      {/* コメントボタン */}
                      <button onClick={linkToComment}>
                        <FontAwesomeIcon icon={faComment} size="lg" color="#4299E1"/>
                      </button>
                      {/* コメントボタン */}

                      {/* いいねボタン */}
                      <FontAwesomeIcon icon={faHeart} size="lg" color="#4299E1"/>
                      {/* いいねボタン */}

                      {/* マップボタン */}
                      <button onClick={linkToMap}>
                        <FontAwesomeIcon icon={faLocationDot} size="lg" color="#4299E1"/>
                      </button>
                      {/* マップボタン */}

                      {/* Editボタン */}
                      <button onClick={linkToEdit}>
                        <FontAwesomeIcon icon={faPenToSquare} size="lg" color="#4299E1"/>
                      </button>
                      {/* Editボタン */}

                      {/* 削除ボタン */}
                      <FontAwesomeIcon icon={faTrashCan} size="lg" color="#4299E1"/>
                      {/* 削除ボタン */}
                    </Box>
                    {/* ボタン */}

                  </Flex>
                </Box>
                {/* 写真横のアカウント・コメント・ボタンなど */}

              </Flex>
            </Box>
            {/* Posts2 */}

            {/* Posts3 */}
            <Box height="300" borderRadius="20" background="orange.100" border="2px" borderColor="orange.500" mt="5">
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
                      ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。 ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ミスドは美味しい。
                      </Text>
                      {/* コメント */}
                
                    </Box>
                    {/* 写真横のアカウント・コメント */}

                    {/* ボタン */}
                    <Box height="6" display="flex" alignItems="center" justifyContent="space-between" ml="1" mr="1" mt="1">
                      {/* コメントボタン */}
                      <button onClick={linkToComment}>
                        <FontAwesomeIcon icon={faComment} size="lg" color="#4299E1"/>
                      </button>
                      {/* コメントボタン */}

                      {/* いいねボタン */}
                      <FontAwesomeIcon icon={faHeart} size="lg" color="#4299E1"/>
                      {/* いいねボタン */}

                      {/* マップボタン */}
                      <button onClick={linkToMap}>
                        <FontAwesomeIcon icon={faLocationDot} size="lg" color="#4299E1"/>
                      </button>
                      {/* マップボタン */}

                      {/* Editボタン */}
                      <button onClick={linkToEdit}>
                        <FontAwesomeIcon icon={faPenToSquare} size="lg" color="#4299E1"/>
                      </button>
                      {/* Editボタン */}

                      {/* 削除ボタン */}
                      <FontAwesomeIcon icon={faTrashCan} size="lg" color="#4299E1"/>
                      {/* 削除ボタン */}
                    </Box>
                    {/* ボタン */}

                  </Flex>
                </Box>
                {/* 写真横のアカウント・コメント・ボタンなど */}

              </Flex>
            </Box>
            {/* Posts3 */}

          </Flex>
        </Box>
        {/* Posts */}

      </Flex>
      {/* SidebarとPosts */}
    </div>
  )
}
