import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import { Products, Refund } from "./charts";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const initialOptions: ApexOptions = {
  legend: {
    show: true,
    position: "top",
    horizontalAlign: "center",
  },
  colors: ["#3C50E0", "#80CAEE"],
  chart: {
    fontFamily: "Satoshi, sans-serif",
    height: 335,
    type: "pie",
  },
  labels: ["Produtos", "Reembolsos"], // Two categories
  responsive: [
    {
      breakpoint: 1024,
      options: {
        chart: {
          height: 300,
        },
      },
    },
    {
      breakpoint: 1366,
      options: {
        chart: {
          height: 350,
        },
      },
    },
  ],
};

interface ChartOneState {
  series: number[];
  labels: string[];
}

interface RefundData {
  amount: number;
}

interface RefundResponse {
  count: number;
  data: RefundData[];
  has_more: boolean;
  object: string;
  url: string;
}

interface ProductDataReq {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  link: string;
  createdAt: string;
}

interface ApiResponse<T> {
  isOk: boolean;
  message: T;
}

const ChartOne: React.FC = () => {
  const [state, setState] = useState<ChartOneState>({
    series: [0, 0], // Initialize with two categories
    labels: ["Produtos", "Reembolsos"],
  });

  const [options, setOptions] = useState<ApexOptions>(initialOptions);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalRefunds, setTotalRefunds] = useState(0);

  const GetProducts = async () => {
    const response: ApiResponse<ProductDataReq[]> = await Products();
    if (response.isOk) {
      const productData = response.message;
      console.log("product", productData);
      
      const prices = productData.map((product) => Number(product.price));
      let totalProductAmount = prices.reduce((acc, price) => acc + price, 0);
      totalProductAmount = totalProductAmount / 100; 
      let convertedAmount = totalProductAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })

      setTotalProducts(prices.length);
      //console.log("totalProductAmount", totalProductAmount.toLocaleString("en-US", { minimumFractionDigits: 2 }));

      setState((prevState) => ({
        ...prevState,
        series: [totalProductAmount, prevState.series[1]], 
      }));
    }
  };

  const GetRefund = async () => {
    const response = await Refund("100");
    if (response.isOk) {
      const refundData = response.message;
      if (refundData.refunds.count !== 0) {
        const refundAmounts = refundData.refunds.data.map((refund: { amount: number; }) => refund.amount);
        let totalRefundAmount = refundAmounts.reduce((acc: any, amount: any) => acc + amount, 0);
        totalRefundAmount = totalRefundAmount / 100; 
        
        setTotalRefunds(refundAmounts.length);
        console.log("totalRefundAmount", totalRefundAmount.toLocaleString("en-US", { minimumFractionDigits: 2 }));

        setState((prevState) => ({
          ...prevState,
          series: [prevState.series[0], totalRefundAmount], 
        }));
      }
    }
  };

  useEffect(() => {
    GetRefund();
    GetProducts();
  }, []);

  useEffect(() => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      labels: state.labels,
    }));
  }, [state.labels]);

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-47.5">
            <span className="mr-2 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-primary">Total Produtos</p>
              <p className="text-sm font-medium">{totalProducts}</p>
            </div>
          </div>
          <div className="flex min-w-47.5">
            <span className="mr-2 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-secondary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-secondary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-secondary">Total Reembolsos</p>
              <p className="text-sm font-medium">{totalRefunds}</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={options}
            series={state.series}
            type="pie"
            height={350}
            width={"100%"}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartOne;
