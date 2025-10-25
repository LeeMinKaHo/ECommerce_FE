import {  ApiResponse, Pagination } from "@/types/share.type";
import axiosInstance from "./AxiosInstance";
import { Product, ProductDetailPage, ProductFillter } from "@/types/product";
import { get } from "http";
import { CreateProductDTO } from "@/types/dto/create-product.types";
import { ProductFormData } from "@/pages/AddProductPage";

const productApi = {
   getAll: (fillter : ProductFillter) =>
    axiosInstance.get("products", { params: fillter }),
   getById: (id: string) => axiosInstance.get<ApiResponse<ProductDetailPage>>(`products/${id}`),
   create : async (data :  ProductFormData) => axiosInstance.post("products" , data)
};

export default productApi;
