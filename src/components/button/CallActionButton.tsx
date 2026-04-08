import React from 'react';
interface CallActionButtonProps {
  text: string;
  onClick: () => void;
  customStyle?: string;
}
export const CallActionButton = (props: CallActionButtonProps) => {
  return (
    <div
      onClick={props.onClick}
      className={`flex w-full justify-center bg-[#FFD44D] py-4 ${props.customStyle} font-secondary font-semibold text-black`}
    >
      {props.text}
    </div>
  );
};
