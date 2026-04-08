import React from 'react';
import { DialogContent } from '../ui/dialog';
import FacebookLogo from '@/assets/images/facebook.png';
import GoogleLogo from '@/assets/images/google.png';
import AppleLogo from '@/assets/images/apple.png';
import { SignUpForm } from '../form/SignUp';

export const SignUpDialog = ({
  switchToVerify,
}: {
  switchToVerify: () => void;
}) => {
  return (
    <DialogContent className="gap-0 bg-white px-[30px] py-[45px]">
      <div className="flex items-center justify-between">
        <p className="font-secondary text-[18px] font-semibold">
          Create your account
        </p>
      </div>
      <SignUpForm onSuccess={switchToVerify}></SignUpForm>
      <div>Or</div>
      <div className="text-light mx-auto flex w-[255px] items-center gap-[13px] border-1 border-[#566363] py-[13px] pr-[26px] pl-[13px]">
        <img src={FacebookLogo} alt="" />
        Continue with Facebook
      </div>
      <div className="text-light mx-auto my-4 flex w-[255px] items-center gap-[13px] border-1 border-[#566363] py-[13px] pr-[26px] pl-[13px]">
        <img src={GoogleLogo} alt="" />
        Continue with Google
      </div>
      <div className="text-light mx-auto flex w-[255px] items-center gap-[13px] border-1 border-[#566363] py-[13px] pr-[26px] pl-[13px]">
        <img src={AppleLogo} alt="" />
        Continue with Apple
      </div>
    </DialogContent>
  );
};
