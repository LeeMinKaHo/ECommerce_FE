import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import userApi from "@/service/UserService";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slice/userSlice";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import { error } from "console";
import cartApi from "@/service/CartService";
import { setCart } from "@/redux/slice/cartSlice";
import { Navigate, useNavigate } from "react-router-dom";
type FormFields = z.infer<typeof schema>;
const schema = z.object({
   email: z.string().email(),
   password: z.string().min(6),
});
export const SignInForm = ({
   onSignInSuccess,
}: {
   onSignInSuccess: () => void;
}) => {
   const {
      register,
      handleSubmit,
      setError,
      formState: { errors, isSubmitting },
   } = useForm<FormFields>({ resolver: zodResolver(schema) });
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const onSubmit: SubmitHandler<FormFields> = async (data) => {
      try {
         const result = await userApi.signIn(data);
         const { access, refresh, ...user } = result.data.data;
         localStorage.setItem("accessToken", access);
         localStorage.setItem("refreshToken", refresh);
         dispatch(setUser(user));
         localStorage.setItem("user", JSON.stringify(user));
         if(user.role === "admin") {
            navigate("/admin");
         }
         onSignInSuccess();
         try {
            if (user) {
               const res = await cartApi.getCart();
               dispatch(setCart(res.data.data.length));
            }
         } catch (error) {
            console.error("Error fetching cart:", error);
         }
         toast.success("Đăng nhập thành công!");
      } catch (error) {
         if (isAxiosError(error)) {
            // Ở đây chắc chắn là lỗi từ axios
            console.log("Axios error:", error.response?.data || error.message);
            setError("root", {
               type: "server",
               message:
                  error.response?.data?.error?.message || "Đăng nhập thất bại",
            });
         } else {
            // Lỗi khác
            console.log("Unexpected error:", error);
         }
      }
   };
   return (
      <>
         <form onSubmit={handleSubmit(onSubmit)}>
            {errors.root && (
               <p className=" font-secondary text-red-500 font-bold text-sm mt-4">
                  {errors.root.message}
               </p>
            )}
            <div className="mt-1">
               <label htmlFor="" className="text-light font-secondary">
                  Email
               </label>
               <input
                  {...register("email")}
                  type="text"
                  className="border-[c4d1d0] border-b-2 focus:outline-none block w-full"
               />
               {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                     {errors.email.message}
                  </p>
               )}
            </div>
            <div>
               <label htmlFor="" className="text-light font-secondary">
                  Password
               </label>
               <input
                  type="password"
                  {...register("password")}
                  className="border-[c4d1d0] border-b-2 focus:outline-none block w-full"
               />
            </div>

            <div className="flex items-center justify-between mt-[30px]">
               <div className="flex items-center gap-1">
                  <input type="checkbox" name="" id="" />
                  <p className="text-light text-[16px]">Remember me?</p>
               </div>
               <p className="text-light">Forgot password?</p>
            </div>

            <button
               disabled={isSubmitting}
               type="submit"
               className="mt-[30px] bg-primary py-[10px] w-full text-center text-white font-secondary font-semibold"
            >
               {isSubmitting ? "Loading" : "Sign In"}
            </button>
         </form>
      </>
   );
};
