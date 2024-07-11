"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Charges } from "./charges";
import { Charge } from "./types";

const Table = ({ fetchData }: { fetchData: boolean }) => {
  const [charges, setCharges] = useState<Charge[]>([]);

  const GetProducts = async () => {
    const response = await Charges();
    if (response.isOk) {
      setCharges(response.data);
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
          Cliente/Transações
        </h4>
      </div>

      <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        {/* <div className="col-span-2 flex items-center">
          <p className="font-medium">Produto</p>
        </div> */}
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Cliente</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Preço</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Status</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Data</p>
        </div>
      </div>

      {charges?.map((charge) => (
        <div
          className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={charge.id}
        >
          {/* <div className="col-span-2 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className="text-sm text-black dark:text-white">
                {charge.product_name}
              </p>
            </div>
          </div> */}

          <div className="col-span-2 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className="text-sm text-black dark:text-white">
                {charge.billing_name}
              </p>
            </div>
          </div>

          <div className="col-span-1 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className="text-sm text-black dark:text-white">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: charge.currency.toUpperCase(),
                }).format(charge.amount / 100)}
              </p>
            </div>
          </div>

          <div className="col-span-1 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className="text-sm text-black dark:text-white">
                {charge.status}
              </p>
            </div>
          </div>

          <div className="col-span-1 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className="text-sm text-black dark:text-white">
                {new Intl.DateTimeFormat("pt-BR").format(
                  new Date(charge.created_at),
                )}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Table;
