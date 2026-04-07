import { OverviewReport } from "@/types/report.type";
import axiosInstance from "./AxiosInstance";
import { ApiResponse } from "@/types/share.type";

const reportApi = {
   overview : () => axiosInstance.get<ApiResponse<OverviewReport>>("/admin/reports"),
};

export default reportApi;
