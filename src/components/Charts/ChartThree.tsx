import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface ChartThreeState {
  series: {
    name: string;
    data: number[];
  }[];
}

const initialOptions: ApexOptions = {
  chart: {
    fontFamily: "Satoshi, sans-serif",
    type: "line",
    zoom: {
      enabled: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "straight",
  },
  colors: ["#3C50E0"],
  legend: {
    show: false,
    position: "bottom",
  },
  title: {
    text: "",
    align: "left",
  },
  grid: {
    row: {
      colors: ["#f3f3f3", "transparent"],
      opacity: 0.5,
    },
  },
  xaxis: {
    categories: ["Total"],
  },
  responsive: [
    {
      breakpoint: 2600,
      options: {
        chart: {
          width: 380,
        },
      },
    },
    {
      options: {
        chart: {
          width: 200,
          height: 200,
        },
      },
    },
  ],
};

const ChartThree: React.FC = () => {
  const [state, setState] = useState<ChartThreeState>({
    series: [
      {
        name: "Produtos Vendidos",
        data: [],
      },
    ],
  });

  const GetSoldProducts = async () => {
    // try {
    //   const response = await SoldProducts("100");
    //   if (response.isOk) {
    //     const soldProducts = response.message.soldProducts;
    //     if (soldProducts && Array.isArray(soldProducts.data)) {
    //       let soldData = soldProducts.data.length;
    //       console.log("soldData:", soldData);
    //       let ordenedArray = [];
    //       while (soldData >= 0) {
    //         ordenedArray.push(soldData);
    //         soldData -= 5; // Decrementa o número por 5 em cada iteração
    //       }
    //       setState({
    //         series: [
    //           {
    //             name: "Produtos Vendidos",
    //             data: ordenedArray.reverse(),
    //           },
    //         ],
    //       });
    //     } else {
    //       console.error("Invalid sold products data format:", soldProducts);
    //     }
    //   } else {
    //     console.error("Failed to fetch sold products data.");
    //   }
    // } catch (error) {
    //   console.error("Error fetching sold products data:", error);
    // }
  };

  useEffect(() => {
    GetSoldProducts();
  }, []);

  const chartOptions = {
    ...initialOptions,
    xaxis: {
      ...initialOptions.xaxis,
    },
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white">
            Produtos Vendidos
          </h5>
        </div>
        <div>
          <div className="relative z-20 inline-block">
            <span className="absolute right-3 top-1/2 z-10 -translate-y-1/2">
              <svg
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.47072 1.08816C0.47072 1.02932 0.500141 0.955772 0.54427 0.911642C0.647241 0.808672 0.809051 0.808672 0.912022 0.896932L4.85431 4.60386C4.92785 4.67741 5.06025 4.67741 5.14851 4.60386L9.09079 0.896932C9.19376 0.793962 9.35557 0.808672 9.45854 0.911642C9.56151 1.01461 9.5468 1.17642 9.44383 1.27939L5.50155 4.98632C5.22206 5.23639 4.78076 5.23639 4.51598 4.98632L0.558981 1.27939C0.50014 1.22055 0.47072 1.16171 0.47072 1.08816Z"
                  fill="#637381"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M1.22659 0.546578L5.00141 4.09604L8.76422 0.557869C9.08459 0.244537 9.54201 0.329403 9.79139 0.578788C10.112 0.899434 10.0277 1.36122 9.77668 1.61224L9.76644 1.62248L5.81552 5.33722C5.36257 5.74249 4.6445 5.7544 4.19352 5.32924C4.19327 5.32901 4.19377 5.32948 4.19352 5.32924L0.225953 1.61241C0.102762 1.48922 -4.20186e-08 1.31674 -3.20269e-08 1.08816C-2.40601e-08 0.905899 0.0780105 0.712197 0.211421 0.578787C0.494701 0.295506 0.935574 0.297138 1.21836 0.539529L1.22659 0.546578ZM4.51598 4.98632C4.78076 5.23639 5.22206 5.23639 5.50155 4.98632L9.44383 1.27939C9.5468 1.17642 9.56151 1.01461 9.45854 0.911642C9.35557 0.808672 9.19376 0.793962 9.09079 0.896932L5.14851 4.60386C5.06025 4.67741 4.92785 4.67741 4.85431 4.60386L0.912022 0.896932C0.809051 0.808672 0.647241 0.808672 0.54427 0.911642C0.500141 0.955772 0.47072 1.02932 0.47072 1.08816C0.47072 1.16171 0.50014 1.22055 0.558981 1.27939L4.51598 4.98632Z"
                  fill="#637381"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>

      <div className="mb-2">
        <div id="chartThree" className="mx-auto flex justify-center">
          <ReactApexChart
            options={chartOptions}
            series={state.series}
            type="line"
          />
        </div>
      </div>
    </div>
  );
};

export default ChartThree;
