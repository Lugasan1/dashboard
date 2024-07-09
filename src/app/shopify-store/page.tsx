"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { Dialog } from "primereact/dialog";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { addProduct } from "./create-product";
import Table from "./table";

const ShopifyStore: React.FC = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [imagem, setImagem] = useState<File | null>(null);
  const [host, setHost] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleAddProduct = async () => {
    if (!imagem) {
      toast.warn("Você deve adicionar uma imagem para o produto");
      return;
    }

    if (nome === "") {
      toast.warn("o nome do produto não pode estar vazio");
      return;
    }
    if (descricao === "") {
      toast.warn("a descrição do produto não pode estar vazio");
      return;
    }

    if (preco === "") {
      toast.warn("o preço do produto não pode estar vazio");
      return;
    }

    if (quantidade === "") {
      toast.warn("a quantidade não pode estar vazia");
      return;
    }

    const response = await addProduct(
      nome,
      descricao,
      preco,
      quantidade,
      imagem,
    );
    if (response.isOk) {
      toast.success(`Produto ${nome} criado`);
      setHost(true);
    }
    toggleModal();
  };

  return (
    <DefaultLayout>
      <Dialog
        header="Cadastrar novo produto"
        visible={showModal}
        onHide={toggleModal}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      >
        <div className="p-5">
          <div className="mb-4">
            <label
              htmlFor="nome"
              className="text-gray-700 block text-sm font-medium"
            >
              Nome:
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="border-gray-300 mt-1 w-full rounded-md border p-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="descricao"
              className="text-gray-700 block text-sm font-medium"
            >
              Descrição:
            </label>
            <textarea
              id="descricao"
              name="descricao"
              rows={3}
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className="border-gray-300 mt-1 w-full rounded-md border p-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              htmlFor="preco"
              className="text-gray-700 block text-sm font-medium"
            >
              Preço:
            </label>
            <input
              type="text"
              id="preco"
              name="preco"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
              className="border-gray-300 mt-1 w-full rounded-md border p-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="quantidade"
              className="text-gray-700 block text-sm font-medium"
            >
              Quantidade:
            </label>
            <input
              type="number"
              id="quantidade"
              name="quantidade"
              value={quantidade}
              onChange={(e) => setQuantidade(e.target.value)}
              className="border-gray-300 mt-1 w-full rounded-md border p-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="imagem"
              className="text-gray-700 block text-sm font-medium"
            >
              Imagem:
            </label>
            <input
              type="file"
              id="imagem"
              name="imagem"
              accept="image/*"
              onChange={(e) =>
                setImagem(e.target.files ? e.target.files[0] : null)
              }
              className="border-gray-300 mt-1 w-full rounded-md border p-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleAddProduct}
              className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none"
            >
              Adicionar Produto
            </button>
          </div>
        </div>
      </Dialog>
      <div className="grid-cols-content mt-4 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div>
          <button
            onClick={toggleModal}
            className="border-blue hover:bg-blue flex items-center justify-center gap-2 rounded-md border px-4 py-2 text-blue-500 hover:text-white focus:outline-none"
          >
            <FontAwesomeIcon icon={faPlus} />
            Cadastrar loja
          </button>
        </div>
        <div className="mt-5">
          <Table fetchData={true} />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ShopifyStore;
