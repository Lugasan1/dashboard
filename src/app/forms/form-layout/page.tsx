"use client";
import Image from "next/image";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

const FormLayout = () => {
  const searchParams = useSearchParams();
  const productName = searchParams.get("productName");
  const price = searchParams.get("price");
  const image = searchParams.get("image");
  const ImageProduct = image ? image : "";
 /* const [selectedOption, setSelectedOption] = useState<string>("");
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);*/

  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false);

  /*const changeTextColor = () => {
    setIsOptionSelected(true);
  };*/

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${process.env.NEXT_PUBLIC_DOMAIN}/completion`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message || null);
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsProcessing(false);
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-9 bg-blue-100 p-8 sm:grid-cols-2">
   
        
        <div className="flex flex-col gap-9">
          {/* Contact Form 
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Contact
              </h3>
            </div>
            <form action="#">
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Email <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>
            </form>
          </div>*/}

          {/* Address Form */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Address
              </h3>
            </div>
            <form action="#">
              <div className="p-6.5">
                <AddressElement options={{ mode: 'shipping'}} />
                {/*<div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Name Complete
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
  </div>*/}

                {/*<div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Land / Region <span className="text-meta-1">*</span>
                  </label>
                  <select
                    value={selectedOption}
                    onChange={(e) => {
                      setSelectedOption(e.target.value);
                      changeTextColor();
                    }}
                    className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                      isOptionSelected ? "text-black dark:text-white" : ""
                    }`}
                  >
                    <option
                      value=""
                      disabled
                      className="text-body dark:text-bodydark"
                    >
                      Select your subject
                    </option>
                    <option
                      value="USA"
                      className="text-body dark:text-bodydark"
                    >
                      USA
                    </option>
                    <option
                      value="Canada"
                      className="text-body dark:text-bodydark"
                    >
                      Canada
                    </option>
                  </select>
                  </div>*/}

                {/*<div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Address Complete
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your address"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>*/}

                {/*<div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      State
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your state"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
              </div>*/}

               {/* <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Postal code
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your postal code"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
            </div>*/}

                {/*<div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Federal State
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your federal state"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
          </div>*/}
              </div>
            </form>
          </div>

          {/* Delivery Method Form */}
         {/* <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Delivery Method
              </h3>
            </div>
            <form action="#">
              <div className="p-6.5">
                <div className="mb-4.5 flex items-center rounded-md border-[0.5px] border-slate-200 px-5 py-3">
                  <input
                    type="radio"
                    id="deliveryMethod1"
                    name="deliveryMethod"
                    value="method1"
                    className="mr-2 cursor-pointer"
                  />
                  <div className="flex w-full items-center justify-between">
                    <label
                      htmlFor="deliveryMethod1"
                      className="text-black dark:text-white"
                    >
                      Delivery Method 1
                    </label>
                    <label className="rounded-full bg-green-300 px-4 py-2 align-baseline text-xs text-green-700">
                      recommended
                    </label>
                  </div>
                </div>
                <div className="mb-4.5 flex items-center rounded-md border-[0.5px] border-slate-200 px-5 py-3">
                  <input
                    type="radio"
                    id="deliveryMethod2"
                    name="deliveryMethod"
                    value="method2"
                    className="mr-2 cursor-pointer"
                  />
                  <div className="flex w-full items-center justify-between">
                    <label
                      htmlFor="deliveryMethod2"
                      className="text-black dark:text-white"
                    >
                      Delivery Method 2
                    </label>
                    <label className="rounded-full bg-green-300 px-4 py-2 align-baseline text-xs text-green-700">
                      fastest
                    </label>
                  </div>
                </div>
              </div>
            </form>
        </div>*/}

          {/* Payment Method Form */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Payment Method
              </h3>
            </div>

<div className="p-5">
<PaymentElement/>
</div>
          
            {/*<form action="#">
              <div className="p-6.5">
                <div className="mb-4.5 flex items-center rounded-md border-[0.5px] border-slate-200 px-5 py-3">
                  <input
                    type="radio"
                    id="paymentMethod1"
                    name="paymentMethod"
                    value="method1"
                    className="mr-2 cursor-pointer"
                  />
                  <label
                    htmlFor="paymentMethod1"
                    className="text-black dark:text-white"
                  >
                    Payment Method 1
                  </label>
                </div>
                <div className="mb-4.5 flex items-center rounded-md border-[0.5px] border-slate-200 px-5 py-3">
                  <input
                    type="radio"
                    id="paymentMethod2"
                    name="paymentMethod"
                    value="method2"
                    className="mr-2 cursor-pointer"
                  />
                  <label
                    htmlFor="paymentMethod2"
                    className="text-black dark:text-white"
                  >
                    Payment Method 2
                  </label>
                </div>
              </div>
            </form>*/}
          </div>
        </div>

        {/* Order Overview */}
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Order overview
            </h3>
          </div>
          <div className="flex w-full flex-row p-4">
            <div className="flex h-20 w-20 flex-row border border-stroke">
              <Image src={ImageProduct} width={80} height={80} alt="" />
            </div>
            <div className="flex flex-col">
              <div className="ml-5 w-full">
                <label
                  htmlFor=""
                  className="text-md font-medium text-slate-800"
                >
                  {productName ? productName.toString() : ""}
                </label>
              </div>
              <div className="ml-5 mt-5 flex w-full flex-row items-center gap-3">
                <label htmlFor="" className="text-md font-bold text-slate-800">
                {productName ? productName.toString() : ""}
                </label>

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
          <div className="mx-6 border-t border-stroke py-4 dark:border-strokedark">
            <div className="mb-6 flex flex-row justify-between">
              <label className="font-medium text-black dark:text-white">
                Subtotal
              </label>
              <label className="font-bold text-black dark:text-white">
                {price
                  ? `$ ${(parseFloat(price) / 100).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}`
                  : ""}
              </label>
            </div>
            {/*<div className="flex flex-row justify-between">
              <label className="font-medium text-black dark:text-white">
                Shipment
                  </label>
              <label className="font-bold text-black dark:text-white">
                Delivery Method 1
              </label>
                  </div>*/}
          </div>
          <div className="mx-6 border-t border-stroke py-4 dark:border-strokedark">
            <div className="mb-6 flex flex-row justify-between">
              <label className="font-medium text-black dark:text-white">
                Total
              </label>
              <label className="font-bold text-black dark:text-white">
                {price
                  ? `$ ${(parseFloat(price) / 100).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}`
                  : ""}
              </label>
            </div>
            <button onClick={handleSubmit}  className="flex w-full justify-center rounded bg-green-600 p-3 font-bold text-gray hover:bg-opacity-90" disabled={isProcessing || !stripe || !elements} id="submit">
        <span id="button-text">
          {isProcessing ? "Processing ... " : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
           
          </div>
          
        </div>
      </div>
    </>
  );
};

export default FormLayout;
