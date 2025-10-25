import axiosInstance from "./AxiosInstance";

const categoryApi = {
   getAll: async () => {
      return await axiosInstance.get("/products/categories");
   },
   getAllSizes: async () => {
      return await axiosInstance.get("/products/sizes");
   },
};

export default categoryApi;
