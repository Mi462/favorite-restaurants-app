'use client'

import { Avatar, Box, Flex, Select, Text, Textarea, Wrap, WrapItem } from '@chakra-ui/react';
import Header from '../../components/header/header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faImage, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import Sidebar from '../../components/sidebar/sidebar';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/FirebaseConfig';
import { format } from 'path';

export default function Edit({ params }: { params: { id: string } }) {

  //画面遷移用
  const router = useRouter();
  //状態
  const [ editPost, setEditPost ] = useState({
    id: params.id,
    text: "",
    category: "日本料理",
    createdAt: "",
    updatedAt: ""
  });
  //カテゴリの状態
  const [ selectCategory, setSelectCategory ] = useState("日本料理");

  const linkToTop = () => {
    router.push("/top");
  }

  //カテゴリの選択
  const onChangePostStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectCategory(e.target.value)
  }

  useEffect(() => {
    (async() => {
      //渡ってきたidを元にデータベースからデータを取り出してきた
      const docRef = doc(db, "posts", params.id);
      const docSnap = await getDoc(docRef); 
      const { text, category, createdAt, updatedAt } = docSnap.data() || {};
      //取り出したデータをsetEditTodoに設定する
      setEditPost({
        id: params.id,
        text,
        category,
        createdAt,
        updatedAt
      })
    })()
  }, [])

  console.log(editPost)
  console.log(editPost.category)
  

  return (
    <div>
      <Header />

      <Flex>
        {/* Sidebar */}
        <Box width="20%" height="100%" ml="10%" mt="5">
          <Sidebar />
        </Box> 
        {/* Sidebar */}

      {/* Create */}
      <Box width="60%" height="300" borderRadius="20" border="2px" borderColor="orange.500" mr="10%" mt="5">
        <Flex>

          {/* 写真 */}
          <Box width="50%" height="250" background="#FEFCBF" ml="5" mr="5" mt="5" display='flex' justifyContent='center' alignItems='center'>
            <FontAwesomeIcon icon={faImage} size="lg" color="#4299E1"/>
            <Text ml="1">画像を変更可能</Text>
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
                <Select size="sm" borderRadius="5" value={editPost.category} onChange={(e) => {onChangePostStatus(e)}}>
                  <option value="日本料理">日本料理</option>
                  <option value="中国料理">中国料理</option>
                  <option value="フランス料理">フランス料理</option>
                  <option value="イタリア料理">イタリア料理</option>
                  <option value="エスニック料理">エスニック料理</option>
                </Select>
                <Textarea resize="none" borderRadius={5} size="md" rows={5} mt={1} value={editPost.text} onChange={(e) => {setEditPost({ ...editPost, text: e.target.value })}}/>
                {/* コメント */}
                
              </Box>
              {/* 写真横のアカウント・コメント */}

              <Flex alignItems="center" justifyContent="space-between">
                {/* マップボタン */}
                <Box height="6" display="flex" alignItems="center" ml="1" mr="1" mt="1">
                  <FontAwesomeIcon icon={faLocationDot} size="lg" color="#4299E1"/>
                  <Text ml="1">ミスタードーナツ</Text>
                </Box>
                {/* マップボタン */}

                {/* 投稿ボタン */}
                <button onClick={linkToTop}>
                  <Box height="6" display="flex" alignItems="center" ml="1" mr="1" mt="1">
                    <FontAwesomeIcon icon={faCirclePlus} size="lg" color="#fe9611"/>
                    <Text ml="1">再投稿</Text>
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
