import axios from "axios";
import axiosInstance from "./AxiosInstance";

const cartApi = {
   addToCart: (data :{productId : string , quantity : number , color : string , size : string}) =>axiosInstance.post("/carts" , data),
   getCart:() => axiosInstance.get("/carts"),
   removeItem: (id: string) => axiosInstance.delete(`/carts/${id}`),
};

export default cartApi;