"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import React from "react";
import Table from "./table";

const Products: React.FC = () => {
  const router = useRouter();

  return (
    <DefaultLayout>
      <div className="grid-cols-content mt-4 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div>
          <button
            onClick={() => router.push("/products/create")}
            className="border-blue hover:bg-blue flex items-center justify-center gap-2 rounded-md border px-4 py-2 text-blue-500 hover:text-white focus:outline-none"
          >
            <FontAwesomeIcon icon={faPlus} />
            Cadastrar produto
          </button>
        </div>
        <div className="mt-5">
          <Table fetchData={true} />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Products;
