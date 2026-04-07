import React, { use, useEffect, useState } from "react";
import { FaRegUser, FaRegHeart } from "react-icons/fa";
import { TbInvoice } from "react-icons/tb";
import { z } from "zod";
import { validationMessages as msg } from "@/constant/Message";
import { resolve } from "path";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import userApi from "@/service/UserService";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
export type UpdateUserFormFields = z.infer<typeof schema>;
const schema = z.object({
   name: z.string().min(6, msg.password.min),
   address: z.string().min(6, msg.password.min),
});
export const AccountPage = () => {
   const {
      register,
      handleSubmit,
      reset,
      watch,
      setError,
      formState: { errors, isSubmitting },
   } = useForm<UpdateUserFormFields>({ resolver: zodResolver(schema) });
   const [initialData, setInitialData] = useState<UpdateUserFormFields>();
   useEffect(() => {
      // 🧠 Lấy thông tin user ban đầu
      //  fetch("/api/users/me")
      //    .then((res) => res.json())
      //    .then((data) => {
      //      setInitialData(data);
      //      reset(data); // Gán dữ liệu vào form
      //    });
      const data = {
         name: "John Doe",
         address: "123 Main St, Cityville",
      };
      reset(data);
      setInitialData(data);
   }, [reset]);
   const navigate = useNavigate();
   const onSubmit: SubmitHandler<UpdateUserFormFields> = async (
      data: UpdateUserFormFields
   ) => {
      try {
         console.log("Form data submitted:", data);
         if (!initialData) return;

         // 🧠 So sánh các field thay đổi
         const changedFields = Object.keys(data).reduce((acc, key) => {
            const typedKey = key as keyof UpdateUserFormFields;
            if (data[typedKey] !== initialData[typedKey]) {
               acc[typedKey] = data[typedKey];
            }
            return acc;
         }, {} as Partial<UpdateUserFormFields>); // ✅ Gán kiểu cho acc
         if (Object.keys(changedFields).length === 0) {
            alert("Không có gì thay đổi!");
            return;
         }

         // 🚀 Gửi chỉ field thay đổi
         const res = await userApi.updateProfile(changedFields);

         toast.success("Update successful!");
         console.log("Updated fields sent to server:", changedFields);
      } catch (error) {
         if (isAxiosError(error)) {
            // Ở đây chắc chắn là lỗi từ axios
            console.log("Axios error:", error.response?.data || error.message);
            setError("root", {
               type: "server",
               message: "Invalid email or password",
            });
         } else {
            // Lỗi khác
            console.log("Unexpected error:", error);
         }
      }
   };
   return (
      <div className="bg-gray-200 min-h-screen py-6">
         <div className="container mx-auto px-8 grid  grid-cols-12 gap-4">
            {/* Cột trái */}
            <div className="col-span-3 bg-white p-4 rounded-md">
               <ul className="space-y-2">
                  <li className="flex gap-3 items-center">
                     <FaRegUser /> My Account
                  </li>
                  <li
                     className="flex gap-3 items-center"
                     onClick={() => navigate("/user/order")}
                  >
                     <TbInvoice></TbInvoice> My Order
                  </li>
                  <li className="flex gap-3 items-center">
                     <FaRegHeart></FaRegHeart> Wishlist
                  </li>
               </ul>
            </div>

            {/* Cột phải */}
            <div className="col-span-9 bg-white py-5 px-7 rounded-md">
               <p className="text-2xl font-secondary text-light">My Account</p>
               <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
                  <div className="mt-1 flex gap-10 items-center">
                     <label className="text-light font-secondary w-[100px]">
                        address
                     </label>
                     <input
                        {...register("address")}
                        type="text"
                        className="border-[#c4d1d0] border-2 focus:outline-none block w-[400px] h-9"
                     />
                     {errors.address && (
                        <p className="text-red-500 text-sm mt-1">
                           {errors.address.message}
                        </p>
                     )}
                  </div>

                  <div className="mt-4 flex gap-10 items-center">
                     <label className="text-light font-secondary w-[100px]">
                        Name
                     </label>
                     <input
                        {...register("name")}
                        type="text"
                        className="border-[#c4d1d0] border-2 focus:outline-none block w-[400px] h-9"
                     />
                     {errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                           {errors.name.message}
                        </p>
                     )}
                  </div>
                  <button
                     disabled={isSubmitting}
                     type="submit"
                     className="mt-[30px] bg-primary py-[10px]  text-center text-white font-secondary font-semibold w-[250px] "
                  >
                     {isSubmitting ? "Loading" : "Update Account"}
                  </button>
               </form>
            </div>
         </div>
      </div>
   );
};
