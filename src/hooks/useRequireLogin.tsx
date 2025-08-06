// src/hooks/useRequireLogin.ts
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { RootState } from "../redux/store";
import { setDialog } from "@/redux/slice/dialogSlice";
import { toast } from "sonner";

export const useRequireLogin = () => {
   const user = useSelector((state: RootState) => state.user);
   const dispatch = useDispatch();
   const location = useLocation();

   const checkLogin = () => {
      return !!localStorage.getItem("accessToken");
      if (!user._id) {
         // Mở dialog đăng nhập
         dispatch(setDialog("signIn"));
         toast.info("Please login to continue!");
         // Có thể lưu đường dẫn hiện tại để điều hướng sau khi đăng nhập thành công
         localStorage.setItem("redirectAfterLogin", location.pathname);

         return false;
      }
      return true;
   };

   return checkLogin;
};
