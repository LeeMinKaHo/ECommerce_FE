import axiosInstance from "./AxiosInstance";

const uploadApi = {
  upload: (formData : any) => {
    return axiosInstance.post("/api/upload/image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

export default uploadApi;
