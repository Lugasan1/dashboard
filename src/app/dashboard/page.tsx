import React, { useEffect, useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ECommerce from "@/components/Dashboard/E-commerce";

const Dashboard: React.FC = () => {
 
  return (
    <DefaultLayout>
     <ECommerce/>
    </DefaultLayout>
  );
};

export default Dashboard;
