import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import LoginPage from "./auth/signin/page"

export const metadata: Metadata = {
  title:
    "Dashboard Native Pay",
  description: "Dashboard Native Pay",
};

export default function Home() {
  return (
    <>
     <LoginPage />
    </>
  );
}
