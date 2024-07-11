"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeftCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import ReactSelect from "react-select";
import { toast } from "react-toastify";
import { ShopifyCreateProduct } from "./create-shopify-product";
import { StripeCreateProduct } from "./create-stripe-product";
import { StoreList } from "./store-list";
import { Store } from "./types";
const CURRENCY_LIST = [
  { value: "USD", label: "USD" },
  { value: "BRL", label: "BRL" },
  { value: "EUR", label: "EUR" },
  { value: "GBP", label: "GBP" },
];
const Products: React.FC = () => {
  const PayloadMap = {
    name: "Nome",
    description: "Descrição",
    price: "Preço",
    quantity: "Quantidade",
  };

  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [currencies, setCurrencies] = useState<(typeof CURRENCY_LIST)[0][]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const [storeId, setStoreId] = useState<number | null>(null);
  const [storeIsAllocated, setStoreIsAllocated] = useState(false);

  const router = useRouter();

  async function handleCreateProduct(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = new FormData(event.target as HTMLFormElement);
    form.delete("photo");

    const data = Object.fromEntries(form.entries());

    for (const [key, value] of Object.entries(data)) {
      if (value === "") {
        toast.warn(
          `O campo ${PayloadMap[key as keyof typeof PayloadMap]} não pode estar vazio`,
        );
        return;
      }
    }

    if (fileInputRef.current?.files?.length === 0) {
      toast.warn("Selecione uma imagem");
      return;
    }

    if (currencies.length === 0) {
      toast.warn("Selecione pelo menos uma moeda");
      return;
    }

    if (storeIsAllocated && storeId === null) {
      toast.warn("Selecione uma loja");
      return;
    }

    for (const { value } of currencies) {
      form.append(`currencies[]`, value);
    }

    form.append("photo", fileInputRef.current?.files?.[0]!);

    if (storeIsAllocated && storeId !== null) {
      form.append("store_id", storeId.toString());

      const response = await ShopifyCreateProduct(form);

      if (!response.isOk) {
        toast.error("Houve um erro ao criar o produto.");
        return;
      }

      router.back();

      return;
    }

    const response = await StripeCreateProduct(form);

    if (!response.isOk) {
      toast.error("Houve um erro ao criar o produto.");
      return;
    }

    router.back();
  }

  const getStoreList = useCallback(async function () {
    const response = await StoreList();

    if (response.isOk) {
      setStores(response.data!);
    }
  }, []);

  useEffect(() => {
    if (storeIsAllocated) {
      getStoreList();
    }
  }, [storeIsAllocated, getStoreList]);

  return (
    <DefaultLayout>
      <div className="container flex h-full flex-1 flex-col gap-4">
        <div className="flex flex-1 justify-between space-x-4">
          <button
            onClick={() => router.back()}
            className="border-blue hover:bg-blue flex items-center justify-center gap-2 rounded-md border px-2 py-1 text-blue-500 hover:text-white focus:outline-none"
          >
            <ArrowLeftCircle className="h-5 w-5" />
            voltar
          </button>
          <h1 className="text-2xl font-semibold">Criar novo produto</h1>
        </div>
        <section className=" flex h-full w-full flex-1 items-center justify-center">
          <div className="mt-5 w-full max-w-[720px] rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark">
            <form onSubmit={handleCreateProduct}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="text-gray-700 block text-sm font-medium"
                >
                  Nome:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  // defaultValue={credential.client_id || ""}
                  className="border-gray-300 mt-1 w-full rounded-md border p-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="text-gray-700 block text-sm font-medium"
                >
                  Descrição:
                </label>
                <textarea
                  // defaultValue={credential.secret_key || ""}
                  id="description"
                  name="description"
                  className="border-gray-300 mt-1 w-full rounded-md border p-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                />
              </div>

              <div className="flex space-x-4">
                <div className="mb-4 flex-1">
                  <label
                    htmlFor="price"
                    className="text-gray-700 block text-sm font-medium"
                  >
                    Preço:
                  </label>
                  <NumericFormat
                    thousandSeparator={true}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="price"
                    name="price"
                    className="border-gray-300 mt-1 w-full rounded-md border p-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4 flex-1">
                  <label
                    htmlFor="quantity"
                    className="text-gray-700 block text-sm font-medium"
                  >
                    Quantidade:
                  </label>
                  <NumericFormat
                    thousandSeparator={false}
                    decimalScale={0}
                    allowNegative={false}
                    id="quantity"
                    name="quantity"
                    className="border-gray-300 mt-1 w-full rounded-md border p-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="photo"
                  className="text-gray-700 block text-sm font-medium"
                >
                  Foto:
                </label>
                <input
                  type="file"
                  id="photo"
                  name="photo"
                  accept="image/*"
                  className="border-gray-300 mt-1 w-full rounded-md border p-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  ref={fileInputRef}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="currencies"
                  className="text-gray-700 block text-sm font-medium"
                >
                  Moedas:
                </label>
                <ReactSelect
                  id="currencies"
                  closeMenuOnSelect={false}
                  isMulti
                  options={CURRENCY_LIST}
                  className="bg-transparent"
                  placeholder="Selecione as moedas"
                  onChange={(currencies) => {
                    setCurrencies([...currencies]);
                  }}
                />
              </div>

              <div className="flex items-center justify-end space-x-2">
                <Checkbox
                  id="add_to_shopify"
                  // onChange={() => storeIsAllocated(!storeIsAllocated)}
                  onCheckedChange={(checked) => setStoreIsAllocated(!!checked)}
                />
                <label
                  htmlFor="add_to_shopify"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Adicionar a uma loja shopify?
                </label>
              </div>

              {storeIsAllocated && (
                <div className="flex items-center justify-end py-2 ">
                  <Select onValueChange={(value) => setStoreId(Number(value))}>
                    <SelectTrigger className="w-full bg-white ring-0 hover:ring-0 hover:ring-offset-0 focus:ring-0 focus:ring-offset-0 ">
                      <SelectValue placeholder="Selecione uma loja" />
                    </SelectTrigger>
                    <SelectContent className="bg-boxdark">
                      {stores?.map((store) => (
                        <SelectItem
                          value={store.id.toString()}
                          className="text-white"
                          key={store.id}
                        >
                          {store.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="flex justify-end py-2">
                <button
                  type="submit"
                  className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none"
                >
                  Criar
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </DefaultLayout>
  );
};

export default Products;
