import { useEffect, useState, useCallback } from 'react';
import { apiService } from '../api/apiService';
import { Product, Category } from '../context/ProductContext';

/**
 * useProducts – a reusable hook that encapsulates the data fetching logic for
 * products and categories. It returns the fetched data, loading and error flags,
 * and a `refresh` function that can be called to re‑fetch the data.
 */
export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [cats, prods] = await Promise.all([
        apiService.fetchCategories(),
        apiService.fetchProducts(),
      ]);
      setCategories(cats);
      setProducts(prods);
    } catch (e) {
      console.error('Error loading data', e);
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  }, []);

  // Load once on mount
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    products,
    categories,
    loading,
    error,
    refresh: fetchData,
  };
};
