"use client";
import React, { useEffect, useState } from "react";
import ChartThree from "../../components/Charts/ChartThree";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ChartTwo from "@/components/Charts/ChartTwo";
import { Card } from "primereact/card";
import { SoldProducts } from "./dashboard";
import CardDataStats from "@/components/CardDataStats";
import ECommerce from "@/components/Dashboard/E-commerce";

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
     <ECommerce/>
    </DefaultLayout>
  );
};

export default Dashboard;
