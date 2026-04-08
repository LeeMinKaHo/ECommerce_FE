import React from 'react';
import { DialogContent } from '../ui/dialog';
import FacebookLogo from '@/assets/images/facebook.png';
import GoogleLogo from '@/assets/images/google.png';
import AppleLogo from '@/assets/images/apple.png';
import { SignInForm } from '../form/SignIn';
import { useDispatch } from 'react-redux';
import { closeDialog, setDialog } from '@/redux/slice/dialogSlice';
import { set } from 'react-hook-form';
import { Dialog } from '@radix-ui/react-dialog';
import { DialogType } from '@/redux/slice/dialogSlice';
export const SignInDialog = ({
  onSwitchToSignUp,
  onSignInSuccess,
}: {
  onSwitchToSignUp: () => void;
  onSignInSuccess: () => void;
}) => {
  const dispatch = useDispatch();

  return (
    <DialogContent className="gap-0 bg-white px-[30px] py-[45px]">
      <div className="flex items-center justify-between">
        <p className="font-secondary text-[18px] font-semibold">Sign In </p>
        <p
          onClick={() => dispatch(setDialog('signUp'))}
          className="font-secondary border-primary text-primary border-[2px] border-solid px-[34px] py-[15px] text-[18px] font-semibold"
        >
          Sign Up
        </p>
      </div>
      <SignInForm onSignInSuccess={onSignInSuccess}></SignInForm>
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
