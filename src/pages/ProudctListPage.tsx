import { CategoryList } from '@/components/category/CategoryList';
import { CenterScreenLoader } from '@/components/CenterScreenLoader';
import { ProductList } from '@/components/product/list/ProductList';
import productApi from '@/service/ProductService';
import { Product, ProductFillter } from '@/types/product';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { RotateCcw, Filter } from 'lucide-react';

export enum SortOption {
  Latest = 0,
  Price_Asc = 1,
  Price_Desc = 2,
  Rating_Asc = 3,
  Rating_Desc = 4,
}

export const ProductListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const nameQuery = searchParams.get('name') || '';

  const [loadMore, setLoadMore] = useState(true);
  const [fillter, setFilter] = useState<ProductFillter>({
    page: 1,
    limit: 9,
    sort: 0,
    categoryId: '',
    name: nameQuery,
    minPrice: undefined,
    maxPrice: undefined,
  });

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);

  // Sync filter with URL name query
  useEffect(() => {
    setFilter((prev) => ({ ...prev, name: nameQuery, page: 1 }));
  }, [nameQuery]);

  const handleCategoryChange = (categoryId: string) => {
    setFilter((prev) => ({
      ...prev,
      page: 1,
      categoryId: categoryId,
    }));
  };

  const handlePriceChange = (type: 'min' | 'max', value: string) => {
    const numValue = value === '' ? undefined : Number(value);
    setFilter((prev) => ({
      ...prev,
      page: 1,
      [type === 'min' ? 'minPrice' : 'maxPrice']: numValue,
    }));
  };

  const clearFilters = () => {
    setSearchParams({}); // Clear URL params too
    setFilter({
      page: 1,
      limit: 9,
      sort: 0,
      categoryId: '',
      name: '',
      minPrice: undefined,
      maxPrice: undefined,
    });
  };

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await productApi.getAll(fillter);

        if (isMounted) {
          const { data, pagination: paginRes } = res.data;

          if (fillter.page === 1) {
            setProducts(data);
          } else {
            setProducts((prev) => [...prev, ...data]);
          }
          setTotalProducts(paginRes.total);
          const hasMore = fillter.page * fillter.limit < paginRes.total;
          setLoadMore(hasMore);
          setLoading(false);
        }
      } catch (err) {
        console.error('Lỗi khi lấy danh sách sản phẩm:', err);
        setLoading(false);
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, [fillter]);

  const start = totalProducts === 0 ? 0 : (fillter.page - 1) * fillter.limit + 1;
  const end = Math.min(fillter.page * fillter.limit, totalProducts);

  return (
    <>
      {loading && <CenterScreenLoader />}
      <div className="container mx-auto px-4 md:px-8 pt-[100px]">
        <div className="text-center mb-12">
          <h1 className="font-primary text-4xl md:text-5xl font-bold mb-4">Product Catalog</h1>
          {nameQuery && (
            <p className="text-lg text-light">
              Results for: <span className="text-secondary font-bold">"{nameQuery}"</span>
            </p>
          )}
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="col-span-12 md:col-span-9 order-2 md:order-1">
            {/* Sort Header */}
            <div className="mb-8 flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <p className="text-sm text-light whitespace-nowrap">
                Showing {start}-{end} of {totalProducts}
              </p>
              
              <select
                className="rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                value={fillter.sort}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  setFilter((prev) => ({ ...prev, page: 1, sort: value }));
                }}
              >
                <option value={0}>Latest Arrivals</option>
                <option value={SortOption.Price_Asc}>Price: Low to High</option>
                <option value={SortOption.Price_Desc}>Price: High to Low</option>
                <option value={SortOption.Rating_Asc}>Top Rated</option>
                <option value={SortOption.Rating_Desc}>Review Count</option>
              </select>
            </div>

            {products.length > 0 ? (
              <ProductList products={products} />
            ) : (
              <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                <Filter className="mx-auto text-gray-300 mb-4" size={48} />
                <p className="text-xl font-medium text-gray-500">No products found matching your search</p>
                <button 
                  onClick={clearFilters}
                  className="mt-4 text-primary font-semibold hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="col-span-12 md:col-span-3 order-1 md:order-2">
            <div className="sticky top-[100px] flex flex-col gap-6">
              <button
                onClick={clearFilters}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg border border-gray-200 text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                <RotateCcw size={16} />
                Reset Filters
              </button>

              <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <h3 className="text-lg font-bold mb-4 font-secondary">Price Range</h3>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">$</span>
                    <input
                      type="number"
                      placeholder="Min"
                      className="w-full pl-6 pr-2 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
                      value={fillter.minPrice || ''}
                      onChange={(e) => handlePriceChange('min', e.target.value)}
                    />
                  </div>
                  <span className="text-gray-400">-</span>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">$</span>
                    <input
                      type="number"
                      placeholder="Max"
                      className="w-full pl-6 pr-2 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
                      value={fillter.maxPrice || ''}
                      onChange={(e) => handlePriceChange('max', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <CategoryList
                selectedCategoryId={fillter.categoryId}
                onCategoryChange={handleCategoryChange}
              />
            </div>
          </div>
        </div>

        {loadMore && (
          <div className="mt-16 flex items-center justify-center">
            <button
              onClick={() => setFilter((prev) => ({ ...prev, page: prev.page + 1 }))}
              className="px-8 py-3 bg-primary text-white font-semibold rounded-lg shadow-lg hover:shadow-primary/30 transition-premium"
            >
              Discover More
            </button>
          </div>
        )}
      </div>
    </>
  );
};
