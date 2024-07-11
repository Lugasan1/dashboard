"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { Dialog } from "primereact/dialog";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { CreateStore } from "./create-store";
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

  const PayloadMap = {
    name: "Nome da loja",
    public_key: "Chave Pública",
    secret_key: "Chave Secreta",
    hostname: "Host da Loja",
  };

  async function handleCreateStore(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.target as HTMLFormElement);

    const data = Object.fromEntries(form.entries());

    for (const [key, value] of Object.entries(data)) {
      if (value === "") {
        toast.warn(
          `O campo ${PayloadMap[key as keyof typeof PayloadMap]} não pode estar vazio`,
        );
        return;
      }
    }

    const response = await CreateStore({
      hostname: data["hostname"] as string,
      name: data["name"] as string,
    });

    if (response.isOk) {
      toast.success(
        "Loja criada com sucesso, vamos redirecionar para a instalação da loja.",
      );

      window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/shopify?shop=${response?.data?.hostname}`;
      return;
    }
  }

  return (
    <DefaultLayout>
      <Dialog
        header="Cadastrar nova loja (Shopify)"
        visible={showModal}
        onHide={toggleModal}
        // breakpoints={{ "960px": "75vw", "720px": "100vw" }}
      >
        <form className="max-w-115 w-full p-5" onSubmit={handleCreateStore}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Nome da Loja:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="hostname"
              className="block text-sm font-medium text-gray-700"
            >
              Host da loja:
            </label>
            <input
              type="text"
              id="hostname"
              name="hostname"
              placeholder="example.myshopify.com"
              className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none"
            >
              Adicionar Loja
            </button>
          </div>
        </form>
      </Dialog>
      <div className="grid-cols-content 2xl:mt-7.5 2xl:gap-7.5 mt-4 gap-4 md:mt-6 md:gap-6">
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
