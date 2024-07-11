"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import { ConfigureCredential } from "./configure-credential";
import { ShowCredential } from "./show-credential";
import { Credential } from "./types";

const Products: React.FC = () => {
  const [credential, setCredential] = React.useState<Partial<Credential>>({});

  const getCredential = useCallback(async function () {
    const response = await ShowCredential();

    if (!response.isOk) {
      toast.error("Houve um erro ao buscar as credenciais");
      return;
    }

    setCredential((state) => ({
      ...state,
      client_id: response.data.client_id,
      secret_key: response.data.secret_key,
    }));
  }, []);

  const PayloadMap = {
    client_id: "Client ID",
    secret_key: "Chave Secreta",
  };

  async function handleCreateCredential(
    event: React.FormEvent<HTMLFormElement>,
  ) {
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

    const response = await ConfigureCredential({
      client_id: data["client_id"] as string,
      secret_key: data["secret_key"] as string,
    });

    if (!response.isOk) {
      toast.error("Houve um erro ao criar a credencial.");
      return;
    }
    toast.success("Credencial configurada com sucesso.");
  }

  useEffect(
    function () {
      getCredential();
    },
    [getCredential],
  );

  return (
    <DefaultLayout>
      <div className="container flex h-full flex-1 flex-col gap-4">
        <h1 className="text-2xl font-semibold">Credencial Shopify</h1>
        <section className=" flex h-full w-full flex-1 items-center justify-center">
          <div className="border-stroke shadow-default dark:border-strokedark dark:bg-boxdark mt-5 w-full max-w-[720px] rounded-sm border bg-white p-4">
            <form onSubmit={handleCreateCredential}>
              <div className="mb-4">
                <label
                  htmlFor="client_id"
                  className="block text-sm font-medium text-gray-700"
                >
                  Client ID:
                </label>
                <input
                  type="text"
                  id="client_id"
                  name="client_id"
                  defaultValue={credential.client_id || ""}
                  className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="secret_key"
                  className="block text-sm font-medium text-gray-700"
                >
                  Chave Secreta:
                </label>
                <input
                  defaultValue={credential.secret_key || ""}
                  type="text"
                  id="secret_key"
                  name="secret_key"
                  className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end">
                {!credential.client_id && !credential.secret_key && (
                  <button
                    type="submit"
                    className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none"
                  >
                    Configurar
                  </button>
                )}
                {credential.client_id && credential.secret_key && (
                  <button
                    type="submit"
                    className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none"
                  >
                    Atualizar
                  </button>
                )}
              </div>
            </form>
          </div>
        </section>
      </div>
    </DefaultLayout>
  );
};

export default Products;
