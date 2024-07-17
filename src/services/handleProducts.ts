import axios from "axios";

export const getProductsCount = async () => {
  try {
    const response = await axios.get(
      "http://127.0.0.1:3000/api/products/count"
    );
    return response?.data?.total_counts;
  } catch (e) {
    console.error(e);
  }
};

export const handleProductsRename = async () => {
  try {
    const response = await axios.get("/api/products/update-handle");
    return response?.data?.renamed_counts;
  } catch (e) {
    console.error(e);
  }
};
