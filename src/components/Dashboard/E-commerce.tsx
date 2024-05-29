"use client";
import React, { useEffect, useState } from "react";
import ChartOne from "../Charts/ChartOne";
import ChartTwo from "../Charts/ChartTwo";
import CardDataStats from "../CardDataStats";
import CardDataStats2 from "../CardDataStats2";
import { SoldProducts } from "@/app/dashboard/dashboard";

interface SoldProduct {
  amount: string;
}

interface ChartOneState {
  series: {
    name: string;
    data: number[];
  }[];
}

const ECommerce: React.FC = () => {
  const [totalProductSold, setTotalProductSold] = useState(0);
  const [totalProductSoldPrice, setTotalProductSoldPrice] = useState("");
  const [chartState, setChartState] = useState<ChartOneState>({
    series: [
      {
        name: "Produtos Vendidos",
        data: [],
      },
    ],
  });

  const GetSoldProducts = async () => {
    try {
      const response = await SoldProducts("100");
      if (response.isOk) {
        const soldProducts = response.message.soldProducts;

        let arrayPrice: number[] = [];
        soldProducts.data.forEach((element: SoldProduct) => {
          arrayPrice.push(Number(element.amount));
        });

        let totalSum: number = arrayPrice.reduce(
          (acc, currentValue) => acc + currentValue,
          0
        );

        let formattedTotalSum: string = (totalSum / 100).toLocaleString(
          "en-US",
          {
            minimumFractionDigits: 2,
          }
        );

        setTotalProductSoldPrice(formattedTotalSum);

        if (soldProducts && Array.isArray(soldProducts.data)) {
          let soldData = soldProducts.data.length;
          let ordenedArray: number[] = [];

          while (soldData >= 0) {
            ordenedArray.push(soldData);
            soldData -= 5; // Decrementa o número por 5 em cada iteração
          }

          setChartState({
            series: [
              {
                name: "Produtos Vendidos",
                data: ordenedArray.reverse(),
              },
            ],
          });
          setTotalProductSold(soldProducts.data.length); // Use the correct length
        } else {
          console.error("Invalid sold products data format:", soldProducts);
        }
      } else {
        console.error("Failed to fetch sold products data.");
      }
    } catch (error) {
      console.error("Error fetching sold products data:", error);
    }
  };

  useEffect(() => {
    GetSoldProducts();
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
        <CardDataStats title="Total em vendas ($)" total={totalProductSoldPrice} rate="">
          <svg
            className="fill-primary dark:fill-white"
            width="22"
            height="16"
            viewBox="0 0 22 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 15.1156C4.19376 15.1156 0.825012 8.61876 0.687512 8.34376C0.584387 8.13751 0.584387 7.86251 0.687512 7.65626C0.825012 7.38126 4.19376 0.918762 11 0.918762C17.8063 0.918762 21.175 7.38126 21.3125 7.65626C21.4156 7.86251 21.4156 8.13751 21.3125 8.34376C21.175 8.61876 17.8063 15.1156 11 15.1156ZM2.26876 8.00001C3.02501 9.27189 5.98126 13.5688 11 13.5688C16.0188 13.5688 18.975 9.27189 19.7313 8.00001C18.975 6.72814 16.0188 2.43126 11 2.43126C5.98126 2.43126 3.02501 6.72814 2.26876 8.00001Z"
              fill=""
            />
            <path
              d="M11 10.9219C9.38438 10.9219 8.07812 9.61562 8.07812 8C8.07812 6.38438 9.38438 5.07812 11 5.07812C12.6156 5.07812 13.9219 6.38438 13.9219 8C13.9219 9.61562 12.6156 10.9219 11 10.9219ZM11 6.625C10.2437 6.625 9.625 7.24375 9.625 8C9.625 8.75625 10.2437 9.375 11 9.375C11.7563 9.375 12.375 8.75625 12.375 8C12.375 7.24375 11.7563 6.625 11 6.625Z"
              fill=""
            />
          </svg>
        </CardDataStats>

        <CardDataStats2 title="Total Product" total={totalProductSold} rate="">
          <svg
            className="fill-primary dark:fill-white"
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          ></svg>
        </CardDataStats2>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne state={chartState} />
        <ChartTwo />
      </div>
    </>
  );
};

export default ECommerce;
