export interface InvoiceItem {
  productId: string;
  productVariantId: string;
  name: string;
  size: string;
  color: string;
  imageUrl: string;
  price: number;
  quantity: number;
  total: number;
}
export interface shippingInfo {
  email: string;
  address: string;
  phone: string;
  note?: string;
}
export interface Invoice {
  _id: string;
  userId: string;
  totalPrice: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  items: InvoiceItem[];
  shippingInfo: shippingInfo;
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
