import axios from "axios";

interface AccountProductsResponse {
  isOk: boolean;
  message: {
    available: {
      amount: number;
      currency: string;
      source_types: {
        card: number;
      };
    };
  };
}

export const AccountBank = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/account`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("@NativePay:token")}`,
        },
      },
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
    return { isOk: false, message: "An unexpected error occurred" };
  }
};
