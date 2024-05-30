"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Contact, CreditCard } from "lucide-react";


const FormLayout = () => {
  const searchParams = useSearchParams();
  const productName = searchParams.get("productName");
  const price = searchParams.get("price");
  const image = searchParams.get("image");
  const quantity = searchParams.get("productQuantity");
  const ImageProduct = image ? image : "";

  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    if (price && quantity) {
      const totalPrice = parseFloat(price) * parseInt(quantity, 10);
      setTotal(totalPrice);
    }
  }, [price, quantity]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${process.env.NEXT_PUBLIC_DOMAIN}/forms/completion`,
      },
    });

    if (error) {
      setMessage(error.message || "An unexpected error occurred.");
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsProcessing(false);
  };

  return (
    <>
    <div className="w-full bg-slate-100">
      <div className="flex flex-col gap-9 p-8 w-full justify-center items-center">
      <div className="rounded-sm border border-stroke w-1/2 bg-white shadow-default">
          <div className="flex w-full flex-row p-4">
            <div className="flex h-20 w-20 flex-row">
              <Image className="rounded-full" src={ImageProduct} width={80} height={80} alt="" />
            </div>
            <div className="flex flex-col">
              <div className=" flex flex-col ml-5 w-full">
                <label
                  htmlFor=""
                  className="text-lg font-medium text-slate-800"
                >
                 VOCÊ ESTÁ ADQUIRINDO
                </label>
                <label
                  htmlFor=""
                  className="text-lg font-black text-slate-800"
                >
                  {productName ? productName.toString() : ""}
                </label>
              </div>
              <div className="ml-5 flex w-full flex-row items-center gap-3">
                <label htmlFor="" className="text-md font-bold text-slate-800">
                  X{" "}
                  {price
                    ? `R$ ${(parseFloat(price) / 100).toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}`
                    : ""}
                </label>
              </div>
            </div>
          </div>
          
      
        </div>
        <div className="flex flex-col w-1/2 gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <div className="flex flex-row items-center gap-4">
                <span className="border-2 border-blue-600 text-blue-600 font-bold px-3 py-1 rounded-full">2</span>
                <Contact className="text-blue-600 text-lg" />
                <h3 className="font-bold text-lg text-blue-600 ">
                ENDEREÇO
              </h3>
              </div>
            </div>
            <form action="#">
              <div className="p-6.5">
                <AddressElement options={{ mode: "shipping" }} />
              </div>
            </form>
          </div>
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <div className="flex flex-row items-center gap-4">
                <span className="border-2 border-blue-600 text-blue-600 font-bold px-3 py-1 rounded-full">3</span>
                <CreditCard className="text-blue-600 text-lg" />
                <h3 className="font-bold text-lg text-blue-600 ">
                FORMA DE PAGAMENTO
              </h3>
              </div>
            </div>
            <div className="p-5">
              <PaymentElement />
            </div>
          </div>
        </div>
        <div className="w-1/2">
          <div className="mx-6 border-t border-stroke py-4 dark:border-strokedark">
            <div className="mb-6 flex flex-row justify-between">
              <label className="font-medium text-lg text-black">
                Subtotal
              </label>
              <label className="font-bold text-xl text-black">
                {`R$ ${(total / 100).toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}`}
              </label>
            </div>
            <div className="mb-6 flex flex-row justify-between">
            <label className="font-medium text-lg text-black">
            Quantidade
              </label>
              <label className="font-bold text-lg text-black">
              {quantity}
              </label>
            </div>
          </div>
          <div className="mx-6 py-4">
            <div className="mb-6 flex flex-row justify-between">
              <label className="font-medium text-black dark:text-white">
                Total
              </label>
              <label className="font-bold text-black dark:text-white">
                {`R$ ${(total / 100).toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}`}
              </label>
            </div>
            <button
              onClick={handleSubmit}
              className="flex w-full justify-center rounded bg-green-600 p-3 font-bold text-gray hover:bg-opacity-90"
              disabled={isProcessing || !stripe || !elements}
              id="submit"
            >
              <span id="button-text">
                {isProcessing ? "Processing ... " : "Pay now"}
              </span>
            </button>
            {message && <div id="payment-message">{message}</div>}
          </div>
        </div>
        
      </div>
    </div>
    </>
  );
};

export default FormLayout;
