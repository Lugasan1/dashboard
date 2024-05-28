"use client"
import React, { useState } from "react";
import ChartOne from "../../components/Charts/ChartOne";
import ChartThree from "../../components/Charts/ChartThree";
import Sidebar from "@/components/Sidebar";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const Dashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (

<DefaultLayout>
      {/* Conteúdo do Dashboard */}
      <div className=" grid-cols-content gap-4 md:gap-6 2xl:gap-7.5 mt-4 md:mt-6 2xl:mt-7.5">
        <ChartOne />
        {/*<ChartThree  />*/}
      </div>
      </DefaultLayout>
  );
};

export default Dashboard;