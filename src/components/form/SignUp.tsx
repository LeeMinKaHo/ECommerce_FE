import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import userApi from "@/service/UserService";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slice/userSlice";
import { setDialog } from "@/redux/slice/dialogSlice";
import { validationMessages as msg } from "@/constant/Message";
export type FormFields = z.infer<typeof schema>;
const schema = z
   .object({
      email: z.string().email().nonempty(msg.email.required),
      name: z.string().nonempty(msg.name.required).min(2, msg.name.min),
      password: z.string().nonempty(msg.password.required).min(6, msg.password.min ),
      confirmPassword: z.string().min(6, msg.password.min).nonempty(msg.password.required),
   })
   .refine((data) => data.password === data.confirmPassword, {
      message: msg.password.confirm,
      path: ["confirmPassword"],
   });

type SignUpFormProps = {
   onSuccess: () => void;
};
export const SignUpForm = ({ onSuccess }: SignUpFormProps) => {
   const dispatch = useDispatch()
   const {
      register,
      handleSubmit,
      setError,
      formState: { errors, isSubmitting },
   } = useForm<FormFields>({ resolver: zodResolver(schema) });
   const onSubmit: SubmitHandler<FormFields> = async (data) => {
      try {
         const result = await userApi.register(data);
         localStorage.setItem("emailForVerify" ,data.email)
         dispatch(setDialog("verify"))
      } catch (error) {
         console.log(error);
         setError("email", { message: "The email is already taken" });
      }
   };
   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <div className="mt-10">
            <label className="text-light font-secondary">Email</label>
            <input
               {...register("email")}
               type="text"
               className="border-[c4d1d0] border-b-2 focus:outline-none block w-full"
            />
            {errors.email && (
               <p className="text-red-500 text-sm mt-1 font-secondary">
                  {errors.email.message}
               </p>
            )}
         </div>

         <div className="mt-7">
            <label className="text-light font-secondary">Name</label>
            <input
               {...register("name")}
               type="text"
               className="border-[c4d1d0] border-b-2 focus:outline-none block w-full"
            />
            {errors.name && (
               <p className="text-red-500 text-sm mt-1 font-secondary">
                  {errors.name.message}
               </p>
            )}
         </div>

         <div className="mt-7">
            <label className="text-light font-secondary">Password</label>
            <input
               {...register("password")}
               type="password"
               className="border-[c4d1d0] border-b-2 focus:outline-none block w-full"
            />
            {errors.password && (
               <p className="text-red-500 text-sm mt-1 font-secondary">
                  {errors.password.message}
               </p>
            )}
         </div>
         <div className="mt-7">
            <label className="text-light font-secondary">
               Confirm Password
            </label>
            <input
               {...register("confirmPassword")}
               type="password"
               className="border-[c4d1d0] border-b-2 focus:outline-none block w-full"
            />
            {errors.confirmPassword && (
               <p className="text-red-500 text-sm mt-1 font-secondary">
                  {errors.confirmPassword.message}
               </p>
            )}
         </div>

         <button
            disabled={isSubmitting}
            type="submit"
            className="mt-[30px] bg-primary py-[10px] w-full text-center text-white font-secondary font-semibold"
         >
            {isSubmitting ? "Loading" : "Sign Up"}
         </button>
      </form>
   );
};
