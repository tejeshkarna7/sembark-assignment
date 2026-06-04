/** React Imports */
import React from 'react';
import { Link } from 'react-router-dom';

/** Components */
import { Product } from '../context/ProductContext';

interface ProductCardProps {
    product: Product;
    className?: string;
}

const getCategoryName = (category: any): string => {
    if (typeof category === 'string') return category;
    return category?.name || 'Uncategorized';
};


/** Main Export */
export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const imageUrl = product.images?.[0] || product.image || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="200"%3E%3Crect fill="%23ddd" width="300" height="200"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="18" fill="%23999"%3EProduct Image%3C/text%3E%3C/svg%3E';

    return (
        <Link
            to={`/product/${product.id}`}
            className="no-underline text-inherit"
        >
            <article className="slide-in border border-gray-300 rounded-lg overflow-hidden bg-white transition-all duration-300 cursor-pointer h-full flex flex-col ">
                <div className="w-full h-48 overflow-hidden bg-gray-200 flex items-center justify-center">
                    <img
                        src={imageUrl}
                        alt={product.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                            e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="200"%3E%3Crect fill="%23e5e7eb" width="300" height="200"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="16" fill="%239ca3af"%3EImage Not Available%3C/text%3E%3C/svg%3E';
                        }}
                    />
                </div>
                <div className="p-4 flex-1 flex flex-col">
                    <h3 className="text-base font-semibold mb-2 line-clamp-2 min-h-14">
                        {product.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 flex-1">
                        {getCategoryName(product.category)}
                    </p>
                    <div className="text-lg font-bold text-blue-600">
                        ${product.price.toFixed(2)}
                    </div>
                </div>
            </article>
        </Link>
    );
};
