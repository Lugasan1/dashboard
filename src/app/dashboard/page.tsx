"use client";
import React, { useEffect, useState } from "react";
import ChartOne from "../../components/Charts/ChartOne";
import ChartThree from "../../components/Charts/ChartThree";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ChartTwo from "@/components/Charts/ChartTwo";
import { Card } from "primereact/card";
import { SoldProducts } from "./dashboard";

interface SoldProducts {
  amount: string;
}

const Dashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [totalProductSold, setTotalProductSold] = useState(0);
  const [totalProductSoldPrice, setTotalProductSoldPrice] = useState("");

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const GetSoldProducts = async () => {
    try {
      const response = await SoldProducts("100");
      if (response.isOk) {
        const soldProducts = response.message.soldProducts;

        let arrayPrice: number[] = [];
        soldProducts.data.forEach((element: SoldProducts) => {
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
      <div className=" grid-cols-content mt-4 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="flex justify-evenly">
          <div className="mr-2">
            <Card title="Total em vendas">
              <p className="m-0">${totalProductSoldPrice}</p>
            </Card>
          </div>
          <div>
            <Card title="Pedidos Pagos">
              <p className="m-0">{totalProductSold}</p>
            </Card>
          </div>
          {/* <div>
            <Card title="Simple Card">
              <p className="m-0">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Inventore sed consequuntur error repudiandae numquam deserunt
                quisquam repellat libero asperiores earum nam nobis, culpa
                ratione quam perferendis esse, cupiditate neque quas!
              </p>
            </Card>
  </div>*/}
        </div>
        <div className="mt-5">
          <ChartOne />
        </div>

        <div className="mt-5">
          <ChartTwo />
        </div>

        <div className="mt-5">
          <ChartThree />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Dashboard;
