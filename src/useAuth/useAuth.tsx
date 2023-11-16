import { ControlLoginUserType } from "@/app/type/type";
import { auth } from "@/lib/FirebaseConfig";
import { loginUser } from "@/states/states";
import { useEffect } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";

export const useAuth = () => {
  const [loginUserData, setLoginUserData] =
    useRecoilState<ControlLoginUserType>(loginUser);
  const resetStatus = useResetRecoilState(loginUser);

  useEffect(() => {
    (async () => {
      const unSub = auth.onAuthStateChanged((authUser) => {
        if (authUser) {
          setLoginUserData({
            userName: authUser.displayName,
            userPicture: authUser.photoURL,
            email: authUser.email,
            userUid: authUser.uid,
          });
        } else {
          resetStatus();
        }
      });
      return () => unSub();
    })();
  }, [setLoginUserData, resetStatus]);

  return loginUserData;
};
