'use client'

import { Avatar, Box, Button, Flex, Text, Wrap, WrapItem } from '@chakra-ui/react';
import Header from '../components/header/header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faEnvelope, faHeart, faHouse, faLocationDot, faPenToSquare, faPlus, faReply, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';

export default function Comment() {

  const router = useRouter();

  const linkToTop = () => {
    router.push("/top");
  }

  const linkToCreate = () => {
    router.push("/create");
  }

  const linkToEdit = () => {
    router.push("/edit");
  }

  const linkToCommentEdit = () => {
    router.push("/commentEdit");
  }

  return (
    <div>
      <Header />

      <Flex>
      <Box width="20%" height="100%" ml="10%" mt="5">
        <Flex direction="column">

          {/* アカウント表示 */}
          <Flex alignItems="center" m="3">
            <Wrap>
              <WrapItem>
                <Avatar name="Tarou" size="md" src="https://bit.ly/dan-abramov"></Avatar>
              </WrapItem>
            </Wrap>
            <Text fontSize="2xl" ml="3">アカウント名</Text>
          </Flex>
          {/* アカウント表示 */}

          {/* ホームボタン */}
          <Button ml="1" mr="3" mb="1" onClick={linkToTop}>
              <FontAwesomeIcon icon={faHouse} size="lg" color="#fe9611"/>
              <Text ml="5">ホーム</Text>
          </Button>
          {/* ホームボタン */}

          {/* メッセージボタン */}
          <Button ml="1" mr="3" mb="1">
            <FontAwesomeIcon icon={faEnvelope} size="lg" color="#fe9611"/>
            <Text ml="5">メッセージ</Text>
          </Button>
          {/* メッセージボタン */}

          {/* マップボタン */}
          <Button ml="1" mr="3" mb="3">
            <FontAwesomeIcon icon={faLocationDot} size="lg" color="#fe9611"/>
            <Text ml="5">マップ</Text>
          </Button>
          {/* マップボタン */}

          {/* 投稿ボタン */}
          <Button ml="1" mr="3" mb="1" borderRadius="50" onClick={linkToCreate}>
            <Flex justify="start">
            <FontAwesomeIcon icon={faPlus} size="lg" color="#fe9611"/>
            <Text ml="5">投稿</Text>
            </Flex>
          </Button>
          {/* 投稿ボタン */}
          
        </Flex>
      </Box>

      {/* Posts */}
      <Box width="60%" height="1000">
      <Flex direction="column">
      <Box height="300" borderRadius="20" background="orange" border="2px" borderColor="orange.500" mt="5">
        <Flex>

          {/* 写真 */}
          <Box width="50%" height="250" background="yellow" ml="5" mr="5" mt="5"></Box>
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
                <Text>
                ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。 ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。スタバの新作が気になる。
                </Text>
                {/* コメント */}
                
              </Box>
              {/* 写真横のアカウント・コメント */}

              {/* ボタン */}
              <Box height="6" display="flex" alignItems="center" justifyContent="space-between" ml="1" mr="1" mt="1">
                <FontAwesomeIcon icon={faComment} size="lg" color="blue"/>
                <FontAwesomeIcon icon={faHeart} size="lg" color="blue"/>
                <FontAwesomeIcon icon={faLocationDot} size="lg" color="blue"/>
                <button onClick={linkToEdit}>
                  <FontAwesomeIcon icon={faPenToSquare} size="lg" color="blue"/>
                </button>
                <FontAwesomeIcon icon={faTrashCan} size="lg" color="blue"/>
              </Box>
              {/* ボタン */}

            </Flex>
          </Box>
          {/* 写真横のアカウント・コメント・ボタンなど */}

        </Flex>
      </Box>
      {/* Posts */}

      {/* Comment1 */}
      <Box width="95%" height="200" borderRadius="20" background="orange" border="2px" borderColor="orange.500" mt="5" ml="5">
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
                <FontAwesomeIcon icon={faReply} size="lg" color="blue"/>
                <FontAwesomeIcon icon={faHeart} size="lg" color="blue"/>
                <FontAwesomeIcon icon={faLocationDot} size="lg" color="blue"/>
                <button onClick={linkToCommentEdit}>
                  <FontAwesomeIcon icon={faPenToSquare} size="lg" color="blue"/>
                </button>
              </Box>
              {/* ボタン */}

            </Flex>
          </Box>
          {/* 写真横のアカウント・コメント・ボタンなど */}

        </Flex>
      </Box>
      {/* Comment1 */}

      {/* Comment2 */}
      <Box width="95%" height="200" borderRadius="20" background="orange" border="2px" borderColor="orange.500" mt="5" ml="5">
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
              <FontAwesomeIcon icon={faReply} size="lg" color="blue"/>
                <FontAwesomeIcon icon={faHeart} size="lg" color="blue"/>
                <FontAwesomeIcon icon={faLocationDot} size="lg" color="blue"/>
                <button onClick={linkToCommentEdit}>
                  <FontAwesomeIcon icon={faPenToSquare} size="lg" color="blue"/>
                </button>
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
