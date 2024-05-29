"use client";
import React, { useEffect, useState } from "react";
import ChartThree from "../../components/Charts/ChartThree";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ChartTwo from "@/components/Charts/ChartTwo";
import { Card } from "primereact/card";
import { SoldProducts } from "./dashboard";

interface SoldProduct {
  amount: string;
}

const Dashboard: React.FC = () => {
  const [totalProductSold, setTotalProductSold] = useState(0);
  const [totalProductSoldPrice, setTotalProductSoldPrice] = useState("");

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
          0,
        );

        let formattedTotalSum: string = (totalSum / 100).toLocaleString(
          "en-US",
          {
            minimumFractionDigits: 2,
          },
        );

        setTotalProductSoldPrice(formattedTotalSum);

        if (soldProducts && Array.isArray(soldProducts.data)) {
          const soldData = soldProducts.data.length;
          setTotalProductSold(soldData);
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
    <DefaultLayout>
      <div className="grid-cols-content mt-4 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="flex flex-wrap justify-center md:justify-evenly">
          <div className="mb-4 mr-2 md:mb-0">
            <Card title="Total em vendas">
              <p className="m-0">${totalProductSoldPrice}</p>
            </Card>
          </div>
          <div className="mb-4 md:mb-0">
            <Card title="Pedidos Pagos">
              <p className="m-0">{totalProductSold}</p>
            </Card>
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:justify-evenly">
          <div className="mt-5 md:mr-5">
            <ChartTwo />
          </div>
          <div className="mt-5 md:ml-5 md:hidden">
            <ChartThree />
          </div>
          <div className="mt-5 hidden md:block">
            <ChartThree />
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Dashboard;
