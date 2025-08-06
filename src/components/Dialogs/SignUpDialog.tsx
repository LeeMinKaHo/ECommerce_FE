import React from "react";
import { DialogContent } from "../ui/dialog";
import FacebookLogo from "@/assets/images/facebook.png";
import GoogleLogo from "@/assets/images/google.png";
import AppleLogo from "@/assets/images/apple.png";
import { SignUpForm } from "../form/SignUp";



export const SignUpDialog = ({ switchToVerify }: { switchToVerify: () => void }) => {
  
   return (
      <DialogContent className="bg-white px-[30px] py-[45px] gap-0">
         <div className="flex justify-between items-center">
            <p className="font-secondary font-semibold text-[18px]">Create your account</p>
         </div>
         <SignUpForm  onSuccess={switchToVerify}></SignUpForm>
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
