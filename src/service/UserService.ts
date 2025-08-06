import { SignUpType } from "@/types/user.type";
import axiosInstance from "./AxiosInstance";
import { FormFields } from "@/components/form/SignUp";
import { register } from "module";
import { VerifyDTO } from "@/types/dto/user/verify.types";
import { CreateUserDTO } from "@/types/dto/user/create.types";
import { ref } from "process";

const userApi = {
   signIn: (data: { email: string; password: string }) =>
      axiosInstance.post("/users/login", data),
   signUp: (data: FormFields) => axiosInstance.post("/users", data),
   getProfile: () => axiosInstance.get("/users/profile"),
   register: (data: CreateUserDTO) => axiosInstance.post("/users", data),
   verify: (data: VerifyDTO) => axiosInstance.post("/users/verify", data),
   refreshToken: (data: { refreshToken: string }) =>
      axiosInstance.post("/users/refresh", data),
};

export default userApi;
