import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export const Header: React.FC = () => {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <header className="bg-black px-8 py-4 flex justify-between items-center border-b border-gray-800">
      <Link
        to="/"
        className="text-white no-underline text-2xl font-bold hover:text-blue-400 transition-colors"
      >
        Sembark Shop
      </Link>
      <Link
        to="/cart"
        className="flex items-center gap-2 text-white no-underline text-base px-4 py-2"
      >
        <div className="relative flex items-center">
          <svg
            className="w-6 h-6 mr-1"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          {totalItems > 0 && (
            <>
              {/* Visual Badge (Circle) */}
              <span className="absolute -top-1.5 -right-1.5 bg-blue-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-black">
                {totalItems}
              </span>
              {/* Screen-reader / Cypress test match support */}
              <span className="sr-only">({totalItems})</span>
            </>
          )}
        </div>
        <span className="font-medium">Cart</span>
      </Link>
    </header>
  );
};
