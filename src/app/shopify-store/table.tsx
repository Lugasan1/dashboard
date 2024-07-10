"use client";
import { useEffect, useState } from "react";
import { PaginateStore } from "./paginate-store";
import { Store } from "./types";

const Table = ({ fetchData }: { fetchData: boolean }) => {
  const [stores, setStores] = useState<Store[]>([]);

  const GetStores = async () => {
    const response = await PaginateStore();
    if (response.isOk) {
      console.log(response.data);
      setStores(response.data);
    }
  };

  useEffect(() => {
    GetStores();
  }, [fetchData]);

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="px-4 py-6 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Lojas cadastradas
        </h4>
      </div>

      <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-3 flex items-center">
          <p className="font-medium">Nome</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">Host</p>
        </div>
      </div>

      {stores?.map((store) => (
        <div
          className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={store.id}
        >
          <div className="col-span-3 hidden items-center sm:flex">
            <p className="text-sm text-black dark:text-white">{store.name}</p>
          </div>
          <div className="col-span-3 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                className="cursor-pointer underline"
                href={`${process.env.NEXT_PUBLIC_API_URL}/auth/shopify?shop=${store.hostname}`}
                // target="_blank"
              >
                <p className="text-sm text-black dark:text-white">
                  {store.hostname}
                </p>
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Table;
