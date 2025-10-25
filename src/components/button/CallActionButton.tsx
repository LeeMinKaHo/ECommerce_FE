import React from "react";
interface CallActionButtonProps {
   text: string;
   onClick: () => void;
   customStyle?: string;
}
export const CallActionButton = (props: CallActionButtonProps) => {
   return (
      <div onClick={props.onClick} className={`bg-[#FFD44D] w-full py-4 flex justify-center ${props.customStyle} font-secondary font-semibold text-black`} >
         {props.text}
      </div>
   );
};
