import axios from "axios";
import { Store } from "./types";

interface StoreResponse {
  isOk: boolean;
  data: Store[];
}

export const PaginateStore = async (): Promise<StoreResponse> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/wrapper/paginate`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("@NativePay:token")}`,
        },
      },
    );

    console.log(response.data.data);

    if (response.status >= 200 && response.status < 400) {
      return { isOk: true, data: response.data.data };
    } else {
      return { isOk: false, data: response.data.data };
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { isOk: false, data: error.response?.data || error.message };
    }
    return { isOk: false, data: [] };
  }
};
