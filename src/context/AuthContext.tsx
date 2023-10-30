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
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();
  const [user, setUser] = useState<UserType>(null);
  console.log(user);
  const isAvailableForViewing =
    pathname === "/top" ||
    pathname === "/user" ||
    pathname === "/map" ||
    pathname === "/edit" ||
    pathname === "/commentCreate" ||
    pathname === "/create" ||
    pathname === "/comment" ||
    pathname === "/login" ||
    pathname === "/signup";
  const value = {
    user,
  };

  useEffect(() => {
    const authStateChanged = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      console.log(user);
      //現在未ログインで、閲覧可能のページに入っていた場合は、ログインページに遷移
      !user && isAvailableForViewing && (await router.push("/"));
    });
    return () => {
      authStateChanged();
    };
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
