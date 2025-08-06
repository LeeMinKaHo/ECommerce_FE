import React from "react";

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
            className="bg-[#C4D1D0] w-6 h-6 flex items-center justify-center text-sm leading-none font-medium"
            onClick={onDecrease}
         >
            -
         </div>
         <div className="border-2 w-6 h-6 flex items-center justify-center text-sm leading-none font-medium">
            {quantity}
         </div>
         <div
            className="bg-[#C4D1D0] w-6 h-6 flex items-center justify-center text-sm leading-none font-medium"
            onClick={onIncrease}
         >
            +
         </div>
      </div>
   );
};
