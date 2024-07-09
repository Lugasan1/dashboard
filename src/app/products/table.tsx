"use client";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { PaginateProducts } from "./paginate-product";

interface ProductDataReq {
  id: string;
  name: string;
  quantity: string;
  photo: string;
  description: string;
  price: number;
  link: string;
}

const Table = ({ fetchData }: { fetchData: boolean }) => {
  const [productData, setProductData] = useState<ProductDataReq[]>([]);

  const GetProducts = async () => {
    const response = await PaginateProducts();
    if (response.isOk) {
      console.log(response.message);
      setProductData(response.message);
    }
  };

  useEffect(() => {
    GetProducts();
  }, [fetchData]);

  const copyToClipboard = (link: string, product: string) => {
    navigator.clipboard.writeText(link);
    toast.success(`Link do produto: ${product} copiado`);
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="px-4 py-6 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Produtos cadastrados
        </h4>
      </div>

      <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-3 flex items-center">
          <p className="font-medium">Produto</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">Descrição</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Preço</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Link do checkout</p>
        </div>
      </div>

      {productData?.map((product, key) => (
        <div
          className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={key}
        >
          <div className="col-span-3 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="h-12.5 w-15 rounded-md">
                <Image
                  src={product.photo}
                  width={60}
                  height={50}
                  alt="Product"
                />
              </div>
              <p className="text-sm text-black dark:text-white">
                {product.name}
              </p>
            </div>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="text-sm text-black dark:text-white">
              {product.description}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">
              ${" "}
              {product.price.toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">
              {product?.link?.substring(0, 10)}
              <button
                onClick={() =>
                  copyToClipboard(
                    `${process.env.NEXT_PUBLIC_DOMAIN}forms/form-elements?client=${product?.link || ""}&productQuantity=${product.quantity}&productName=${product.name}&price=${product.price}&image=${product.photo}`,
                    product.name,
                  )
                }
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 ml-2"
              >
                <FontAwesomeIcon icon={faCopy} />
              </button>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Table;
