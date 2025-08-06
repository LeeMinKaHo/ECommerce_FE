// AddProductForm.tsx
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import React, { useEffect } from "react";
import productApi from "@/service/ProductService";
import { toast } from "sonner";

// Zod schema
const variantSchema = z.object({
   color: z.string().min(1, "Nhập màu"),
   sizeId: z.string().min(1, "Chọn size"),
   imageUrl: z.string().url("URL không hợp lệ"),
   quantity: z.number().min(1, "Tối thiểu 1"),
});

const productSchema = z.object({
   name: z.string().min(1, "Tên không được để trống"),
   description: z.string().optional(),
   price: z.number().min(1, "Giá phải lớn hơn 0"),
   quanlity: z.number().min(1, "Số lượng phải > 0"),
   createBy: z.string().min(1, "Thiếu người tạo"),
   categoryId: z.string().min(1, "Chọn danh mục"),
   variants: z.array(variantSchema).min(1, "Thêm ít nhất 1 biến thể"),
});

export type ProductForm = z.infer<typeof productSchema>;

export default function AddProductForm() {
   const {
      register,
      handleSubmit,
      control,
      formState: { errors },
   } = useForm<ProductForm>({
      resolver: zodResolver(productSchema),
      defaultValues: {
         name: "",
         description: "",
         price: 0,
         quanlity: 0,
         createBy: "",
         categoryId: "",
         variants: [{ color: "", sizeId: "", imageUrl: "", quantity: 1 }],
      },
   });

   const { fields, append, remove } = useFieldArray({
      control,
      name: "variants",
   });

   const onSubmit = async (data: ProductForm) => {
      console.log("✅ Submitted product:", data);

      try {
         const res = await productApi.create(data);
         toast.success("Thêm product thành công");
      } catch (error) {
         console.log(error);
      }
   };
   useEffect(() => {
      console.log("❌ Validation errors:", errors);
   }, [errors]);
   return (
      <div className="max-w-3xl mx-auto bg-white p-8 shadow-md rounded-lg">
         <h1 className="text-2xl font-semibold mb-6 text-center">
            Thêm sản phẩm
         </h1>
         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Tên sản phẩm */}
            <div>
               <label className="block font-medium">Tên sản phẩm</label>
               <input
                  {...register("name")}
                  className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Nhập tên sản phẩm"
               />
               {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
               )}
            </div>

            {/* Mô tả */}
            <div>
               <label className="block font-medium">Mô tả</label>
               <textarea
                  {...register("description")}
                  className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Mô tả sản phẩm"
               />
            </div>

            {/* Giá và số lượng */}
            <div className="grid grid-cols-2 gap-4">
               <div>
                  <label className="block font-medium">Giá (VNĐ)</label>
                  <input
                     type="number"
                     {...register("price", { valueAsNumber: true })}
                     className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
                     placeholder="Nhập giá"
                  />
                  {errors.price && (
                     <p className="text-red-500 text-sm">
                        {errors.price.message}
                     </p>
                  )}
               </div>
               <div>
                  <label className="block font-medium">Số lượng tổng</label>
                  <input
                     type="number"
                     {...register("quanlity", { valueAsNumber: true })}
                     className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
                     placeholder="Số lượng"
                  />
                  {errors.quanlity && (
                     <p className="text-red-500 text-sm">
                        {errors.quanlity.message}
                     </p>
                  )}
               </div>
            </div>

            {/* Người tạo & danh mục */}
            <div className="grid grid-cols-2 gap-4">
               <div>
                  <label className="block font-medium">Người tạo (ID)</label>
                  <input
                     {...register("createBy")}
                     className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
                     placeholder="ID người tạo"
                  />
               </div>
               <div>
                  <label className="block font-medium">Danh mục (ID)</label>
                  <input
                     {...register("categoryId")}
                     className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
                     placeholder="ID danh mục"
                  />
               </div>
            </div>

            {/* Variants */}
            <div>
               <label className="block font-medium text-lg mb-2">
                  Biến thể
               </label>
               <div className="space-y-4">
                  {fields.map((field, index) => (
                     <div
                        key={field.id}
                        className="p-4 border rounded-md bg-gray-50 relative"
                     >
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                           <input
                              {...register(`variants.${index}.color`)}
                              className="border border-gray-300 rounded px-2 py-1"
                              placeholder="Màu"
                           />
                           <input
                              {...register(`variants.${index}.sizeId`)}
                              className="border border-gray-300 rounded px-2 py-1"
                              placeholder="Size ID"
                           />
                           <input
                              {...register(`variants.${index}.imageUrl`)}
                              className="border border-gray-300 rounded px-2 py-1"
                              placeholder="URL ảnh"
                           />
                           <input
                              type="number"
                              {...register(`variants.${index}.quantity`, {
                                 valueAsNumber: true,
                              })}
                              className="border border-gray-300 rounded px-2 py-1"
                              placeholder="Số lượng"
                           />
                        </div>
                        <button
                           type="button"
                           onClick={() => remove(index)}
                           className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-sm"
                        >
                           Xóa
                        </button>
                     </div>
                  ))}
               </div>

               <button
                  type="button"
                  onClick={() =>
                     append({
                        color: "",
                        sizeId: "",
                        imageUrl: "",
                        quantity: 1,
                     })
                  }
                  className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
               >
                  + Thêm biến thể
               </button>
            </div>

            {/* Submit */}
            <div className="text-center">
               <button
                  type="submit"
                  className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
               >
                  Thêm sản phẩm
               </button>
            </div>
         </form>
      </div>
   );
}
