'use client'

import { Avatar, Box, Button, Flex, Select, Text, Textarea, Wrap, WrapItem } from '@chakra-ui/react';
import Header from '../components/header/header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faEnvelope, faHouse, faImage, faLocationDot, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';

export default function Create() {

  const router = useRouter();

  const linkToTop = () => {
    router.push("/top");
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

      {/* Create */}
      <Box width="60%" height="300" borderRadius="20" border="2px" borderColor="orange.500" mr="10%" mt="5">
        <Flex>

          {/* 写真 */}
          <Box width="50%" height="250" background="yellow" ml="5" mr="5" mt="5" display='flex' justifyContent='center' alignItems='center'>
            <FontAwesomeIcon icon={faImage} size="lg" color="blue"/>
            <Text ml="1">画像を選択</Text>
          </Box>
          {/* 写真 */}

          {/* 写真横のアカウント・コメント・ボタンなど */}
          <Box width="50%" height="250" mr="5" mt="5">
            <Flex direction="column">

              {/* 写真横のアカウント・コメント */}
              <Box height="210">

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
                <Select size="sm" borderRadius="5">
                  <option value="Japanese-cuisine">日本料理</option>
                  <option value="Chinese-cuisine">中国料理</option>
                  <option value="French-cuisine">フランス料理</option>
                  <option value="Italian-cuisine">イタリア料理</option>
                  <option value="Ethnic-cuisine">エスニック料理</option>
                </Select>
                <Textarea placeholder='おすすめのお店・料理は？' resize="none" borderRadius={5} size="md" rows={5} mt={1} />
                {/* コメント */}
                
              </Box>
              {/* 写真横のアカウント・コメント */}

              <Flex alignItems="center" justifyContent="space-between">
                {/* マップボタン */}
                <Box height="6" display="flex" alignItems="center" ml="1" mr="1" mt="1">
                  <FontAwesomeIcon icon={faLocationDot} size="lg"/>
                  <Text ml="1">場所を挿入</Text>
                </Box>
                {/* マップボタン */}

                {/* 投稿ボタン */}
                <button onClick={linkToTop}>
                  <Box height="6" display="flex" alignItems="center" ml="1" mr="1" mt="1">
                    <FontAwesomeIcon icon={faCirclePlus} size="lg" color="#fe9611"/>
                    <Text ml="1">投稿</Text>
                  </Box>
                </button>
                {/* 投稿ボタン */}
              </Flex>

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
