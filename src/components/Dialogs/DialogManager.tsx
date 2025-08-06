import { closeDialog, setDialog } from "@/redux/slice/dialogSlice";
import CartDialog from "./CartDialog";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SignInDialog } from "./SignInDialog";
import { SignUpDialog } from "./SignUpDialog";
import { VerifyDialog } from "./VerifyDialog";
import { RootState } from "@/redux/store";
import { ReviewForm } from "../form/Review";

export const DialogManager = () => {
   const activeDialog = useSelector(
      (state: RootState) => state.dialog.activeDialog
   );
   const dispatch = useDispatch();

   const handleClose = () => dispatch(closeDialog());

   switch (activeDialog) {
      case "signIn":
         return (
            <Dialog open onOpenChange={(open) => !open && handleClose()}>
               <SignInDialog
                  onSignInSuccess={handleClose}
                  onSwitchToSignUp={() => dispatch(setDialog("signUp"))}
               />
            </Dialog>
         );
      case "signUp":
         return (
            <Dialog open onOpenChange={(open) => !open && handleClose()}>
               <SignUpDialog
                  switchToVerify={() => dispatch(setDialog("verify"))}
               />
            </Dialog>
         );
      case "verify":
         return (
            <Dialog open onOpenChange={(open) => !open && handleClose()}>
               <VerifyDialog />
            </Dialog>
         );
      case "cart":
         return (
            <Dialog open onOpenChange={(open) => !open && handleClose()}>
               <DialogContent>
                  <CartDialog />
               </DialogContent>
            </Dialog>
         );
      case "review":
         return (
            <Dialog  open onOpenChange={(open) => !open && handleClose()}>
               <DialogContent className="w-[800px] !max-w-none">
                  <ReviewForm />
               </DialogContent>
            </Dialog>
         );
      default:
         return null;
   }
};
