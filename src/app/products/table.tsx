"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Copy, Ellipsis } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { PaginateProducts } from "./paginate-product";
import { Product } from "./types";

const Table = ({ fetchData }: { fetchData: boolean }) => {
  const [productData, setProductData] = useState<Product[]>([]);

  const GetProducts = async () => {
    const response = await PaginateProducts();
    if (response.isOk) {
      setProductData(response.data!);
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
          <p className="font-medium">Checkout</p>
        </div>
      </div>

      {productData?.map((product, key) => {
        return (
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
                {product.price.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                })}
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className=" bg-boxdark-2 ">
                    <Ellipsis className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full bg-boxdark-2">
                  <DropdownMenuLabel>Link de checkout</DropdownMenuLabel>
                  <DropdownMenuGroup>
                    {product.prices.map((price) => {
                      const PRODUCT_GENERATE_CHECKOUT_URL = `${process.env.NEXT_PUBLIC_API_URL}/stripe/checkout?price_id=${product.provider === "STRIPE" ? price.stripe_price_id : price.id}`;

                      return (
                        <DropdownMenuItem
                          key={price.id}
                          className="cursor-pointer space-x-2"
                          onClick={() =>
                            copyToClipboard(
                              PRODUCT_GENERATE_CHECKOUT_URL,
                              product.name,
                            )
                          }
                        >
                          {price.currency.toUpperCase() === "USD" && (
                            <span className="font-bold ">
                              {price.currency.toUpperCase()}
                            </span>
                          )}
                          {price.currency.toUpperCase() === "BRL" && (
                            <span className="font-bold ">
                              {price.currency.toUpperCase()}
                            </span>
                          )}
                          {price.currency.toUpperCase() === "EUR" && (
                            <span className="font-bold ">
                              {price.currency.toUpperCase()}
                            </span>
                          )}
                          {price.currency.toUpperCase() === "GBP" && (
                            <span className="font-bold ">
                              {price.currency.toUpperCase()}
                            </span>
                          )}
                          {product.provider === "STRIPE" && (
                            <span>
                              {price.stripe_price_id
                                .replace("price_", "")
                                .substring(0, 16)}
                            </span>
                          )}
                          {product.provider === "SHOPIFY" && (
                            <span>
                              {product?.shopify_product_id?.substring(0, 16)}
                            </span>
                          )}
                          <DropdownMenuShortcut>
                            <Copy className="h-4 w-4" />
                          </DropdownMenuShortcut>
                        </DropdownMenuItem>
                      );
                    })}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Table;
