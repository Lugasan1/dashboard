import axios from "axios";

interface ProductResponse {
  isOk: boolean;
  message: object;
}

export const addProduct = async (
  name: string,
  description: string,
  price: string,
  quantity: string,
  image: File
): Promise<ProductResponse> => {
  try {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("priceProduct", price.replaceAll(",", ""));
    formData.append("quantity", quantity);
    formData.append("image", image);
    formData.append("currency", "brl");

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/new/product`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("@NativePay:Token")}`,
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
      return {
        isOk: false,
        message: error.response?.data || error.message,
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
