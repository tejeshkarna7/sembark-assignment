import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { CategoryFilter } from '../components/CategoryFilter';
import { Loader } from '../components/Loader';
import { useProduct } from '../context/ProductContext';
import { useProducts } from '../hooks/useProducts';

/**
 * Home page – displays the product grid and category filter.
 * Data fetching is delegated to the reusable `useProducts` hook, which
 * abstracts the API calls and provides loading / error state. The
 * Context API continues to manage UI state such as the selected
 * categories and the scroll position.
 */
export const Home: React.FC = () => {
    // URL search params for persisting filter selections
    const [searchParams, setSearchParams] = useSearchParams();
    const [visibleCount, setVisibleCount] = useState(10);
    const [isScrollLoading, setIsScrollLoading] = useState(false);
    const observerRef = useRef<HTMLDivElement | null>(null);

    // Context for category selection & dispatch actions
    const { state, dispatch } = useProduct();
    const { selectedCategories } = state;

    // Custom hook provides product data and loading / error flags
    const { products, categories, loading, error, refresh } = useProducts();

    // Sync selected categories from URL on component mount
    useEffect(() => {
        const categoriesParam = searchParams.get('categories');
        if (categoriesParam) {
            const selected = categoriesParam.split(',').filter(Boolean);
            dispatch({ type: 'SET_SELECTED_CATEGORIES', payload: selected });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Refresh data on mount – the hook already loads, but we expose it for manual reloads if needed
    useEffect(() => {
        refresh();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleCategoryChange = (category: string) => {
        dispatch({ type: 'TOGGLE_CATEGORY', payload: category });
        setVisibleCount(10);
        const currentlySelected = state.selectedCategories.includes(category)
            ? state.selectedCategories.filter((c) => c !== category)
            : [...state.selectedCategories, category];
        setSearchParams(
            currentlySelected.length ? { categories: currentlySelected.join(',') } : {}
        );
    };

    const getCategoryName = (category: any): string =>
        typeof category === 'string' ? category : category?.name || 'Uncategorized';

    // Filter and sort products based on selected categories from context
    const filteredProducts = selectedCategories.length === 0
        ? products
        : products.filter((p) => selectedCategories.includes(getCategoryName(p.category)));

    const sortedProducts = filteredProducts.sort((a, b) => a.price - b.price);

    const displayedProducts = sortedProducts.slice(0, visibleCount);
    const hasMore = visibleCount < sortedProducts.length;

    // Infinite scroll observer – loads more items when reaching the sentinel element
    useEffect(() => {
        const target = observerRef.current;
        if (!target || !hasMore || isScrollLoading || loading) return;
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setIsScrollLoading(true);
                setTimeout(() => {
                    setVisibleCount((prev) => prev + 10);
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
                                {displayedProducts.map((product) => (
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
