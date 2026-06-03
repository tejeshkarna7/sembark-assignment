import React from 'react';
import { Category } from 'store/ProductStore';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategories: string[];
  onCategoryChange: (category: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategories,
  onCategoryChange,
}) => {
  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 mb-4">
      <h2 className="text-xl font-semibold mb-4">Filter by Category</h2>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const categoryName = typeof category === 'string' ? category : category.name;
          const categoryId = typeof category === 'string' ? category : category.id;
          const isSelected = selectedCategories.includes(categoryName);

          return (
            <label
              key={categoryId}
              className={`flex items-center cursor-pointer px-3 py-2 rounded-xl border transition-all duration-200 select-none ${isSelected
                ? 'border-black bg-white text-black font-semibold'
                : 'border-gray-200 bg-gray-50/50 text-gray-500 hover:bg-gray-100 hover:border-gray-300 font-medium'
                }`}
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => onCategoryChange(categoryName)}
                className="sr-only"
              />
              {isSelected ? (
                <span className="flex items-center justify-center w-5 h-5 rounded-lg bg-black text-white mr-2.5 flex-shrink-0">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </span>
              ) : (
                <span className="flex items-center justify-center w-5 h-5 rounded-lg border border-gray-300 text-gray-400 mr-2.5 flex-shrink-0 bg-white">
                  <svg className="w-3 h-3 text-gray-300" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </span>
              )}
              <span className="text-[14px] leading-none">{categoryName}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
};
