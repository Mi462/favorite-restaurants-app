import {
  ReactNode,
  createContext,
  useState,
  useContext,
  useEffect,
} from "react";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/FirebaseConfig";
// import { useRecoilState } from "recoil";

export type UserType = User | null;

export type AuthContextProps = {
  user: UserType;
};

export type AuthProps = {
  children: ReactNode;
};

const AuthContext = createContext<Partial<AuthContextProps>>({});

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: AuthProps) => {
  const router = useRouter();
  const [user, setUser] = useState<UserType>(null);
  const isAvailableForViewing =
    router.pathname === "/top" ||
    router.pathname === "/user" ||
    router.pathname === "/map" ||
    router.pathname === "/edit" ||
    router.pathname === "/commentCreate" ||
    router.pathname === "/create" ||
    router.pathname === "/comment" ||
    router.pathname === "/login" ||
    router.pathname === "/signup";
  const value = {
    user,
  };

  useEffect(() => {
    const authStateChanged = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      !user && !isAvailableForViewing && (await router.push("/login"));
    });
    return () => {
      authStateChanged();
    };
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
