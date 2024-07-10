import axios from "axios";

export const SoldProducts = async (limit: string) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/soldProducts`,
      {
        limit,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("@NativePay:Token")}`,
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
    return { isOk: false, message: [] };
  }
};
