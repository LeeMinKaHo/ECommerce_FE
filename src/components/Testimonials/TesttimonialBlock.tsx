import React from "react";
import { FaStar } from "react-icons/fa";
import avatar from "@/assets/images/avatar.png";
export const TesttimonialBlock = () => {
   return (
      <div>
         {/* User block */}
         <div>
            <img src={avatar} alt="" />
            <div>
               <p>Surja Sen Das Raj</p>
               <p>June 12, 2022</p>
            </div>

            <div>
               <FaStar className="text-yellow-500" />
               <FaStar className="text-yellow-500" />
               <FaStar className="text-yellow-500" />
               <FaStar className="text-yellow-500" />
               <FaStar className="text-yellow-500" />
            </div>
         </div>
         {/* content block */}
         <div>
            UI HUT has an amazing resources of web templates, mobile ui etc. But
            specially I like their icons. It can be a great source to boost your
            design career
         </div>
      </div>
   );
};
