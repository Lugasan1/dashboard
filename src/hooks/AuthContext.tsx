import { DashboardData } from "@/app/dashboard/dashboard";
import { usePathname, useRouter } from "next/navigation";
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
import { DashboardStore } from "./dashboard.store";

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

  const { merge } = DashboardStore();

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
      "/products/create",
      "/shopify-store",
      "/client-transaction",
      "/charges",
      "/dashboard",
      "/stripe-credential",
      "/shopify-credential",
    ];

    if (!isAuthenticated && !publicPaths.includes(pathname)) {
      localStorage.clear();
      sessionStorage.clear();
      router.push("/");
    }
  }, [isAuthenticated, pathname, router]);

  const getData = useCallback(async () => {
    const response = await DashboardData("10");

    if (!response.isOk) {
      toast.error("Houve um erro ao buscar os dados");
      return;
    }

    merge(response.data!);
  }, [merge]);

  useEffect(() => {
    getData();
  }, [getData]);

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
