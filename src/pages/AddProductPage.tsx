import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect, useState } from 'react';
import React from 'react';
import { Category } from '@/types/category';
import categoryApi from '@/service/category.service';
import { Size } from '@/types/size';
import uploadApi from '@/service/UploadService';
import { toast } from 'sonner';
import productApi from '@/service/ProductService';
import { Link, useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  Plus,
  Trash2,
  ImagePlus,
  Package,
  Layers,
  Tag,
  FileText,
  DollarSign,
  Save,
  Loader2,
} from 'lucide-react';

// ── Schemas ──────────────────────────────────────────────────────────────────
const variantSchema = z.object({
  color: z.string().min(1, 'Color is required'),
  size: z.string().min(1, 'Size is required'),
  imageUrl: z.string().url('Image is required'),
  quantity: z.number().min(1, 'Quantity must be at least 1'),
});

const productSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.coerce.number().min(1, 'Price must be greater than 0'),
  categoryId: z.string().min(1, 'Category is required'),
  variants: z.array(variantSchema).min(1, 'At least one variant is required'),
});

export type ProductFormData = z.infer<typeof productSchema>;

// ── Component ─────────────────────────────────────────────────────────────────
export default function AddProductForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: { variants: [] },
  });

  const variants = useWatch({ control, name: 'variants' }) ?? [];

  // Data
  const [categories, setCategories] = useState<Category[]>([]);
  const [sizes, setSizes] = useState<Size[]>([]);

  // Variant builder state
  const [variantColor, setVariantColor] = useState('#000000');
  const [variantSize, setVariantSize] = useState('');
  const [variantQty, setVariantQty] = useState<number>(1);
  const [variantFile, setVariantFile] = useState<File | null>(null);
  const [variantPreview, setVariantPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    categoryApi.getAll().then((r) => setCategories(r.data.data)).catch(console.error);
    categoryApi.getAllSizes().then((r) => setSizes(r.data.data)).catch(console.error);
  }, []);

  // ── File handler ──────────────────────────────────────────────────────────
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!f.type.startsWith('image/')) {
      toast.error('Please select an image file!');
      return;
    }
    setVariantFile(f);
    setVariantPreview(URL.createObjectURL(f));
  };

  // ── Add variant ───────────────────────────────────────────────────────────
  const handleAddVariant = async () => {
    if (!variantFile) { toast.error('Variant image is required!'); return; }
    if (!variantSize) { toast.error('Size is required!'); return; }
    if (!variantColor) { toast.error('Color is required!'); return; }
    if (variantQty < 1) { toast.error('Quantity must be ≥ 1'); return; }

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('image', variantFile);
      const res = await uploadApi.upload(formData);

      const newVariant = {
        color: variantColor,
        size: variantSize,
        imageUrl: `http://localhost:4000/${res.data.data.path}`,
        quantity: variantQty,
      };

      setValue('variants', [...getValues('variants'), newVariant]);

      // Reset builder
      setVariantColor('#000000');
      setVariantSize('');
      setVariantQty(1);
      setVariantFile(null);
      setVariantPreview(null);
      toast.success('Variant added!');
    } catch {
      toast.error('Image upload failed!');
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveVariant = (idx: number) => {
    const current = getValues('variants');
    setValue('variants', current.filter((_, i) => i !== idx));
  };

  // ── Submit ────────────────────────────────────────────────────────────────
  const onSubmit = async (data: ProductFormData) => {
    try {
      await productApi.create(data);
      toast.success('Product created successfully!');
      navigate('/admin/products');
    } catch {
      toast.error('Creation failed!');
    }
  };

  // ── Helpers ───────────────────────────────────────────────────────────────
  const inputCls = (err?: { message?: string }) =>
    `w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${
      err ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white'
    }`;

  return (
    <div className="min-h-screen p-6 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          to="/admin/products"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-primary transition-colors mb-4"
        >
          <ChevronLeft size={16} /> Back to Products
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
        <p className="text-sm text-gray-400 mt-0.5">Fill in product details and add variants</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* ─── Left: Main Info ─────────────────────────────────── */}
          <div className="xl:col-span-2 space-y-5">
            {/* Basic info card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100 flex items-center gap-2">
                <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Package size={18} className="text-primary" />
                </div>
                <h2 className="font-bold text-gray-900">Basic Information</h2>
              </div>

              <div className="p-6 space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1.5">
                    <FileText size={14} /> Product Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    {...register('name')}
                    placeholder="E.g: Men's Stylish T-shirt..."
                    className={inputCls(errors.name)}
                  />
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
                </div>

                {/* Price + Category row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1.5">
                      <DollarSign size={14} /> Price (USD) <span className="text-red-400">*</span>
                    </label>
                    <input
                      {...register('price', { valueAsNumber: true })}
                      type="number"
                      placeholder="0.00"
                      min={0}
                      step={0.01}
                      className={inputCls(errors.price)}
                    />
                    {errors.price && <p className="text-xs text-red-500 mt-1">{errors.price.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1.5">
                      <Tag size={14} /> Category <span className="text-red-400">*</span>
                    </label>
                    <select
                      {...register('categoryId')}
                      className={inputCls(errors.categoryId)}
                    >
                      <option value="">Select category...</option>
                      {categories.map((c) => (
                        <option key={c._id} value={c._id}>{c.name}</option>
                      ))}
                    </select>
                    {errors.categoryId && <p className="text-xs text-red-500 mt-1">{errors.categoryId.message}</p>}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    {...register('description')}
                    rows={4}
                    placeholder="Enter detailed description..."
                    className={`${inputCls(errors.description)} resize-none`}
                  />
                  {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description.message}</p>}
                </div>
              </div>
            </div>

            {/* Variants card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-9 w-9 rounded-xl bg-violet-50 flex items-center justify-center">
                    <Layers size={18} className="text-violet-600" />
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-900">Product Variants</h2>
                    <p className="text-xs text-gray-400">Color, size and quantity</p>
                  </div>
                </div>
                <span className="text-xs font-bold bg-violet-50 text-violet-600 px-3 py-1 rounded-full">
                  {variants.length} variants
                </span>
              </div>

              {/* Variant builder */}
              <div className="p-6 border-b border-gray-50 bg-gray-50/40">
                <p className="text-sm font-semibold text-gray-700 mb-4">➕ Add New Variant</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  {/* Color picker */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
                      Color
                    </label>
                    <div className="flex items-center gap-3 px-3 py-2 border border-gray-200 rounded-xl bg-white">
                      <input
                        type="color"
                        value={variantColor}
                        onChange={(e) => setVariantColor(e.target.value)}
                        className="h-8 w-8 rounded-lg border-0 cursor-pointer p-0.5"
                      />
                      <span className="text-sm font-mono text-gray-600 flex-1">{variantColor}</span>
                    </div>
                  </div>

                  {/* Size */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
                      Size
                    </label>
                    <select
                      value={variantSize}
                      onChange={(e) => setVariantSize(e.target.value)}
                      className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
                    >
                      <option value="">Select size...</option>
                      {sizes.map((s) => (
                        <option key={s._id} value={s.name}>{s.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Quantity */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
                      Quantity
                    </label>
                    <input
                      type="number"
                      min={1}
                      value={variantQty}
                      onChange={(e) => setVariantQty(Number(e.target.value))}
                      className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
                    />
                  </div>

                  {/* Image upload */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
                      Variant Image
                    </label>
                    <label className="flex items-center justify-center gap-2 w-full py-2.5 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-primary/40 hover:bg-primary/5 transition-all text-sm text-gray-400 hover:text-primary">
                      <ImagePlus size={16} />
                      {variantFile ? variantFile.name.slice(0, 12) + '...' : 'Upload Image'}
                      <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                    </label>
                  </div>
                </div>

                {/* Preview + Add button */}
                <div className="flex items-center gap-4">
                  {variantPreview && (
                    <div className="h-16 w-16 rounded-xl overflow-hidden border-2 border-primary/20 shrink-0">
                      <img src={variantPreview} className="h-full w-full object-cover" alt="preview" />
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={handleAddVariant}
                    disabled={uploading}
                    className="flex items-center gap-2 px-6 py-2.5 bg-violet-600 text-white text-sm font-bold rounded-xl hover:bg-violet-700 transition-all disabled:opacity-50 shadow-md shadow-violet-200"
                  >
                    {uploading ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
                    {uploading ? 'Processing...' : 'Add Variant'}
                  </button>
                </div>
              </div>

              {/* Variants table */}
              {errors.variants && (
                <p className="px-6 pt-4 text-sm text-red-500">{errors.variants.message as string}</p>
              )}

              {variants.length === 0 ? (
                <div className="py-12 text-center text-gray-300">
                  <Layers size={40} className="mx-auto mb-3" />
                  <p className="text-sm">No variants added yet. Please add at least one.</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-50">
                  {variants.map((v, i) => (
                    <div key={i} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors">
                      <img
                        src={v.imageUrl}
                        alt="variant"
                        className="h-14 w-14 rounded-xl object-cover border border-gray-100 shrink-0"
                      />
                      <div className="flex-1 flex items-center gap-4 min-w-0 flex-wrap">
                        <div className="flex items-center gap-2">
                          <div
                            className="h-5 w-5 rounded-full border border-gray-200 shrink-0"
                            style={{ backgroundColor: v.color }}
                          />
                          <span className="text-xs font-mono text-gray-500">{v.color}</span>
                        </div>
                        <span className="text-xs font-bold bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
                          {v.size}
                        </span>
                        <span className="text-sm text-gray-500">
                          Qty: <strong className="text-gray-900">{v.quantity}</strong>
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveVariant(i)}
                        className="h-8 w-8 flex items-center justify-center rounded-xl text-gray-300 hover:bg-red-50 hover:text-red-500 transition-all shrink-0"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ─── Right: Summary + Submit ─────────────────────────── */}
          <div className="space-y-5">
            {/* Summary card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="font-bold text-gray-900 mb-5">Summary</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Variants</span>
                  <span className="font-bold text-gray-900">{variants.length}</span>
                </div>
                <div className="flex justify-between border-t border-gray-50 pt-3">
                  <span className="text-gray-400">Total Stock</span>
                  <span className="font-bold text-gray-900">
                    {variants.reduce((sum, v) => sum + (v.quantity || 0), 0)}
                  </span>
                </div>
              </div>
            </div>

            {/* Publish card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="font-bold text-gray-900 mb-2">Publish</h2>
              <p className="text-xs text-gray-400 mb-5">
                This product will be visible immediately on the storefront.
              </p>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all disabled:opacity-50 active:scale-[0.98]"
              >
                {isSubmitting ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Save size={18} />
                )}
                {isSubmitting ? 'Saving...' : 'Save Product'}
              </button>
              <Link
                to="/admin/products"
                className="block mt-3 text-center text-sm text-gray-400 hover:text-gray-600 transition-colors"
              >
                Discard Changes
              </Link>
            </div>

            {/* Tips Card */}
            <div className="bg-gradient-to-br from-primary/5 to-violet-50 rounded-2xl border border-primary/10 p-5">
              <p className="text-sm font-bold text-gray-700 mb-3">💡 Product Tips</p>
              <ul className="space-y-2 text-xs text-gray-500 list-disc list-inside">
                <li>Product name should be short and catchy</li>
                <li>Detailed description increases conversion rates</li>
                <li>Add multiple variants for better choices</li>
                <li>Images should be square (1:1) for best results</li>
              </ul>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
