import React, { use, useEffect, useState } from 'react';
import { FaRegUser, FaRegHeart } from 'react-icons/fa';
import { TbInvoice } from 'react-icons/tb';
import { z } from 'zod';
import { validationMessages as msg } from '@/constant/Message';
import { resolve } from 'path';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { isAxiosError } from 'axios';
import userApi from '@/service/UserService';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
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
      name: 'John Doe',
      address: '123 Main St, Cityville',
    };
    reset(data);
    setInitialData(data);
  }, [reset]);
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<UpdateUserFormFields> = async (
    data: UpdateUserFormFields
  ) => {
    try {
      console.log('Form data submitted:', data);
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
        alert('Không có gì thay đổi!');
        return;
      }

      // 🚀 Gửi chỉ field thay đổi
      const res = await userApi.updateProfile(changedFields);

      toast.success('Update successful!');
      console.log('Updated fields sent to server:', changedFields);
    } catch (error) {
      if (isAxiosError(error)) {
        // Ở đây chắc chắn là lỗi từ axios
        console.log('Axios error:', error.response?.data || error.message);
        setError('root', {
          type: 'server',
          message: 'Invalid email or password',
        });
      } else {
        // Lỗi khác
        console.log('Unexpected error:', error);
      }
    }
  };
  return (
    <div className="min-h-screen bg-gray-200 py-6">
      <div className="container mx-auto grid grid-cols-12 gap-4 px-8">
        {/* Cột trái */}
        <div className="col-span-3 rounded-md bg-white p-4">
          <ul className="space-y-2">
            <li className="flex items-center gap-3">
              <FaRegUser /> My Account
            </li>
            <li
              className="flex items-center gap-3"
              onClick={() => navigate('/user/order')}
            >
              <TbInvoice></TbInvoice> My Order
            </li>
            <li className="flex items-center gap-3">
              <FaRegHeart></FaRegHeart> Wishlist
            </li>
          </ul>
        </div>

        {/* Cột phải */}
        <div className="col-span-9 rounded-md bg-white px-7 py-5">
          <p className="font-secondary text-light text-2xl">My Account</p>
          <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-1 flex items-center gap-10">
              <label className="text-light font-secondary w-[100px]">
                address
              </label>
              <input
                {...register('address')}
                type="text"
                className="block h-9 w-[400px] border-2 border-[#c4d1d0] focus:outline-none"
              />
              {errors.address && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.address.message}
                </p>
              )}
            </div>

            <div className="mt-4 flex items-center gap-10">
              <label className="text-light font-secondary w-[100px]">
                Name
              </label>
              <input
                {...register('name')}
                type="text"
                className="block h-9 w-[400px] border-2 border-[#c4d1d0] focus:outline-none"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>
            <button
              disabled={isSubmitting}
              type="submit"
              className="bg-primary font-secondary mt-[30px] w-[250px] py-[10px] text-center font-semibold text-white"
            >
              {isSubmitting ? 'Loading' : 'Update Account'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
