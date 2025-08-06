import axiosInstance from "./AxiosInstance";

const categoryApi = {
    getAll: async () => {
        return await axiosInstance.get("/products/categories");
    }
};

export default categoryApi;
