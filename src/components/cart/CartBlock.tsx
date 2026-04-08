import React from 'react';
export interface CartItem {
  _id: string;
  productVariantId: string;
  productId: string;
  userId: string;
  name: string;
  size: string;
  color: string;
  imageUrl: string;
  price: number;
  quantity: number;
}
interface CartProductProps {
  cartItem: CartItem;
  index: number;
  handleRemoveItem: (id: string) => void;
}

export const CartBlock = ({
  cartItem,
  index,
  handleRemoveItem,
}: CartProductProps) => {
  return (
    <div className="mb-5">
      <div className="flex">
        <p className="font-secondary text-dark">Item {index + 1}</p>
        <p className="text-light font-secondary ml-auto">Edit</p>
        <p
          className="text-light font-secondary ml-auto"
          onClick={() => {
            handleRemoveItem(cartItem._id);
          }}
        >
          Remove
        </p>
      </div>
      <hr className="my-3" />
      <div className="flex gap-4">
        <img src={cartItem.imageUrl} alt="" className="h-[100px] w-[100px]" />
        <div>
          <p className="text-dark font-secondary text-[18px] font-semibold">
            {cartItem.name}
          </p>
          <p className="text-light font-secondary my-1">
            Size : {cartItem.size} - Color : {cartItem.color} - Quantity :{' '}
            {cartItem.quantity}
          </p>

          <p className="text-dark font-secondary text-[18px] font-semibold">
            ${cartItem.price}
          </p>
        </div>
      </div>
    </div>
  );
};
