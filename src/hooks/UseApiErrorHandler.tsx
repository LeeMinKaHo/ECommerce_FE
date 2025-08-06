import { toast } from "sonner";

export const useApiErrorHandler = () => {
  return (error: any) => {
    if (error.response?.data?.error?.message) {
      toast.error(error.response.data.error.message);
    } else {
      toast.error("Có lỗi xảy ra. Vui lòng thử lại sau!");
    }
  };
};
