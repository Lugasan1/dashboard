import axios from "axios";
import { Product } from "../types";

interface Response {
  isOk: boolean;
  data?: Product;
  message?: Record<string, string | unknown>;
}
export const StripeCreateProduct = async (
  payload: FormData,
): Promise<Response> => {
  try {
    const token = localStorage.getItem("@NativePay:Token");

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/stripe/create-product`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (response.status >= 200 && response.status < 400) {
      return { isOk: true, data: response.data };
    } else {
      return { isOk: false, data: response.data };
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        isOk: false,
        data: error.response?.data || error.message,
      };
    }
    return {
      isOk: false,
      message: {
        message: error,
      },
    };
  }
};
