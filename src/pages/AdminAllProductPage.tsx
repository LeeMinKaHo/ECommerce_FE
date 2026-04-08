import CategoryList from '@/components/CategoryList';
import { useLayout } from '@/components/layout/LayoutContext';
import categoryApi from '@/service/category.service';
import productApi from '@/service/ProductService';
import { Category } from '@/types/category';
import { Product, ProductFillter } from '@/types/product';
import React, { useEffect, useState } from 'react';
import { set } from 'react-hook-form';
import { FaArrowUpLong } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
export const AdminAllProductPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const { setExtraSidebar } = useLayout();
  const [products, setProducts] = useState<Product[]>([]);
  const [fillter, setFilter] = useState<ProductFillter>({
    page: 1,
    limit: 9,
    sort: 0,
    categoryId: '',
  });
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryApi.getAll();
        console.log('fetch categories', response.data.data);
        setCategories(response.data.data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };
    const fetchProducts = async () => {
      try {
        const res = await productApi.getAll(fillter);
        console.log('fetch products', res.data.data);
        setProducts(res.data.data);
      } catch (err) {
        console.error('Lỗi khi lấy danh sách sản phẩm:', err);
      }
    };

    fetchProducts();
    fetchCategories();
  }, [fillter]);

  useEffect(() => {
    setExtraSidebar(<CategoryList categories={categories} />);
    return () => setExtraSidebar(null); // clear khi thoát trang
  }, [categories, setExtraSidebar]);

  return (
    <div className="p-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-secondary text-2xl font-bold">All products</p>
          <p className="font-secondary font-semibold">Home / All Products</p>
        </div>
        <Link
          className="bg-primary rounded-2xl p-3 text-white"
          to={'/admin/products/create'}
        >
          Add new product
        </Link>
      </div>
      {/* product list */}
      <div className="mt-2 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {/* product Box */}
        {products.map((product) => (
          <div key={product._id} className="rounded-sm bg-white p-3">
            <div className="flex items-center gap-3">
              <img
                className="h-[100px] w-[100px] object-cover"
                src={product.imgUrl}
                alt=""
              />
              <div>
                <p className="font-primary text-2xl font-medium">
                  {product.name}
                </p>
                <p className="font-secondary text-sm text-gray-400">
                  {product.categoryName}
                </p>
                <p className="font-primary text-sm font-bold">
                  {product.price}
                </p>
              </div>
            </div>
            <div className="mt-2">
              <p className="font-primary text-2xl font-medium">Summary</p>
              <p className="font-secondary text-sm text-gray-400">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              </p>
            </div>
            <div className="rounded-md border-2 border-gray-300 p-2">
              <div className="flex items-center justify-between">
                Sales
                <div className="flex items-center gap-1">
                  <FaArrowUpLong className="text-primary" />
                  <span className="font-secondary">{product.quantitySold}</span>
                </div>
              </div>
              <hr className="my-1"></hr>
              <div className="flex items-center justify-between">
                remaining Product
                <div className="flex items-center gap-1">
                  <div className="h-1 w-[50px] rounded-2xl bg-gray-500"></div>
                  <span className="font-secondary">{product.quantity}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
