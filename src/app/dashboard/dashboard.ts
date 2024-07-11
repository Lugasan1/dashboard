import axios from "axios";
import { Dashboard } from "./types";

type DashboardResponse = {
  isOk: boolean;
  data?: Dashboard;
};
export const DashboardData = async (
  limit: string,
): Promise<DashboardResponse> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/dashboard`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("@NativePay:Token")}`,
        },
      },
    );

    console.log(response.data);

    if (response.status >= 200 && response.status < 400) {
      return { isOk: true, data: response.data };
    } else {
      return { isOk: false, data: response.data };
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { isOk: false, data: error.response?.data || error.message };
    }
    return { isOk: false };
  }
};
