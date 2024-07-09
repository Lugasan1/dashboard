import axios from "axios";
import { Charge } from "./types";

interface chargesResponse {
  isOk: boolean;
  data: Charge[];
}

export const Charges = async (): Promise<chargesResponse> => {
  try {
    const response = await axios.get<{ result: Charge[] }>(
      `${process.env.NEXT_PUBLIC_API_URL}/stripe/charges`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("@NativePay:token")}`,
        },
      },
    );

    if (response.status >= 200 && response.status < 400) {
      return { isOk: true, data: response.data.result };
    } else {
      return { isOk: false, data: response.data.result };
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { isOk: false, data: error.response?.data || error.message };
    }
    return { isOk: false, data: [] };
  }
};
