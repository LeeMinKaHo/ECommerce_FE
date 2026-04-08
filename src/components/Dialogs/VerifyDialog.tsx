import React from 'react';
import { DialogContent } from '../ui/dialog';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import userApi from '@/service/UserService';
import { VerifyDTO } from '@/types/dto/user/verify.types';
import { useDispatch } from 'react-redux';
import { setDialog } from '@/redux/slice/dialogSlice';
import { toast } from 'sonner';
const verifySchema = z.object({
  code: z.string().min(4, 'Mã xác nhận phải có ít nhất 4 ký tự'),
});

type VerifyForm = z.infer<typeof verifySchema>;
export const VerifyDialog = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyForm>({
    resolver: zodResolver(verifySchema),
  });
  const dispatch = useDispatch();
  const onSubmit = (data: VerifyDTO) => {
    console.log('emailForVerify:', localStorage.getItem('emailForVerify'));
    console.log('Mã xác nhận người dùng nhập là:', data.code);
    const email = localStorage.getItem('emailForVerify');
    if (email) data.email = email;
    try {
      const res = userApi.verify(data);
      dispatch(setDialog(null));
      toast.success('Đăng ký thành công');
    } catch (error) {}
    // Gửi mã này lên API xác nhận
    // const email = localStorage.getItem("emailForVerify");
    // await userApi.verify({ email, code: data.code });
  };

  return (
    <DialogContent className="gap-0 bg-white px-[30px] py-[45px]">
      <div className="mb-4 flex items-center justify-between">
        <p className="font-secondary text-[18px] font-semibold">
          Verify your Email
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Enter verification code"
          required
          className="mb-1 w-full border p-2"
          {...register('code')}
        />
        {errors.code && (
          <p className="mb-2 text-sm text-red-500">{errors.code.message}</p>
        )}

        <button
          type="submit"
          className="w-full rounded bg-green-500 px-4 py-2 text-white"
        >
          Xác nhận
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-500">
        Didn't get the code?{' '}
        <button
          className="text-blue-500 underline"
          onClick={() => alert('Mã xác nhận mới đã được gửi!')}
        >
          Resend
        </button>
      </p>
    </DialogContent>
  );
};
