import axios from "axios";

interface ProductsResponse {
  isOk: boolean;
  message: [];
}

export const Products = async (): Promise<ProductsResponse> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/product/paginate`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("@NativePay:token")}`,
        },
      },
    );

    console.log(response.data.data);

    if (response.status >= 200 && response.status < 400) {
      return { isOk: true, message: response.data.data };
    } else {
      return { isOk: false, message: response.data.data };
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { isOk: false, message: error.response?.data || error.message };
    }
    return { isOk: false, message: [] };
  }
};
