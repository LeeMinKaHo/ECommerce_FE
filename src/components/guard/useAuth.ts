import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { toast } from "sonner";

export const useAuth = () => {
  const user = useSelector((state: RootState) => state.user);

  const checkLogin = () => {
    if (!user.name) {
      console.log(user)
      toast.warning("Please log in to access this feature!");
      return false;
    }
    return true;
  };

  return { user, checkLogin };
};