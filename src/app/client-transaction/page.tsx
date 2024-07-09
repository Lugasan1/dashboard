"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Table from "./table";

const Products: React.FC = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [imagem, setImagem] = useState<File | null>(null);

  return (
    <DefaultLayout>
      <div className="grid-cols-content mt-4 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="mt-5">
          <Table fetchData={true} />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Products;
