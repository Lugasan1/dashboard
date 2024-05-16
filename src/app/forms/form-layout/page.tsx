"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SelectGroupOne from "@/components/SelectGroup/SelectGroupOne";
import Link from "next/link";
import Image from "next/image"
import { useState } from "react";

const FormLayout = () => {

  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };
  return (
    
  <>
      

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 p-8 bg-blue-100">
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
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
          </div>
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Address
              </h3>
            </div>
            <form action="#">
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
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
                </div>

                <div className="mb-4.5">
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
          <option value="" disabled className="text-body dark:text-bodydark">
            Select your subject
          </option>
          <option value="USA" className="text-body dark:text-bodydark">
            USA
          </option>
          <option value="Canada" className="text-body dark:text-bodydark">
            Canada
          </option>
        </select>
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Address Complete
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your addresss"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
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
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
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
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
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
                </div>
              </div>
            </form>
          </div>
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">
          Delivery Method
        </h3>
      </div>
      <form action="#">
        <div className="p-6.5">
          {/* Radio buttons */}
          <div className="flex items-center mb-4.5 border-[0.5px] border-slate-200 rounded-md px-5 py-3">
            <input
              type="radio"
              id="deliveryMethod1"
              name="deliveryMethod"
              value="method1"
              className="mr-2 cursor-pointer"
            />
            <div className="flex justify-between w-full items-center">

            <label htmlFor="deliveryMethod1" className="text-black dark:text-white">
              Delivery Method 1
            </label>
            <label htmlFor="" className="bg-green-300 text-green-700 px-4 py-2 rounded-full text-xs align-baseline">
              recommended
            </label>
            </div>
          </div>
          <div className="flex items-center mb-4.5 border-[0.5px] border-slate-200 rounded-md px-5 py-3">
            <input
              type="radio"
              id="deliveryMethod1"
              name="deliveryMethod"
              value="method1"
              className="mr-2 cursor-pointer"
            />
            <div className="flex justify-between w-full items-center">

            <label htmlFor="deliveryMethod1" className="text-black dark:text-white">
              Delivery Method 2
            </label>
            <label htmlFor="" className=" text-slate-600 px-4 py-2 font-bold rounded-full text-md align-baseline">
              $ 4,00
            </label>
            </div>
          </div>
          {/* End of radio buttons */}
          
        </div>
      </form>
    </div>
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">
          Payment Method
        </h3>
      </div>
      <form action="#">
        <div className="p-6.5">
          {/* Radio buttons */}
          <div className="flex flex-col items-center mb-4.5 border-[0.5px] border-slate-200 rounded-md px-5 py-3">
            <div className="flex justify-between w-full items-center mb-24">
              <div className="">
            <input
              type="radio"
              id="deliveryMethod1"
              name="deliveryMethod"
              value="method1"
              className="mr-2 cursor-pointer"
            />
            <label htmlFor="deliveryMethod1" className="text-black dark:text-white font-bold">
              Credit Card
            </label>
              </div>
            <label htmlFor="" className="bg-green-300 text-green-700 px-4 py-2 rounded-full text-xs align-baseline">
              recommended
            </label>
            </div>
            <div className="flex flex-row w-full">
            <div className="mb-4.5 w-full">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Name Complete <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your Name in Credit Card"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
            </div>
            <div className="flex flex-row w-full">
            <div className="mb-4.5 w-full">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Number Card <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type=""
                    placeholder="0000 0000 0000 0000"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
            </div>
            <div className="flex flex-row w-full gap-5  ">
            <div className="mb-4.5 w-1/2">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Expiry Date <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type=""
                    placeholder="MM/YY"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="mb-4.5 w-1/2">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    CVV <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type=""
                    placeholder="000"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
            </div>
          </div>
          
          {/* End of radio buttons */}
          
        </div>
      </form>
    </div>
          
          
        </div>

        <div className="flex flex-col gap-9">
          {/* <!-- Sign In Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Order overview
              </h3>
            </div>
              <div className="flex flex-row p-4 w-full">
                <div className="flex flex-row w-20 h-20 border border-stroke">
                  <Image src="/images/logo/logo.png" width={80} height={80} alt=""/>
                </div>
                <div className="flex flex-col">
                  <div className="w-full ml-5">
                    <label htmlFor="" className="font-medium text-md text-slate-800">Native pay integration - gateway stripe - product test </label>
                  </div>
                  <div className="flex flex-row gap-3 w-full ml-5 mt-5 items-center">
                    <button className="bg-blue-600 px-2 font-extrabold text-slate-200 hover:opacity-85">-</button>
                    <label htmlFor="" className="font-bold text-md text-slate-800">3</label>
                    <button className="bg-blue-600 px-2 font-extrabold text-slate-200 hover:opacity-85">+</button>
                    <label htmlFor="" className="font-bold text-md text-slate-800">X $200,00</label>
                  </div>
                </div>
              </div>
              <div className="border-t mx-6 border-stroke py-4 dark:border-strokedark">
              <div className="flex flex-row justify-between mb-6">
              <label className="font-medium text-black dark:text-white">
                Subtotal
              </label>
              <label className="font-bold text-black dark:text-white">
                R$ 600,00
              </label>
              </div>
              <div className="flex flex-row justify-between">
              <label className="font-medium text-black dark:text-white">
                Shipment
              </label>
              <label className="font-bold text-black dark:text-white">
                Delivery Method 1
              </label>
              </div>
            </div>
            <div className="border-t mx-6 border-stroke py-4 dark:border-strokedark">
              <div className="flex flex-row justify-between mb-6">
              <label className="font-medium text-black dark:text-white">
                Total
              </label>
              <label className="font-bold text-black dark:text-white">
                R$ 600,00
              </label>
              </div>
            </div>
          </div>
         
          <button className="flex w-full justify-center rounded bg-green-600 p-3 font-bold text-gray hover:bg-opacity-90">
                  Buy now
                </button>
        </div>
      </div>
  </>
  );
};

export default FormLayout;
