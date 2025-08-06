import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { RootState } from "@/redux/store";

const useRequireAuth = () => {
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user._id) {
      toast.warning("Bạn cần đăng nhập để truy cập tính năng này!");
      navigate("/login");
    }
  }, [user._id, navigate]);
};

export default useRequireAuth;
