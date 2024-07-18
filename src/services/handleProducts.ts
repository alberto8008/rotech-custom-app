import axios, { AxiosInstance, AxiosResponse } from "axios";

const instance: AxiosInstance = axios.create({ baseURL: process.env.API_PATH });

interface ProductsCountResponse {
  total_counts: number;
}

interface RenameResponse {
  renamed_counts: number;
}

export const getProductsCount = async (): Promise<number | undefined> => {
  try {
    const response: AxiosResponse<ProductsCountResponse> = await instance.get(
      "/api/products/count"
    );
    return response?.data?.total_counts;
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

export const handleProductsRename = async (): Promise<number | undefined> => {
  try {
    const response: AxiosResponse<RenameResponse> = await instance.get(
      "/api/products/update-handle"
    );
    return response?.data?.renamed_counts;
  } catch (e) {
    console.error(e);
    return undefined;
  }
};
