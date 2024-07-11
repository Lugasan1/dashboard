import axios from "axios";

interface CreateCredentialTesponse {
  isOk: boolean;
  data?: Payload;
  message?: Record<string, string | unknown>;
}

type Payload = {
  secret_key: string;
  client_id: string;
};

export const ConfigureCredential = async (
  payload: Payload,
): Promise<CreateCredentialTesponse> => {
  try {
    const token = localStorage.getItem("@NativePay:Token");

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/shopify/credential`,
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
