import React from "react";
import { DialogContent } from "../ui/dialog";
import FacebookLogo from "@/assets/images/facebook.png";
import GoogleLogo from "@/assets/images/google.png";
import AppleLogo from "@/assets/images/apple.png";
import { SignInForm } from "../form/SignIn";
import { useDispatch } from "react-redux";
import { closeDialog, setDialog } from "@/redux/slice/dialogSlice";
import { set } from "react-hook-form";
import { Dialog } from "@radix-ui/react-dialog";
import { DialogType } from "@/redux/slice/dialogSlice";
export const SignInDialog = ({
   onSwitchToSignUp,
   onSignInSuccess
}: {
   onSwitchToSignUp: () => void;
   onSignInSuccess: () => void;
}) => {
   const dispatch = useDispatch();

   return (
      <DialogContent className="bg-white px-[30px] py-[45px] gap-0">
         <div className="flex justify-between items-center">
            <p className="font-secondary font-semibold text-[18px]">Sign In </p>
            <p
               onClick={ () => dispatch(setDialog("signUp"))}
               className="font-secondary font-semibold text-[18px] px-[34px] py-[15px] border-[2px] border-solid border-primary text-primary"
            >
               Sign Up
            </p>
         </div>
         <SignInForm onSignInSuccess={onSignInSuccess}></SignInForm>
         <div>Or</div>
         <div className="flex items-center gap-[13px] py-[13px] pl-[13px] pr-[26px] w-[255px] mx-auto border-1 border-[#566363] text-light">
            <img src={FacebookLogo} alt="" />
            Continue with Facebook
         </div>
         <div className="flex items-center gap-[13px] py-[13px] pl-[13px] pr-[26px] w-[255px] mx-auto border-1 border-[#566363] text-light my-4">
            <img src={GoogleLogo} alt="" />
            Continue with Google
         </div>
         <div className="flex items-center gap-[13px] py-[13px] pl-[13px] pr-[26px] w-[255px] mx-auto border-1 border-[#566363] text-light">
            <img src={AppleLogo} alt="" />
            Continue with Apple
         </div>
      </DialogContent>
   );
};
