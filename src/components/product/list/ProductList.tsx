import { Product } from "@/types/product";
import React from "react";
import { ProductBox } from "../productBox/ProductBox";

interface ProductListProps {
   products: Product[];
}
export const ProductList = ({ products }: ProductListProps) => {
   return (
      <>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-[30px] ">
            {products.length === 0 && <p>No products found.</p>}
            {Array.isArray(products) &&
               products.map((product) => (
                  <ProductBox key={product._id} product={product} />
               ))}
         </div>
      </>
   );
};
