import React, { createContext, useContext, useReducer, ReactNode } from 'react';

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

interface ProductState {
  products: Product[];
  categories: Category[];
  loading: boolean;
  error: string | null;
  selectedCategories: string[];
}

type ProductAction =
  | { type: 'SET_PRODUCTS'; payload: Product[] }
  | { type: 'SET_CATEGORIES'; payload: Category[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_SELECTED_CATEGORIES'; payload: string[] }
  | { type: 'TOGGLE_CATEGORY'; payload: string }
  | { type: 'CLEAR_SELECTED_CATEGORIES' };

interface ProductContextType {
  state: ProductState;
  dispatch: React.Dispatch<ProductAction>;
  getFilteredProducts: () => Product[];
}

const initialState: ProductState = {
  products: [],
  categories: [],
  loading: false,
  error: null,
  selectedCategories: [],
};

function productReducer(state: ProductState, action: ProductAction): ProductState {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };
    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_SELECTED_CATEGORIES':
      return { ...state, selectedCategories: action.payload };
    case 'TOGGLE_CATEGORY': {
      const category = action.payload;
      const exists = state.selectedCategories.includes(category);
      return {
        ...state,
        selectedCategories: exists
          ? state.selectedCategories.filter((c) => c !== category)
          : [...state.selectedCategories, category],
      };
    }
    case 'CLEAR_SELECTED_CATEGORIES':
      return { ...state, selectedCategories: [] };
    default:
      return state;
  }
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  const getFilteredProducts = (): Product[] => {
    if (state.selectedCategories.length === 0) {
      return state.products;
    }
    return state.products.filter((product) => {
      const categoryName =
        typeof product.category === 'string'
          ? product.category
          : product.category?.name || '';
      return state.selectedCategories.includes(categoryName);
    });
  };

  return (
    <ProductContext.Provider value={{ state, dispatch, getFilteredProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProduct must be used within a ProductProvider');
  }
  return context;
};
