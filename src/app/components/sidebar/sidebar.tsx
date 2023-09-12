"use client"

import { Avatar, Button, Flex, Text, Wrap, WrapItem } from "@chakra-ui/react"
import { faHouse, faLocationDot, faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRouter } from "next/navigation";

export default function Sidebar() {

  const router = useRouter();

  const linkToTop = () => {
    router.push("/top");
  }

  const linkToCreate = () => {
    router.push("/create");
  }

  const linkToMap = () => {
    router.push("/map");
  }

  return(
    <div>
      <Flex>
        
        {/* Sidebar */}
        
          <Flex direction="column" width="full" >

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

            {/* マップボタン */}
            <Button ml="1" mr="3" mb="3" onClick={linkToMap}>
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
        
        {/* Sidebar */}
      </Flex>
    </div>
  )
}