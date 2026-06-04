
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string | Category;
  images: string[];
  image?: string;
}

export interface Category {
  id: number;
  name: string;
  image?: string;
  slug?: string;
  creationAt?: string;
  updatedAt?: string;
}

class ProductStore {
  products: Product[] = [];
  categories: Category[] = [];
  loading: boolean = false;
  error: string | null = null;
  selectedCategories: string[] = [];


  setProducts(products: Product[]) {
    this.products = products;
  }

  setCategories(categories: Category[]) {
    this.categories = categories;
  }

  setLoading(loading: boolean) {
    this.loading = loading;
  }

  setError(error: string | null) {
    this.error = error;
  }

  setSelectedCategories(categories: string[]) {
    this.selectedCategories = categories;
  }

  addSelectedCategory(category: string) {
    if (!this.selectedCategories.includes(category)) {
      this.selectedCategories.push(category);
    }
  }

  removeSelectedCategory(category: string) {
    this.selectedCategories = this.selectedCategories.filter((c) => c !== category);
  }

  toggleCategory(category: string) {
    if (this.selectedCategories.includes(category)) {
      this.removeSelectedCategory(category);
    } else {
      this.addSelectedCategory(category);
    }
  }

  clearSelectedCategories() {
    this.selectedCategories = [];
  }

  getFilteredProducts() {
    if (this.selectedCategories.length === 0) {
      return this.products;
    }
    return this.products.filter((product) => {
      const categoryName = typeof product.category === 'string'
        ? product.category
        : product.category?.name || '';
      return this.selectedCategories.includes(categoryName);
    });
  }
}
export const productStore = new ProductStore();