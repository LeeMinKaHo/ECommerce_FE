export interface Invoice {
   _id: string
   userId: string;
   totalPrice: number;
   status: number;
   createdAt: Date;
   updatedAt: Date;
}

export interface shippingInfo {
   email: string;
   address: string;
   phone: string;
   note?: string;
}
export interface CreateInvoiceDTO {
   shippingInfo: shippingInfo;
   paymentMethod: 'paypal' | 'cod' | 'card';
}