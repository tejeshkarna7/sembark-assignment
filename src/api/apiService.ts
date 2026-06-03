import { Category, Product } from "store/ProductStore";

const API_BASE_URL = 'https://api.escuelajs.co/api/v1';

export const apiService = {
  async fetchProducts(categoryId?: number): Promise<Product[]> {
    try {
      const url = categoryId
        ? `${API_BASE_URL}/products?categoryId=${categoryId}`
        : `${API_BASE_URL}/products`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch products');
      return await response.json();
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  async fetchProductById(id: number): Promise<Product> {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`);
      if (!response.ok) throw new Error('Failed to fetch product');
      return await response.json();
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  },

  async fetchCategories(): Promise<Category[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/categories`);
      if (!response.ok) throw new Error('Failed to fetch categories');
      return await response.json();
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  async fetchProductsByCategories(categoryIds: number[]): Promise<Product[]> {
    try {
      const promises = categoryIds.map((id) => this.fetchProducts(id));
      const results = await Promise.all(promises);
      const allProducts = results.flat();
      const uniqueProducts = Array.from(
        new Map(allProducts.map((p) => [p.id, p])).values()
      );
      return uniqueProducts;
    } catch (error) {
      console.error('Error fetching products by categories:', error);
      throw error;
    }
  },
};