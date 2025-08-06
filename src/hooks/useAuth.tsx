// hooks/useAuth.ts
import userApi from "@/service/UserService";
import { setUser } from "@/redux/slice/userSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export const useAuth = () => {
   const user = useSelector((state: RootState) => state.user._id);
   const [loading, setLoading] = useState(true);
   const dispatch = useDispatch();

   useEffect(() => {
      const fetchUser = async () => {
         const token = localStorage.getItem("accessToken");
         if (!token) {
            setLoading(false);
            return;
         }
         try {
            const res = await userApi.getProfile();
            dispatch(setUser(res.data.data));
         } catch (err) {
            localStorage.removeItem("accessToken");
         } finally {
            setLoading(false);
         }
      };

      fetchUser();
   }, []);

   return { user, loading };
};
