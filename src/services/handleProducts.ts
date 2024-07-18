import axios from "axios";

const instance = axios.create({ baseURL: process.env.API_PATH });

export const getProductsCount = async () => {
  try {
    const response = await instance.get("/api/products/count");
    return response?.data?.total_counts;
  } catch (e) {
    console.error(e);
  }
};

export const handleProductsRename = async () => {
  try {
    const response = await instance.get("/api/products/update-handle");
    return response?.data?.renamed_counts;
  } catch (e) {
    console.error(e);
  }
};
