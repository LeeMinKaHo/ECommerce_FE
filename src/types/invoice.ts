export interface Invoice {
   _id: string
   userId: string;
   totalPrice: number;
   status: number;
   createdAt: Date;
   updatedAt: Date;
}
