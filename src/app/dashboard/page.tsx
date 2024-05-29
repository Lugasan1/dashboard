"use client";
import React, { useState } from "react";
import ChartOne from "../../components/Charts/ChartOne";
import ChartThree from "../../components/Charts/ChartThree";
import Sidebar from "@/components/Sidebar";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ChartTwo from "@/components/Charts/ChartTwo";
import { Card } from "primereact/card";

const Dashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <DefaultLayout>
      <div className=" grid-cols-content mt-4 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="flex justify-evenly">
          <div className="mr-2">
            <Card title="Total em vendas">
              <p className="m-0">
                $20.00
              </p>
            </Card>
          </div>
          <div>
            <Card title="Pedidos Pagos">
              <p className="m-0">
               20
              </p>
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
