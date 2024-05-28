import axios from "axios";

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

interface ApiResponse<T> {
  isOk: boolean;
  message: T;
}


interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  link: string;
  createdAt: string;
}

interface ProductsResponse {
  isOk: boolean;
  message: Product[];
}

  export const Refund = async (limit: string) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/refunds`,
      {
        limit
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("@NativePay:Token")}`
        },
      }
    );

    if (response.status >= 200 && response.status < 400) {
      return { isOk: true, message: response.data };
    } else {
      return { isOk: false, message: response.data };
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { isOk: false, message: error.response?.data || error.message };
    }
    return { isOk: false, message: { message: error } };
  }
};



  export const Products = async (
  ): Promise<ProductsResponse> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/products`,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("@NativePay:token")}`
        },
      }
    );

    if (response.status >= 200 && response.status < 400) {
      return { isOk: true, message: response.data };
    } else {
      return { isOk: false, message: response.data };
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { isOk: false, message: error.response?.data || error.message };
    }
    return { isOk: false, message: [] };
  }
};
