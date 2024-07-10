import axios from "axios";

interface CreateStoreResponse {
  isOk: boolean;
  data?: Payload;
  message?: Record<string, string | unknown>;
}

type Payload = {
  name: string;
  hostname: string;
};

export const CreateStore = async (
  payload: Payload,
): Promise<CreateStoreResponse> => {
  try {
    const token = localStorage.getItem("@NativePay:Token");

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/store/shopify`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
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
