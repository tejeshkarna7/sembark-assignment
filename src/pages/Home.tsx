import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { CategoryFilter } from '../components/CategoryFilter';
import { Loader } from '../components/Loader';
import { apiService } from '../api/apiService';
import { useProduct } from '../context/ProductContext';

export const Home: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [visibleCount, setVisibleCount] = useState(10);
  const [isScrollLoading, setIsScrollLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const { state, dispatch, getFilteredProducts } = useProduct();
  const { loading, error, selectedCategories, categories } = state;

  // Initial data load
  useEffect(() => {
    const loadData = async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const [cats, prods] = await Promise.all([
          apiService.fetchCategories(),
          apiService.fetchProducts(),
        ]);
        // Debug: log product count after loading
        console.log('Loaded products count:', prods.length);
        dispatch({ type: 'SET_CATEGORIES', payload: cats });
        dispatch({ type: 'SET_PRODUCTS', payload: prods });
        dispatch({ type: 'SET_ERROR', payload: null });
      } catch (e) {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to load products' });
        console.error(e);
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync selected categories from URL on mount
  useEffect(() => {
    const categoriesParam = searchParams.get('categories');
    if (categoriesParam) {
      const selected = categoriesParam.split(',').filter(Boolean);
      dispatch({ type: 'SET_SELECTED_CATEGORIES', payload: selected });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCategoryChange = (category: string) => {
    dispatch({ type: 'TOGGLE_CATEGORY', payload: category });
    setVisibleCount(10);
    const currentlySelected = state.selectedCategories.includes(category)
      ? state.selectedCategories.filter(c => c !== category)
      : [...state.selectedCategories, category];
    setSearchParams(currentlySelected.length ? { categories: currentlySelected.join(',') } : {});
  };

  const getCategoryName = (category: string | any): string =>
    typeof category === 'string' ? category : category?.name || 'Uncategorized';

  const filteredProducts = getFilteredProducts()
    .map(p => ({ ...p, category: getCategoryName(p.category) }))
    .sort((a, b) => a.price - b.price);

  const displayedProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  // Infinite scroll observer
  useEffect(() => {
    const target = observerRef.current;
    if (!target || !hasMore || isScrollLoading || loading) return;
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setIsScrollLoading(true);
        setTimeout(() => {
          setVisibleCount(prev => prev + 10);
          setIsScrollLoading(false);
        }, 800);
      }
    }, { threshold: 0.1 });
    observer.observe(target);
    return () => observer.unobserve(target);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasMore, isScrollLoading, loading]);

  return (
    <main className="p-8">
      <h1 className="mb-6 text-4xl font-bold">Products</h1>
      <div className="gap-8">
        <CategoryFilter
          categories={categories}
          selectedCategories={selectedCategories}
          onCategoryChange={handleCategoryChange}
        />
        <section className="md:col-span-3">
          {loading ? (
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 rounded-full border-4 border-gray-200" />
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 animate-spin" />
              </div>
              <p className="text-gray-600 font-medium">Loading...</p>
            </div>
          ) : error ? (
            <div className="text-red-600 p-4 bg-red-50 rounded">
              <p>{error}</p>
            </div>
          ) : displayedProducts.length ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {displayedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
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
};
