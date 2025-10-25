import { useForm, useFieldArray, set, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { use, useEffect, useState } from "react";
import React from "react";
import { Category } from "@/types/category";
import categoryApi from "@/service/category.service";
import { Size } from "@/types/size";
import uploadApi from "@/service/UploadService";
import { toast } from "sonner";
import productApi from "@/service/ProductService";

const variantSchema = z.object({
   color: z.string().min(1, "Color is required"),
   size: z.string().min(1, "Size is required"),
   imageUrl: z.string().url("Image is required"),
   quantity: z.number().min(1, "Quantity must be at least 1"),
});

const productSchema = z.object({
   name: z.string().min(1, "Product name is required"),
   description: z.string().min(1, "Description is required"),
   price: z.coerce.number().min(1, "Giá phải lớn hơn 0"),
   categoryId: z.string().min(1, "Category is required"),
   variants: z.array(variantSchema).min(1, "At least one variant is required"),
});

export type ProductFormData = z.infer<typeof productSchema>;

export default function AddProductForm() {
   const {
      register,
      handleSubmit,
      control,
      setValue,
      getValues,
      formState: { errors },
   } = useForm<ProductFormData>({
      resolver: zodResolver(productSchema),
      defaultValues: {
         variants: [],
      },
   });
   const [categories, setCategories] = useState<Category[]>([]);
   const [sizes, setSizes] = useState<Size[]>([]);
   useEffect(() => {
      const fetchCategories = async () => {
         try {
            const response = await categoryApi.getAll();
            console.log(response.data);
            setCategories(response.data.data);
         } catch (error) {
            console.error("Failed to fetch categories:", error);
         }
      };
      fetchCategories();

      const fetchSizes = async () => {
         try {
            const response = await categoryApi.getAllSizes();

            setSizes(response.data.data);
         } catch (error) {
            console.error("Failed to fetch sizes:", error);
         }
      };
      fetchSizes();
   }, []);
   // const [variants, setVariants] = useState<
   //    {
   //       color: string;
   //       size: string;
   //       image: string;
   //       quantity: number;
   //    }[]
   // >([]);
   const handleAddVariant = async () => {
      if (!file) {
         alert("Chưa có ảnh cho variant");
         return;
      }
      const formData = new FormData();
      formData.append("image", file);
      const res = await uploadApi.upload(formData);
      console.log(res)
      const newVariant = {
         color: getValues("color"), // hoặc dùng register cho input
         size: getValues("size"),
         imageUrl: `http://localhost:4000/${res.data.data.path}`,
         quantity: getValues("quantity"),
      };
      const current = getValues("variants");
      setValue("variants", [...current, newVariant]); // update react-hook-form state
      setValue("color", "");
      setValue("size", "");
      setValue("quantity", "");
      setFile(null); // reset file state của ông
   };
   const [color, setColor] = useState("");
   const [size, setSize] = useState("");
   const [quantity, setQuantity] = useState(0);
   const [preview, setPreview] = useState(null);
   const [file, setFile] = useState<File | null>(null);
   const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file && file.type.startsWith("image/")) {
         setPreview(URL.createObjectURL(file));
         setFile(file);
      } else {
         alert("Vui lòng chọn file hình ảnh!");
         e.target.value = "";
         setPreview(null);
      }
   };
   const onSubmit = async (data: ProductFormData) => {
      // console.log("Submitted data:", data);
      const res = await productApi.create(data);
      toast.success("Product created successfully!");
   };
   const variants = useWatch({ control, name: "variants" });
   return (
      <form
         onSubmit={handleSubmit(onSubmit)}
         className=" mx-auto bg-white p-8 rounded-2xl shadow-lg"
      >
         <div className="flex gap-2">
            {/* left block */}
            <div>
               <div>
                  <label htmlFor="" className="text-[20px] font-semibold ">
                     Product Name
                  </label>
                  <input {...register("name")} className="border p-2 w-full" />
                  {errors.name && (
                     <p className="text-red-500">{errors.name.message}</p>
                  )}
               </div>
               <div>
                  <label htmlFor="" className="text-[20px] font-semibold ">
                     Price
                  </label>
                  <input
                     {...register("price", { valueAsNumber: true })}
                     type="number"
                     className="border p-2 w-full"
                  />
                  {errors.price && (
                     <p className="text-red-500">{errors.price.message}</p>
                  )}
               </div>
               <div>
                  <label htmlFor="" className="text-[20px] font-semibold ">
                     Description
                  </label>
                  <textarea
                     {...register("description")}
                     id=""
                     className="px-3 py-2 w-full border border-black rounded-lg"
                  ></textarea>
                  {errors.description && (
                     <p className="text-red-500">
                        {errors.description.message}
                     </p>
                  )}
               </div>
               <div>
                  <label htmlFor="">Category</label>
                  <select
                     {...register("categoryId")}
                     className="mt-1 w-full border border-black rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
                  >
                     <option value="">Select a category</option>
                     {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                           {category.name}
                        </option>
                     ))}
                  </select>
                  {errors.categoryId && (
                     <p className="text-red-500">{errors.categoryId.message}</p>
                  )}
               </div>
               {/* List variant */}
               <div>
                  <p>Danh sách biến thể</p>
                  <div className="flex gap-2">
                     <input
                        type="text"
                        className={input}
                        placeholder="Enter color"
                        {...register("color")}
                        //value={color}
                        // onChange={(e) => setColor(e.target.value)}
                     />
                     <select
                        {...register("size")}
                        className="mt-1 w-full border border-black rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
                     >
                        <option value="">Select size</option>
                        {sizes.map((size) => (
                           <option key={size._id} value={size.name}>
                              {size.name}
                           </option>
                        ))}
                     </select>
                     <input
                        type="file"
                        className={input}
                        placeholder="Choose Imaage"
                        accept="image/*" // chỉ cho phép chọn ảnh
                        onChange={handleFileChange}
                     ></input>
                     <input
                        {...register("quantity", { valueAsNumber: true })}
                        type="number"
                        placeholder="Enter quantity"
                        onChange={(e) => setQuantity(Number(e.target.value))}
                     ></input>
                     <button
                        type="button"
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                        onClick={handleAddVariant}
                     >
                        Add Variant
                     </button>
                  </div>
                  {errors.variants && (
                     <p className="text-red-500">{errors.variants.message}</p>
                  )}
                  <table className="w-full mt-4 border-collapse border border-gray-300">
                     <thead className="bg-gray-100">
                        <tr>
                           <th className="border border-gray-300 px-4 py-2 text-left">
                              Color
                           </th>
                           <th className="border border-gray-300 px-4 py-2 text-left">
                              Size
                           </th>
                           <th className="border border-gray-300 px-4 py-2 text-center">
                              Image
                           </th>
                           <th className="border border-gray-300 px-4 py-2 text-center">
                              Quantity
                           </th>
                           <th className="border border-gray-300 px-4 py-2 text-center">
                              Actions
                           </th>
                        </tr>
                     </thead>
                     <tbody>
                        {variants.map((v, i) => (
                           <tr key={i} className="hover:bg-gray-50">
                              <td className="border border-gray-300 px-4 py-2">
                                 {v.color}
                              </td>
                              <td className="border border-gray-300 px-4 py-2">
                                 {v.size}
                              </td>
                              <td className="border border-gray-300 px-4 py-2 text-center">
                                 <img
                                    src={v.imageUrl}
                                    className="w-16 h-16 object-cover mx-auto rounded-md border"
                                    alt="variant"
                                 />
                              </td>
                              <td className="border border-gray-300 px-4 py-2 text-center">
                                 {v.quantity}
                              </td>
                              <td className="border border-gray-300 px-4 py-2 text-center">
                                 <button
                                    type="button"
                                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                                 >
                                    Remove
                                 </button>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
            <div>
               {preview && (
                  <img
                     src={preview}
                     alt="Preview"
                     className="max-w-xs rounded-lg border shadow"
                  />
               )}
            </div>
         </div>
         <button
            type="button"
            className="bg-green-500 text-white px-4 py-2 mt-4 rounded"
            onClick={handleSubmit(onSubmit)}
         >
            Save Product
         </button>
      </form>
   );
}

// Tailwind helper
const input =
   "mt-1 w-full border border-black-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-200";
