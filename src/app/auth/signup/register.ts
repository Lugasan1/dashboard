import axios from "axios";

interface RegisterResponse {
  error?: string;
  id: string;
  auth?: boolean;
  message?: string;
}

interface PostRegisterResponse {
  isOk: boolean;
  message: RegisterResponse;
}

export const PostRegister = async (
  name: string,
  email: string,
  password: string,
): Promise<PostRegisterResponse> => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/sign-up`,
      {
        name,
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
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
    return {
      isOk: false,
      message: {
        error: "error",
        id: "0",
      },
    };
  }
};
