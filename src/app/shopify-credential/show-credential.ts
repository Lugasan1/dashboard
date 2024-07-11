import axios from "axios";
import { Credential } from "./types";

interface CredentialResponse {
  isOk: boolean;
  data: Partial<Credential>;
}

export const ShowCredential = async (): Promise<CredentialResponse> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/shopify/credential`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("@NativePay:Token")}`,
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
      return { isOk: false, data: error.response?.data || error.message };
    }
    return { isOk: false, data: {} };
  }
};
