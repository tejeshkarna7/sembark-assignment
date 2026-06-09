/** React Imports */
import React from 'react';

/** Components */
import { Category } from '../context/ProductContext';

interface CategoryFilterProps {
    categories: Category[];
    selectedCategories: string[];
    onCategoryChange: (category: string) => void;
    searchTerm: string;
    onSearchChange: (value: string) => void;
    sortOrder: 'low-to-high' | 'high-to-low';
    onSortChange: (value: 'low-to-high' | 'high-to-low') => void;
}

/** Main Export */
export const CategoryFilter: React.FC<CategoryFilterProps> = ({
    categories,
    selectedCategories,
    onCategoryChange,
    searchTerm,
    onSearchChange,
    sortOrder,
    onSortChange,
}) => {
    if (!categories || categories.length === 0) {
        return null;
    }

    return (
        <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-200 mb-4">
            <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Filter by Category</h2>
            <div className="mb-3 sm:mb-4 flex flex-wrap gap-2 sm:gap-3">
                <input
                    id="product-search"
                    type="search"
                    value={searchTerm}
                    onChange={(event) => onSearchChange(event.target.value)}
                    placeholder="Search by title"
                    className="w-full sm:w-[350px] max-w-full rounded-lg border border-gray-300 px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
                />
                <fieldset className="flex max-w-full flex-wrap items-center gap-2 rounded-lg border border-gray-300 p-1">
                    <legend className="sr-only">Sort by price</legend>
                    {[
                        { value: 'low-to-high', label: 'Low to High' },
                        { value: 'high-to-low', label: 'High to Low' },
                    ].map((option) => {
                        const isSelected = sortOrder === option.value;

                        return (
                            <label
                                key={option.value}
                                className={`flex cursor-pointer items-center rounded-md px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm font-medium transition ${isSelected
                                    ? 'bg-black text-white'
                                    : 'bg-white text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="price-sort"
                                    value={option.value}
                                    checked={isSelected}
                                    onChange={() =>
                                        onSortChange(option.value as 'low-to-high' | 'high-to-low')
                                    }
                                    className="sr-only"
                                />
                                <span
                                    className={`mr-1.5 sm:mr-2 flex h-3.5 w-3.5 sm:h-4 sm:w-4 items-center justify-center rounded-full border ${isSelected
                                        ? 'border-white'
                                        : 'border-gray-300'
                                        }`}
                                >
                                    {isSelected && (
                                        <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-white" />
                                    )}
                                </span>
                                {option.label}
                            </label>
                        );
                    })}
                </fieldset>
            </div>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {categories.map((category) => {
                    const categoryName = typeof category === 'string' ? category : category.name;
                    const categoryId = typeof category === 'string' ? category : category.id;
                    const isSelected = selectedCategories.includes(categoryName);

                    return (
                        <label
                            key={categoryId}
                            className={`flex items-center cursor-pointer px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg sm:rounded-xl border transition-all duration-200 select-none ${isSelected
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
                                <span className="flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 rounded-md sm:rounded-lg bg-black text-white mr-2 sm:mr-2.5 flex-shrink-0">
                                    <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>
                                </span>
                            ) : (
                                <span className="flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 rounded-md sm:rounded-lg border border-gray-300 text-gray-400 mr-2 sm:mr-2.5 flex-shrink-0 bg-white">
                                    <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-300" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>
                                </span>
                            )}
                            <span className="text-xs sm:text-[14px] leading-none">{categoryName}</span>
                        </label>
                    );
                })}
            </div>
        </div>
    );
};
