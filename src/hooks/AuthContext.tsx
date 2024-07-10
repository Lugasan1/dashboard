import { usePathname, useRouter } from "next/navigation";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
}: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();

  console.log("isAuthenticated:", isAuthenticated);

  useEffect(() => {
    const token = localStorage.getItem("@NativePay:Token");
    setIsAuthenticated(!!token);
  }, []);

  const logout = () => {
    localStorage.removeItem("@NativePay:Token");
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const publicPaths = [
      "/forms/form-elements",
      "/forms/completion",
      "/",
      "/auth/signup",
      "/auth/signin",
      "/products",
      "/shopify-store",
      "/client-transaction",
      "/charges",
      "/dashboard",
    ];

    console.log({
      isAuthenticated,
      publicPaths,
      pathname,
    });

    if (!isAuthenticated && !publicPaths.includes(pathname)) {
      console.log(publicPaths.includes(pathname), isAuthenticated);
      localStorage.clear();
      sessionStorage.clear();
      router.push("/");
    }
  }, [isAuthenticated, pathname, router]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
