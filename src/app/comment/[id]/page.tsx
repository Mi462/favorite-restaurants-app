"use client";

import {
  Avatar,
  Box,
  Flex,
  Text,
  Wrap,
  WrapItem,
  Image,
  Container,
} from "@chakra-ui/react";
import Header from "../../components/header/header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faHeart } from "@fortawesome/free-solid-svg-icons";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
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
import { useAuth } from "@/useAuth/useAuth";
import { CommentPostType, ShowPostType, LoginUserType } from "@/app/type/type";

export default function Comment() {
  const router = useRouter();
  //Post作成者のuid
  const searchParams = useSearchParams();
  const postAuthorUid = searchParams.get("postAuthorUid") as string;
  //Postのid
  const params = useParams();
  const id = params.id as string;
  //ログインユーザー
  const loginUserData = useAuth();
  //ログインユーザーのuid
  // const loginUserUid = sessionStorage.getItem("uid");
  // 「いいね」の状態管理
  const [isLiked, setIsLiked] = useState<boolean | null>(null);
  // 「いいね」数の状態管理
  const [likeCount, setLikeCount] = useState<number>(0);
  //コメントしたユーザーの情報
  const [commentUsers, setCommentUsers] = useState<LoginUserType[]>([]);
  //Postの状態
  const [subPost, setSubPost] = useState<ShowPostType>({
    id: id,
    text: "",
    category: "日本料理",
    createdAt: "",
    updatedAt: "",
    picture: "",
    authorUid: postAuthorUid,
    userName: "",
    userPicture: "",
  });
  //コメントの状態
  const [comments, setComments] = useState<CommentPostType[]>([]);
  //ローディング
  const [loading, setLoading] = useState<boolean>(true);

  //Postの取得用useEffect
  useEffect(() => {
    postDataFromFirebase();
  }, [id]);

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
    if (postAuthorUid && id) {
      //Post作成者のデータを取得する
      const postCreateUserData = await getDoc(doc(db, "users", postAuthorUid));
      const { userName, userPicture } = postCreateUserData.data() || {};
      //渡ってきたidを元にデータベースからデータを取り出す
      const docSnap = await getDoc(
        doc(db, "users", postAuthorUid, "posts", id)
      );
      const { text, category, createdAt, updatedAt, picture, authorUid } =
        docSnap.data() || {};
      setSubPost({
        id: id,
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
    } else {
      console.log("One of the required fields is null (posts)");
    }
  };

  //コメントに関して
  //1, ユーザーの情報が入った配列とコメントの情報が入った配列を用意
  //ユーザーの情報が入った配列の取得
  const commentUsersDataFromFirebase = async () => {
    const q = collection(db, "users");
    await getDocs(q).then((snapShot) => {
      const getCommentUsersData: LoginUserType[] = snapShot.docs.map((doc) => {
        const { userPicture, userName, userUid, email } = doc.data();
        return { userPicture, userName, userUid, email };
      });
      setCommentUsers(getCommentUsersData);
    });
  };

  //コメントの取得
  const commentsDataFromFirebase = async () => {
    if (postAuthorUid && id) {
      const queryComments = query(
        collection(db, "users", postAuthorUid, "posts", id, "comments"),
        //createdAtを基準に昇順で取得
        orderBy("createdAt")
      );
      await getDocs(queryComments).then((snapShot) => {
        const getCommentsData: CommentPostType[] = snapShot.docs.map((doc) => {
          const { commentId, text, createdAt, commentAuthorUid } =
            doc.data() || {};
          const commentUser = commentUsers.find(
            (p: LoginUserType) => p.userUid === commentAuthorUid
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
    } else {
      console.log("One of the required fields is null (comments)");
    }
  };

  //この投稿に対して既にlikeしたかどうかを判別する
  //いいね機能
  useEffect(() => {
    // if (postAuthorUid && loginUserUid && id) {
    if (postAuthorUid && loginUserData.userUid && id) {
      const postRef = doc(db, "users", postAuthorUid, "posts", id);
      // const likedUserRef = doc(postRef, "LikedUsers", loginUserUid);
      const likedUserRef = doc(postRef, "LikedUsers", loginUserData.userUid);

      const unsubscribeLikedUser = onSnapshot(likedUserRef, (doc) => {
        setIsLiked(doc.exists());
      });

      //「いいね」数の監視＆データ更新
      const likedUsersRef = collection(
        db,
        "users",
        postAuthorUid,
        "posts",
        id,
        "LikedUsers"
      );
      const unsubscribeLikedCount = onSnapshot(likedUsersRef, (snapShot) => {
        setLikeCount(snapShot.size);
      });

      return () => {
        unsubscribeLikedUser();
        unsubscribeLikedCount();
      };
    } else {
      console.log("One of the required fields is null (like)");
    }
    // }, [loginUserUid, id]);
  }, [loginUserData.userUid, id]);

  // 「いいね」ボタンのクリックイベント
  const handleClick = useCallback(async () => {
    // if (!loginUserUid || isLiked === null) return;
    if (!loginUserData.userUid || isLiked === null) return;
    if (postAuthorUid && id) {
      //「いいね」ボタン押下時のFirebaseのデータ構造の準備
      const postRef = doc(db, "users", postAuthorUid, "posts", id);
      //Postに対して残すサブコレクション（LikedUsers）
      // const likedUserRef = doc(postRef, "LikedUsers", loginUserUid);
      const likedUserRef = doc(postRef, "LikedUsers", loginUserData.userUid);
      // const userSnapshot = await getDoc(doc(db, "users", loginUserUid));
      const userSnapshot = await getDoc(
        doc(db, "users", loginUserData.userUid)
      );
      const { userName, userUid, userPicture } = userSnapshot.data() || {};

      if (isLiked) {
        //isLikeを使って、既にlikeしたか確認して、もししていたら解除する
        await deleteDoc(likedUserRef);
      } else {
        //isLikeを使って、既にlikeしたか確認したあと、いいねする（重複させない）
        await setDoc(likedUserRef, {
          userUid,
          userName,
          userPicture,
          likedPostId: id,
        });
      }
    }
    // }, [loginUserUid, id, isLiked]);
  }, [loginUserData.userUid, id, isLiked]);

  // 「いいね」機能のためのレンダリング
  // if (!loginUserUid) return null;
  if (!loginUserData.userUid) return null;
  if (isLiked === null) return null;

  const linkToCommentCreate = (id: string, postAuthorUid: string) => {
    router.push(`/commentCreate/${id}?postAuthorUid=${postAuthorUid}`);
  };

  return (
    <div>
      <Header />
      <Container maxW="1000" mb="16">
        <Flex direction="column">
          {/* ユーザー情報 */}
          <Box display="flex" alignItems="center" p="3">
            <Wrap>
              <WrapItem>
                <Avatar
                  name={loginUserData.userName!}
                  size="md"
                  src={loginUserData.userPicture!}
                ></Avatar>
              </WrapItem>
            </Wrap>
            <Text
              ml="3"
              mr="3"
              fontSize={{
                base: "md",
                md: "2xl",
              }}
              // bg={{ base: "red.200", md: "green.200" }}
            >
              {loginUserData.userName}
            </Text>
          </Box>
          {/* ユーザー情報 */}

          {/* Posts */}
          <Box width="100%" height="100%" mb="16">
            <Flex direction="column">
              {loading ? (
                <Flex justifyContent="center" mt="100">
                  <Flex direction="column" textAlign="center">
                    <Text fontSize="3xl">Postsを読み込み中…</Text>
                  </Flex>
                </Flex>
              ) : (
                <Box
                  height={{ base: "200", md: "300" }}
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
                      height={{ base: "170", md: "250" }}
                      ml={{ base: "3", md: "5" }}
                      mr={{ base: "3", md: "5" }}
                      mt={{ base: "3", md: "5" }}
                    />
                    {/* 写真 */}

                    {/* 写真横のアカウント・コメント・ボタンなど */}
                    <Box
                      width="50%"
                      height="250"
                      mr={{ base: "3", md: "5" }}
                      mt={{ base: "3", md: "5" }}
                    >
                      <Flex direction="column">
                        {/* 写真横のアカウント・コメント */}
                        <Box height={{ base: "150", md: "220" }}>
                          {/* アカウント */}
                          <Flex
                            alignItems="center"
                            m={{ base: "1", md: "3" }}
                            justifyContent="space-between"
                          >
                            <Flex alignItems="center">
                              <Wrap>
                                <WrapItem>
                                  <Avatar
                                    name={subPost.userName}
                                    size={{ base: "sm", md: "md" }}
                                    src={subPost.userPicture}
                                  ></Avatar>
                                </WrapItem>
                              </Wrap>
                              <Text
                                fontSize={{ base: "10", md: "lg" }}
                                ml={{ base: "1", md: "3" }}
                                mr={{ base: "1", md: "3" }}
                              >
                                {subPost.userName}
                              </Text>
                            </Flex>
                            <Text fontSize={{ base: "10", md: "md" }}>
                              {subPost.updatedAt}
                            </Text>
                          </Flex>
                          {/* アカウント */}

                          {/* コメント */}
                          <Text
                            mb={{ base: "1", md: "3" }}
                            fontSize={{ base: "10", md: "md" }}
                          >
                            ジャンル： {subPost.category}
                          </Text>
                          <Text fontSize={{ base: "10", md: "md" }}>
                            {subPost.text}
                          </Text>
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
                          {/* いいねボタン */}
                          <Flex alignItems="center">
                            <FontAwesomeIcon
                              icon={faHeart}
                              color={isLiked ? "red" : "#4299E1"}
                              size="lg"
                              onClick={handleClick}
                              cursor="pointer"
                            />
                            <Text ml="1" fontSize={{ base: "10", md: "lg" }}>
                              {likeCount}
                            </Text>
                          </Flex>
                          {/* いいねボタン */}

                          {/* 返信ボタン */}
                          <FontAwesomeIcon
                            icon={faComment}
                            size="lg"
                            color="#4299E1"
                            onClick={() => {
                              linkToCommentCreate(id, postAuthorUid);
                            }}
                            cursor="pointer"
                          />
                          {/* 返信ボタン */}
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
              {loading ? (
                <Flex justifyContent="center" mt="100">
                  <Flex direction="column" textAlign="center">
                    <Text fontSize="3xl">Commentsを読み込み中…</Text>
                  </Flex>
                </Flex>
              ) : (
                comments.map((comment: CommentPostType) => {
                  return (
                    <Box
                      width="95%"
                      height={{ base: "130", md: "200" }}
                      borderRadius="20"
                      background="orange.100"
                      border="2px"
                      borderColor="orange.500"
                      mt="5"
                      ml={{ base: "3", md: "5" }}
                      key={comment.commentId}
                    >
                      <Flex>
                        {/* 写真横のアカウント・コメント・ボタンなど */}
                        <Box
                          width="100%"
                          height={{ base: "100", md: "160" }}
                          mr={{ base: "3", md: "5" }}
                          ml={{ base: "3", md: "5" }}
                          mt={{ base: "3", md: "5" }}
                        >
                          <Flex direction="column">
                            {/* 写真横のアカウント・コメント */}

                            {/* アカウント */}
                            <Flex
                              alignItems="center"
                              justifyContent="space-between"
                              mb="1"
                            >
                              <Flex alignItems="center">
                                <Wrap>
                                  <WrapItem>
                                    <Avatar
                                      name={comment.userName}
                                      size={{ base: "sm", md: "md" }}
                                      src={comment.userPicture}
                                    ></Avatar>
                                  </WrapItem>
                                </Wrap>
                                <Text
                                  fontSize={{ base: "10", md: "lg" }}
                                  ml="3"
                                >
                                  {comment.userName}
                                </Text>
                              </Flex>
                              <Text fontSize={{ base: "10", md: "lg" }}>
                                {comment.createdAt}
                              </Text>
                            </Flex>
                            {/* アカウント */}

                            {/* コメント */}
                            <Text fontSize={{ base: "10", md: "lg" }}>
                              {comment.text}
                            </Text>
                            {/* コメント */}

                            {/* 写真横のアカウント・コメント */}
                          </Flex>
                        </Box>
                        {/* 写真横のアカウント・コメント・ボタンなど */}
                      </Flex>
                    </Box>
                  );
                })
              )}

              {/* Comments */}
            </Flex>
          </Box>
        </Flex>
      </Container>
    </div>
  );
}
