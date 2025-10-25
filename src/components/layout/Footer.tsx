import React from "react";

export const Footer = () => {
   return (
      <div className="bg-black">
         <div className=" text-white py-[100px] container px-8 flex gap-[88px]">
            <div>
               <p>Coach</p>
               <p className="text-secondary text-[42px]/[52px] max-w-[370px]">
                  Ready to find your coach?
               </p>
               <button>Find My Coach</button>
            </div>
            <div className="grid grid-cols-3 gap-5">
               <ul className="text-light font-secondary">
                  Credit Card
                  <li className="mt-[26px] mb-[18px] text-white">Gift Cards</li>
                  <li className="mb-[18px] text-white">Gift Cards Balance</li>
                  <li className="mb-[18px] text-white">Shop with Points</li>
                  <li className="mb-[18px] text-white">Reload Your Balance</li>
               </ul>
               <ul className="text-light font-secondary">
                  About Us
                  <li className="mt-[26px] mb-[18px] text-white">Gift Cards</li>
                  <li className="mb-[18px] text-white">Gift Cards Balance</li>
                  <li className="mb-[18px] text-white">Shop with Points</li>
                  <li className="mb-[18px] text-white">Reload Your Balance</li>
               </ul>
               <ul className="text-light font-secondary">
                  Credit Card
                  <li className="mt-[26px] mb-[18px] text-white">Gift Cards</li>
                  <li className="mb-[18px] text-white">Gift Cards Balance</li>
                  <li className="mb-[18px] text-white">Shop with Points</li>
                  <li className="mb-[18px] text-white">Reload Your Balance</li>
               </ul>
            </div>
         </div>
      </div>
   );
};
