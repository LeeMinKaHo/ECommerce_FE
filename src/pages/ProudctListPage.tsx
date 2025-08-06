import { CategoryList } from "@/components/category/CategoryList";
import { CenterScreenLoader } from "@/components/CenterScreenLoader";
import { ProductList } from "@/components/product/list/ProductList";
import productApi from "@/service/ProductService";
import { Product, ProductFillter } from "@/types/product";
import React, { useEffect, useState } from "react";
export enum SortOption {
   Price_Asc = 1,
   Price_Desc = 2,
   Rating_Asc = 3,
   Rating_Desc = 4,
}
export const ProductListPage = () => {
   const [loadMore, setLoadMore] = useState(true);
   const [fillter, setFilter] = useState<ProductFillter>({
      page: 1,
      limit: 9,
      sort: 0,
      categoryId: "",
   });
   const [loading, setLoading] = useState(false);
   const [products, setProducts] = useState<Product[]>([]);
   const [totalProducts, setTotalProducts] = useState(0);
   const handleLoadMoreChange = (newState: boolean) => {
      setLoadMore((prev) => newState);
   };
   const handleCategoryChange = (categoryId: string) => {
      setFilter((prev) => ({
         ...prev,
         page: 1, // reset to first page
         categoryId: categoryId,
      }));
   };
   enum SortOption {
      Latest = 0,
      Price_Asc = 1,
      Price_Desc = 2,
      Rating_Asc = 3,
      Rating_Desc = 4,
   }
   useEffect(() => {
      let isMounted = true;

      const fetchProducts = async () => {
         try {
            setLoading(true); // 👉 Bắt đầu loading
            const res = await productApi.getAll(fillter);

            if (isMounted) {
               const { data, pagination: paginRes } = res.data;

               if (fillter.page === 1) {
                  // reset nếu là trang đầu (có thể là do sort hoặc filter mới)
                  setProducts(data);
               } else {
                  // load more
                  setProducts((prev) => [...prev, ...data]);
               }
               setTotalProducts(paginRes.total);
               const hasMore = fillter.page * fillter.limit < paginRes.total;
               handleLoadMoreChange(hasMore);
               setLoading(false);
            }
         } catch (err) {
            console.error("Lỗi khi lấy danh sách sản phẩm:", err);
         }
      };

      fetchProducts();

      return () => {
         isMounted = false;
      };
   }, [fillter]);
   const start = (fillter.page - 1) * fillter.limit + 1;
   const end = Math.min(fillter.page * fillter.limit, totalProducts);
   return (
      <>
         {loading && <CenterScreenLoader />}
         <div className="pt-[100px] container mx-auto px-8">
            <div className="text-center">
               <p className="font-primary text-[42px] font-bold">
                  Proudct List
               </p>
               <p className="font-secondary text-light mt-5">
                  We hear what you need. We plan, design & develop visionary
                  concept websites.
               </p>
            </div>

            <div className="grid grid-cols-12 gap-4 mt-4">
               {/* Left content: 9/12 columns */}
               <div className="col-span-12 md:col-span-9  ">
                  <div className="flex items-center justify-between mb-4">
                     <p>{`Showing ${start}-${end} of ${totalProducts} results`}</p>
                     <select
                        className="border px-2 py-1 rounded"
                        value={fillter.sort}
                        onChange={(e) => {
                           const value = parseInt(e.target.value);
                           setFilter((prev) => ({
                              ...prev,
                              page: 1,
                              sort: value,
                           }));
                        }}
                     >
                        <option value={0}>Sort by latest</option>
                        <option value={SortOption.Price_Asc}>
                           Price: Low to High
                        </option>
                        <option value={SortOption.Price_Desc}>
                           Price: High to Low
                        </option>
                        <option value={SortOption.Rating_Asc}>
                           Rating: Low to High
                        </option>
                        <option value={SortOption.Rating_Desc}>
                           Rating: High to Low
                        </option>
                     </select>
                  </div>
                  <ProductList products={products}></ProductList>
               </div>
               {/* Load more button */}
               {/* Right sidebar: 3/12 columns */}
               <div className="col-span-3 hidden md:block">
                  {/* Sidebar content here */}
                  <CategoryList
                     selectedCategoryId={fillter.categoryId}
                     onCategoryChange={handleCategoryChange}
                  ></CategoryList>
               </div>
            </div>
            {loadMore && (
               <div className="flex justify-center items-center mt-[60px] ">
                  <div
                     onClick={() =>
                        loadMore &&
                        setFilter((prev) => ({ ...prev, page: prev.page + 1 }))
                     }
                     className="font-secondary text-white text-[18px] font-semibold inline-block px-6 py-4 bg-primary rounded-[5px] text-center"
                  >
                     Load More
                  </div>
               </div>
            )}
         </div>
      </>
   );
};
