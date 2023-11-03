"use client";

import {
  Avatar,
  Box,
  Flex,
  Text,
  Wrap,
  WrapItem,
  Image,
} from "@chakra-ui/react";
import Header from "../../components/header/header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faHeart,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/sidebar";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { db } from "@/lib/FirebaseConfig";
import { format } from "date-fns";
import { useRecoilValue } from "recoil";
import { commentPost, loginUser } from "@/states/states";
import { useAuth } from "@/useAuth/useAuth";

export default function Comment({ params }: { params: { id: string } }) {
  const router = useRouter();
  //ログインユーザー
  // const user = useRecoilValue(loginUser);
  const loginUserData = useAuth();
  // console.log(loginUserData);
  // 「いいね」の状態管理
  const [isLiked, setIsLiked] = useState<boolean | null>(null);
  // 「いいね」数の状態管理
  const [likeCount, setLikeCount] = useState<number>(0);
  //Comment画面遷移時のPost作成者の情報
  const commentPostUser = useRecoilValue(commentPost);
  //コメントしたユーザーの情報
  const [commentUsers, setCommentUsers] = useState<any>([]);
  //Postの状態
  const [subPost, setSubPost] = useState<any>({
    id: params.id,
    text: "",
    category: "日本料理",
    createdAt: "",
    updatedAt: "",
    picture: "",
    authorUid: "",
    userName: "",
    userPicture: "",
  });
  //コメントの状態
  const [comments, setComments] = useState<any>([]);
  //ローディング
  const [loading, setLoading] = useState<boolean>(true);

  console.log(commentPostUser.authorUid);

  //Postの取得用useEffect
  useEffect(() => {
    postDataFromFirebase();
  }, [commentPostUser]);

  //コメントしたユーザーの情報取得用useEffect
  useEffect(() => {
    commentUsersDataFromFirebase();
  }, []);

  //コメントの取得用useEffect
  useEffect(() => {
    commentsDataFromFirebase();
  }, [commentUsers]);

  //Postに関して
  //1, ユーザーの情報が入ったstateとPostの情報が入ったstateを用意
  // → ユーザーの情報は commentPostUser にある

  //Postの情報の取得
  const postDataFromFirebase = async () => {
    if (commentPostUser.authorUid) {
      //渡ってきたidを元にデータベースからデータを取り出す
      const docSnap = await getDoc(
        doc(db, "users", commentPostUser.authorUid, "posts", params.id)
      );
      const { text, category, createdAt, updatedAt, picture, authorUid } =
        docSnap.data() || {};
      const { userName, userPicture } = commentPostUser;
      setSubPost({
        id: params.id,
        text,
        category,
        createdAt: format(createdAt.toDate(), "yyyy/MM/dd HH:mm"),
        updatedAt: format(updatedAt.toDate(), "yyyy/MM/dd HH:mm"),
        picture,
        authorUid,
        userName,
        userPicture,
      });
      setLoading(false);
    }
  };
  // console.log("ラスト4", subPost);

  //コメントに関して
  //1, ユーザーの情報が入った配列とコメントの情報が入った配列を用意
  //ユーザーの情報が入った配列の取得
  const commentUsersDataFromFirebase = async () => {
    const q = collection(db, "users");
    await getDocs(q).then((snapShot) => {
      const getCommentUsersData: any = snapShot.docs.map((doc) => {
        const { userPicture, userName, userUid } = doc.data();
        return { userPicture, userName, userUid };
      });
      setCommentUsers(getCommentUsersData);
    });
  };

  //コメントの取得
  const commentsDataFromFirebase = async () => {
    if (commentPostUser.authorUid) {
      const queryComments = query(
        collection(
          db,
          "users",
          commentPostUser.authorUid,
          "posts",
          params.id,
          "comments"
        ),
        //createdAtを基準に昇順で取得
        orderBy("createdAt")
      );
      await getDocs(queryComments).then((snapShot) => {
        const getCommentsData: any = snapShot.docs.map((doc) => {
          const { commentId, text, createdAt, commentAuthorUid } =
            doc.data() || {};
          const commentUser = commentUsers.find(
            (p: any) => p.userUid === commentAuthorUid
          );
          const { userName, userPicture } = commentUser || {};
          return {
            commentId,
            text,
            createdAt: format(createdAt.toDate(), "yyyy/MM/dd HH:mm"),
            commentAuthorUid,
            userName,
            userPicture,
          };
        });
        setComments(getCommentsData);
      });
    }
  };
  // console.log(comments);

  //この投稿に対して既にlikeしたかどうかを判別する
  //いいね機能
  useEffect(() => {
    // if (!loginUserData.userUid) return;
    if (commentPostUser.authorUid) {
      const postRef = doc(
        db,
        "users",
        commentPostUser.authorUid,
        "posts",
        params.id
      );
      const likedUserRef = doc(postRef, "LikedUsers", loginUserData.userUid);

      const unsubscribeLikedUser = onSnapshot(likedUserRef, (doc) => {
        setIsLiked(doc.exists());
      });

      //「いいね」数の監視＆データ更新
      const likedUsersRef = collection(
        db,
        "users",
        commentPostUser.authorUid,
        "posts",
        params.id,
        "LikedUsers"
      );
      const unsubscribeLikedCount = onSnapshot(likedUsersRef, (snapShot) => {
        setLikeCount(snapShot.size);
      });

      return () => {
        unsubscribeLikedUser();
        unsubscribeLikedCount();
      };
    }
  }, [loginUserData.userUid, params.id]);

  console.log(isLiked);

  // 「いいね」ボタンのクリックイベント
  const handleClick = useCallback(async () => {
    if (!loginUserData.userUid || isLiked === null) return;

    //「いいね」ボタン押下時のFirebaseのデータ構造の準備
    const postRef = doc(
      db,
      "users",
      commentPostUser.authorUid,
      "posts",
      params.id
    );
    //Postに対して残すサブコレクション（LikedUsers）
    const likedUserRef = doc(postRef, "LikedUsers", loginUserData.userUid);

    const userDoc = doc(db, "users", loginUserData.userUid);
    const userSnapshot = await getDoc(doc(db, "users", loginUserData.userUid));
    const { userName, userUid, userPicture } = userSnapshot.data() || {};

    //Usersに対して残すサブコレクション（likePosts）
    const userLikePostRef = doc(userDoc, "likePosts", params.id);

    if (isLiked) {
      //isLikeを使って、既にlikeしたか確認して、もししていたら解除する
      await deleteDoc(likedUserRef);
      // await deleteDoc(userLikePostRef);
    } else {
      //isLikeを使って、既にlikeしたか確認したあと、いいねする（重複させない）
      await setDoc(likedUserRef, {
        userUid,
        userName,
        userPicture,
        likedPostId: params.id,
      });
      // await setDoc(userLikePostRef, { postId: params.id });
    }
  }, [loginUserData.userUid, params.id, isLiked]);

  // 「いいね」機能のためのレンダリング
  if (!loginUserData.userUid) return null;
  if (isLiked === null) return null;

  const linkToMap = () => {
    router.push("/map");
  };

  const linkToCommentCreate = (id: string) => {
    router.push(`/commentCreate/${id}`);
  };

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
            {loading ? (
              <Flex justifyContent="center" mt="100">
                <Flex direction="column" textAlign="center">
                  <Text fontSize="3xl">読み込み中…</Text>
                </Flex>
              </Flex>
            ) : (
              <Box
                height="300"
                borderRadius="20"
                background="orange.200"
                border="2px"
                borderColor="orange.500"
                mt="5"
              >
                <Flex>
                  {/* 写真 */}
                  <Image
                    src={subPost.picture}
                    alt="imageDataPost"
                    width="50%"
                    height="250"
                    ml="5"
                    mr="5"
                    mt="5"
                  />
                  {/* 写真 */}

                  {/* 写真横のアカウント・コメント・ボタンなど */}
                  <Box width="50%" height="250" mr="5" mt="5">
                    <Flex direction="column">
                      {/* 写真横のアカウント・コメント */}
                      <Box height="220">
                        {/* アカウント */}
                        <Flex
                          alignItems="center"
                          m="3"
                          justifyContent="space-between"
                        >
                          <Flex alignItems="center">
                            <Wrap>
                              <WrapItem>
                                <Avatar
                                  name={subPost.userName}
                                  size="md"
                                  src={subPost.userPicture}
                                ></Avatar>
                              </WrapItem>
                            </Wrap>
                            <Text fontSize="lg" ml="3">
                              {subPost.userName}
                            </Text>
                          </Flex>
                          <Text>{subPost.updatedAt}</Text>
                        </Flex>
                        {/* アカウント */}

                        {/* コメント */}
                        <Text mb="3">ジャンル： {subPost.category}</Text>
                        <Text>{subPost.text}</Text>
                        {/* コメント */}
                      </Box>
                      {/* 写真横のアカウント・コメント */}

                      {/* ボタン */}
                      <Box
                        height="6"
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        ml="1"
                        mr="1"
                        mt="1"
                      >
                        {/* 返信ボタン */}
                        <FontAwesomeIcon
                          icon={faComment}
                          size="lg"
                          color="#4299E1"
                          onClick={() => {
                            linkToCommentCreate(params.id);
                          }}
                          cursor="pointer"
                        />
                        {/* 返信ボタン */}

                        {/* いいねボタン */}
                        {/* <button onClick={handleClick}> */}
                        <Flex alignItems="center">
                          <FontAwesomeIcon
                            icon={faHeart}
                            color={isLiked ? "red" : "#4299E1"}
                            size="lg"
                            onClick={handleClick}
                            cursor="pointer"
                          />
                          <Text ml="1">{likeCount}</Text>
                        </Flex>
                        {/* </button> */}
                        {/* いいねボタン */}

                        {/* マップボタン */}
                        <FontAwesomeIcon
                          icon={faLocationDot}
                          size="lg"
                          color="#4299E1"
                          onClick={linkToMap}
                          cursor="pointer"
                        />
                        {/* マップボタン */}
                      </Box>
                      {/* ボタン */}
                    </Flex>
                  </Box>

                  {/* 写真横のアカウント・コメント・ボタンなど */}
                </Flex>
              </Box>
            )}
            {/* Posts */}

            {/* Comments */}
            {comments.map((comment: any) => {
              return (
                <Box
                  width="95%"
                  height="200"
                  borderRadius="20"
                  background="orange.100"
                  border="2px"
                  borderColor="orange.500"
                  mt="5"
                  ml="5"
                  key={comment.commentId}
                >
                  <Flex>
                    {/* 写真横のアカウント・コメント・ボタンなど */}
                    <Box width="100%" height="190" mr="5" ml="5">
                      <Flex direction="column">
                        {/* 写真横のアカウント・コメント */}
                        <Box height="160">
                          {/* アカウント */}
                          <Flex
                            alignItems="center"
                            m="3"
                            justifyContent="space-between"
                          >
                            <Flex alignItems="center">
                              <Wrap>
                                <WrapItem>
                                  <Avatar
                                    name={comment.userName}
                                    size="md"
                                    src={comment.userPicture}
                                  ></Avatar>
                                </WrapItem>
                              </Wrap>
                              <Text fontSize="lg" ml="3">
                                {comment.userName}
                              </Text>
                            </Flex>
                            <Text>{comment.createdAt}</Text>
                          </Flex>
                          {/* アカウント */}

                          {/* コメント */}
                          <Text>{comment.text}</Text>
                          {/* コメント */}
                        </Box>
                        {/* 写真横のアカウント・コメント */}
                      </Flex>
                    </Box>
                    {/* 写真横のアカウント・コメント・ボタンなど */}
                  </Flex>
                </Box>
              );
            })}

            {/* Comments */}
          </Flex>
        </Box>
      </Flex>
    </div>
  );
}
