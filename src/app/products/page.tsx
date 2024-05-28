"use client"
import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TableTwo from "@/components/Tables/TableTwo";
import { addProduct } from "./product";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Products: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [imagem, setImagem] = useState<File | null>(null);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleAddProduct = async() => {
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

    console.log("Nome:", nome);
    console.log("Descrição:", descricao);
    console.log("Preço:", preco);
    console.log("Quantidade:", quantidade);
    console.log("Imagem:", imagem);

    const response = await addProduct(nome, descricao, preco, quantidade, imagem)
    if(response.isOk){
      let host = process.env.NEXT_PUBLIC_DOMAIN+"/products"
       window.location.href=`${host}`
     }
    toggleModal();
  };

  return (
    <DefaultLayout>
      
      <Dialog header="Cadastrar novo produto" visible={showModal} onHide={toggleModal} breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
        <div className="p-5">
          <div className="mb-4">
            <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome:</label>
            <input type="text" id="nome" name="nome" value={nome} onChange={(e) => setNome(e.target.value)} className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div className="mb-4">
            <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">Descrição:</label>
            <textarea id="descricao" name="descricao" rows={3} value={descricao} onChange={(e) => setDescricao(e.target.value)} className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="preco" className="block text-sm font-medium text-gray-700">Preço:</label>
            <input type="text" id="preco" name="preco" value={preco} onChange={(e) => setPreco(e.target.value)} className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div className="mb-4">
            <label htmlFor="quantidade" className="block text-sm font-medium text-gray-700">Quantidade:</label>
            <input type="number" id="quantidade" name="quantidade" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div className="mb-4">
            <label htmlFor="imagem" className="block text-sm font-medium text-gray-700">Imagem:</label>
            <input type="file" id="imagem" name="imagem" accept="image/*" onChange={(e) => setImagem(e.target.files ? e.target.files[0] : null)} className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div className="flex justify-end">
            <button onClick={handleAddProduct} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none">
              Adicionar Produto
            </button>
          </div>
        </div>
      </Dialog>
      <div className=" grid-cols-content gap-4 md:gap-6 2xl:gap-7.5 mt-4 md:mt-6 2xl:mt-7.5">
      <div>
          <button
            onClick={toggleModal}
            className="flex items-center justify-center gap-2 px-4 py-2 border border-blue text-blue-500 rounded-md hover:text-white hover:bg-blue focus:outline-none"
          >
            <FontAwesomeIcon icon={faPlus} />
            Cadastrar produto
          </button>
        </div>
        <div className="mt-5">
          <TableTwo />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Products;
