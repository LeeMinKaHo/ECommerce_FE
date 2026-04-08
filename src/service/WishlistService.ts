import axiosInstance from './AxiosInstance';
import { ApiResponse } from '@/types/share.type';

const wishlistApi = {
  toggle: (productId: string) =>
    axiosInstance.post('wishlist/toggle', { productId }),
  getAll: () => axiosInstance.get('wishlist'),
  checkStatus: (productId: string) =>
    axiosInstance.get(`wishlist/status/${productId}`),
};

export default wishlistApi;
