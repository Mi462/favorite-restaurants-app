'use client'

import { Avatar, Box, Button, Flex, Select, Text, Textarea, Wrap, WrapItem } from '@chakra-ui/react';
import Header from '../components/header/header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faEnvelope, faHouse, faImage, faLocationDot, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';

export default function CmmentEdit() {

  const router = useRouter();

  const linkToTop = () => {
    router.push("/top");
  }

  const linkToComment = () => {
    router.push("/comment");
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
          <Button ml="1" mr="3" mb="1" borderRadius="50">
            <Flex justify="start">
            <FontAwesomeIcon icon={faPlus} size="lg" color="#fe9611"/>
            <Text ml="5">投稿</Text>
            </Flex>
          </Button>
          {/* 投稿ボタン */}
          
        </Flex>
      </Box>

      {/* CommentEdit */}
      <Box width="60%" height="300" borderRadius="20" border="2px" borderColor="orange.500" mr="10%" mt="5">
      <Flex direction="column">

          {/* アカウント・Edit・ボタンなど */}
          <Box height="250" m="5">

              {/* アカウント・Edit */}
              <Box height="220">

                {/* アカウント */}
                <Flex alignItems="center" m="1">
                  <Wrap>
                    <WrapItem>
                      <Avatar name="Tarou" size="sm" src="https://bit.ly/dan-abramov"></Avatar>
                    </WrapItem>
                  </Wrap>
                  <Text fontSize="lg" ml="3">アカウント名</Text>
                </Flex>
                {/* アカウント */}

                {/* コメント */}
                <Textarea defaultValue='ミスドの生フレンチクルーラー、美味しいですよね！' resize="none" borderRadius={5} size="md" rows={7} mt={1} />
                {/* コメント */}
                
              </Box>
              {/* 写真横のアカウント・コメント */}

              <Flex alignItems="center" justifyContent="space-between">
                {/* マップボタン */}
                <Box height="6" display="flex" alignItems="center" ml="1" mr="1" mt="1">
                  <FontAwesomeIcon icon={faLocationDot} size="lg"/>
                  <Text ml="1">ミスタードーナツ</Text>
                </Box>
                {/* マップボタン */}

                {/* 投稿ボタン */}
                <button onClick={linkToComment}>
                  <Box height="6" display="flex" alignItems="center" ml="1" mr="1" mt="1">
                    <FontAwesomeIcon icon={faCirclePlus} size="lg" color="#fe9611"/>
                    <Text ml="1">再投稿</Text>
                  </Box>
                </button>
                {/* 投稿ボタン */}
              </Flex>

          </Box>
          {/* 写真横のアカウント・コメント・ボタンなど */}

        </Flex>
      </Box>
      {/* Create */}

      </Flex>
    </div>
  )
}
