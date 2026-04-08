import React from 'react';

interface QuantityInputProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

export const QuantityInput = ({
  quantity,
  onIncrease,
  onDecrease,
}: QuantityInputProps) => {
  return (
    <div className="flex gap-2">
      <div
        className="flex h-6 w-6 items-center justify-center bg-[#C4D1D0] text-sm leading-none font-medium"
        onClick={onDecrease}
      >
        -
      </div>
      <div className="flex h-6 w-6 items-center justify-center border-2 text-sm leading-none font-medium">
        {quantity}
      </div>
      <div
        className="flex h-6 w-6 items-center justify-center bg-[#C4D1D0] text-sm leading-none font-medium"
        onClick={onIncrease}
      >
        +
      </div>
    </div>
  );
};
