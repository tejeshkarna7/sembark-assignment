import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { ProductCard } from '../components/ProductCard';
import { CategoryFilter } from '../components/CategoryFilter';
import { Loader } from '../components/Loader';
import { productStore } from 'store/ProductStore';
import { apiService } from 'api/apiService';

export const Home: React.FC = observer(() => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [visibleCount, setVisibleCount] = useState(10);
  const [isScrollLoading, setIsScrollLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        productStore.setLoading(true);

        const categories = await apiService.fetchCategories();
        productStore.setCategories(categories);

        const products = await apiService.fetchProducts();
        productStore.setProducts(products);

        const categoriesParam = searchParams.get('categories');
        if (categoriesParam) {
          const selectedCats = categoriesParam.split(',').filter(Boolean);
          productStore.setSelectedCategories(selectedCats);
        }

        productStore.setError(null);
      } catch (error) {
        productStore.setError('Failed to load products');
        console.error(error);
      } finally {
        productStore.setLoading(false);
      }
    };

    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Reset pagination when categories filter changes
  const handleCategoryChange = async (category: string) => {
    productStore.toggleCategory(category);
    setVisibleCount(10);

    const newCategories = productStore.selectedCategories.join(',');
    setSearchParams(newCategories ? { categories: newCategories } : {});

    try {
      productStore.setLoading(true);
      const categoryIds = productStore.categories
        .filter((cat) => productStore.selectedCategories.includes(cat.name))
        .map((cat) => cat.id);

      if (categoryIds.length > 0) {
        const products = await apiService.fetchProductsByCategories(categoryIds);
        productStore.setProducts(products);
      } else {
        const products = await apiService.fetchProducts();
        productStore.setProducts(products);
      }
    } catch (error) {
      console.error(error);
    } finally {
      productStore.setLoading(false);
    }
  };

  const getCategoryName = (category: string | any): string => {
    if (typeof category === 'string') return category;
    return category?.name || 'Uncategorized';
  };

  const getFilteredAndSortedProducts = () => {
    return [...productStore.getFilteredProducts()].map((p) => ({
      ...p,
      category: getCategoryName(p.category),
    })).sort((a, b) => a.price - b.price);
  };

  const sortedProducts = getFilteredAndSortedProducts();
  const displayedProducts = sortedProducts.slice(0, visibleCount);
  const hasMore = visibleCount < sortedProducts.length;

  // Intersection Observer for Infinite Scroll
  useEffect(() => {
    const currentTarget = observerRef.current;
    if (!currentTarget || !hasMore || isScrollLoading || productStore.loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsScrollLoading(true);
          setTimeout(() => {
            setVisibleCount((prev) => prev + 10);
            setIsScrollLoading(false);
          }, 800); // 800ms delay to show loading animation
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(currentTarget);

    return () => {
      observer.unobserve(currentTarget);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasMore, isScrollLoading, productStore.loading]);

  return (
    <main className="p-8">
      <h1 className="mb-6 text-4xl font-bold">Products</h1>

      <div className=" gap-8">
        <CategoryFilter
          categories={productStore.categories}
          selectedCategories={productStore.selectedCategories}
          onCategoryChange={handleCategoryChange}
        />

        <section className="md:col-span-3">
          {productStore.loading ? (
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 animate-spin"></div>
              </div>
              <p className="text-gray-600 font-medium">Loading...</p>
            </div>
          ) : productStore.error ? (
            <div className="text-red-600 p-4 bg-red-50 rounded">
              <p>{productStore.error}</p>
            </div>
          ) : sortedProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {displayedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Infinite Scroll target observer / loader */}
              {hasMore && (
                <div ref={observerRef} className="mt-8">
                  {isScrollLoading && <Loader />}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-lg text-gray-600">No products found</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
});

