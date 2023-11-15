"use client";

import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Wrap,
  WrapItem,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "@/lib/FirebaseConfig";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { SignupUserDataType } from "../type/type";

export default function Login() {
  const router = useRouter();
  //ユーザー画像
  const [userImage, setUserImage] = useState<Blob | MediaSource | string>();
  const [createUserPictureURL, setCreateUserPictureURL] = useState<string>();
  const [user, setUser] = useState<SignupUserDataType>({
    userName: "",
    password: "",
    email: "",
    userPicture: "",
  });

  //アカウント画像登録
  const userPictureUploadToFirebase = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      const file = e.target.files[0];
      // console.log(file);
      setUserImage(file);

      //Storageにユーザー画像をアップロードする
      const storage = getStorage();
      const storageRef = ref(storage, "/image" + file.name);
      await uploadBytes(storageRef, file);

      //Storageからユーザー画像をダウンロードする
      await getDownloadURL(ref(storage, "/image" + file.name))
        .then((url) => {
          // console.log(url);
          setCreateUserPictureURL(url);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  //Sign Up押下時の関数
  const handleSubmit = async () => {
    //Sign Upの前にユーザー名の入力と画像の登録を確認する
    //ユーザー名の確認
    if (user.userName === "") {
      alert("ユーザー名が記入されていません。");
      return;
    }
    //ユーザー画像の確認
    if (userImage === undefined) {
      alert("ユーザー画像が登録されていません。");
      return;
    }
    //確認後、AuthenticationとDatabaseの両方に登録
    await createUserWithEmailAndPassword(auth, user.email, user.password)
      .then(async (userCredential) => {
        // Signed in 成功！
        const currentUser: User | null = auth.currentUser;
        if (currentUser) {
          //Authenticationの方への登録
          await updateProfile(userCredential.user, {
            displayName: user.userName,
            photoURL: createUserPictureURL,
          })
            .then(() => {
              // Profile updated!
              console.log("Profile updated!");
            })
            .catch((error) => {
              // An error occurred
              console.log(error);
            });
          //Databaseのusersコレクションへの登録
          await setDoc(doc(db, "users", currentUser.uid), {
            userName: user.userName,
            email: user.email,
            userPicture: createUserPictureURL,
            userUid: currentUser.uid,
          });
          //Loginページに遷移
          router.push("/");
        }
      })
      .catch((error) => {
        // console.log(error.code);
        // console.log(error.message);
        switch (error.code) {
          case "auth/weak-password":
            alert("パスワードが短すぎます。6文字以上を入力してください。");
            break;
          case "auth/invalid-email":
            alert("メールアドレスの形式が正しくありません。");
            break;
          case "auth/network-request-failed":
            alert(
              "通信がエラー、またはタイムアウトになりました。通信環境がいい所で再度やり直してください。"
            );
            break;
          default:
            alert(
              "アカウントの作成に失敗しました。通信環境がいい所で再度やり直してください。"
            );
        }
      });
  };

  return (
    <div>
      {/* header */}
      <Box
        background="orange"
        p="3"
        display="flex"
        alignItems="center"
        m="3"
        justifyContent="space-between"
      >
        <Heading textColor="white">Favorite Restaurants App</Heading>
      </Box>
      {/* header */}

      {/* ログイン */}
      <Flex height="80vh" alignItems="center" justifyContent="center">
        <Flex
          direction="column"
          background="orange.100"
          padding="12"
          rounded="6"
        >
          <Heading textAlign="center" mb="6">
            Sign up
          </Heading>

          {/* ユーザー写真 */}
          {createUserPictureURL === undefined ? (
            <Box>
              <Box display="flex" justifyContent="center">
                <Wrap>
                  <WrapItem>
                    <label htmlFor="form-image" style={{ cursor: "pointer" }}>
                      <Avatar
                        name="Tarou"
                        size="2xl"
                        src="https://bit.ly/dan-abramov"
                      ></Avatar>
                    </label>
                  </WrapItem>
                </Wrap>
              </Box>
              <Text display="flex" justifyContent="center" fontSize="md" mb="3">
                アカウント画像の選択
              </Text>
              <Input
                display="none"
                multiple
                name="userImageURL"
                type="file"
                id="form-image"
                accept=".png, .jpeg, .jpg"
                onChange={userPictureUploadToFirebase}
              />
            </Box>
          ) : (
            <Box display="flex" justifyContent="center" mb="3">
              <Wrap>
                <WrapItem>
                  <Avatar
                    name="Tarou"
                    size="2xl"
                    src={createUserPictureURL}
                  ></Avatar>
                </WrapItem>
              </Wrap>
            </Box>
          )}
          {/* ユーザー写真 */}

          {/* ユーザー名入力 */}
          <Input
            placeholder="ユーザー名"
            background="white"
            mb="3"
            type="userName"
            onChange={(e) => setUser({ ...user, userName: e.target.value })}
          />
          {/* ユーザー名入力 */}

          {/* ユーザーのメールアドレス入力 */}
          <Input
            placeholder="sample@sample.com"
            background="white"
            mb="3"
            type="email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          {/* ユーザーのメールアドレス入力 */}

          {/* ユーザーのパスワード */}
          <Input
            placeholder="********"
            background="white"
            mb="6"
            type="password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          {/* ユーザーのパスワード */}

          {/* Sign up */}
          <Button
            mb="6"
            colorScheme="orange"
            onClick={() => {
              handleSubmit();
            }}
          >
            Sign up
          </Button>
          {/* Sign up */}
        </Flex>
      </Flex>
      {/* ログイン */}
    </div>
  );
}
