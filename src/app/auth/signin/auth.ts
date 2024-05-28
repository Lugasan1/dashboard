import axios from "axios";

interface LoginResponse {
    error: string;
    token: string;
    auth: boolean;
  }

interface PostLoginResponse {
  isOk: boolean;
  message: LoginResponse | string;
}



  export const PostLogin = async (email: string, password: string): Promise<PostLoginResponse> => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/login`,
      {
        email: email,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status >= 200 && response.status < 400) {
      return { isOk: true, message: response.data };
    } else {
      return { isOk: false, message: response.statusText };
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { isOk: false, message: error.response?.data || error.message };
    }
    return { isOk: false, message: "Unexpected error occurred" };
  }
};
