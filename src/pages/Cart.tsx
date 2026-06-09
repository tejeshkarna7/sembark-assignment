/** React Imports */
import React from 'react';
import { Link } from 'react-router-dom';

/** Components */
import { useCart } from '../context/CartContext';

/** Main Export */
export const Cart: React.FC = () => {
    const { items, removeFromCart, getTotalValue, getTotalItems } = useCart();
    return (
        <main className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
            <h1 className="mb-4 sm:mb-6 text-3xl sm:text-4xl font-bold">Shopping Cart</h1>
            {items.length === 0 ? (
                <div className="bg-white p-5 sm:p-8 rounded-lg text-center border border-gray-200">
                    <p className="text-base sm:text-lg mb-4 sm:mb-6 text-gray-600">
                        Your cart is empty
                    </p>
                    <Link
                        to="/"
                        className="inline-block px-4 py-2.5 sm:px-6 sm:py-3 bg-blue-600 text-white no-underline rounded hover:bg-blue-700 transition-colors text-sm sm:text-base"
                    >
                        Continue Shopping
                    </Link>
                </div>
            ) : (
                <div>
                    <div className="overflow-x-auto mb-4 sm:mb-6 bg-white rounded-lg border border-gray-200">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-100 border-b-2 border-gray-300">
                                    <th className="px-3 py-2 sm:px-4 sm:py-3 text-left font-semibold text-sm sm:text-base">Product</th>
                                    <th className="px-3 py-2 sm:px-4 sm:py-3 text-center font-semibold text-sm sm:text-base">Price</th>
                                    <th className="px-3 py-2 sm:px-4 sm:py-3 text-center font-semibold text-sm sm:text-base">Quantity</th>
                                    <th className="px-3 py-2 sm:px-4 sm:py-3 text-center font-semibold text-sm sm:text-base">Total</th>
                                    <th className="px-3 py-2 sm:px-4 sm:py-3 text-center font-semibold text-sm sm:text-base">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item, index) => (
                                    <tr
                                        key={item.id}
                                        className={`slide-in ${index < items.length - 1 ? 'border-b border-gray-200' : ''}`}
                                    >
                                        <td className="px-3 py-2 sm:px-4 sm:py-3">
                                            <strong className="text-gray-900 text-sm sm:text-base">{item.title}</strong>
                                        </td>
                                        <td className="px-3 py-2 sm:px-4 sm:py-3 text-center text-gray-700 text-sm sm:text-base">
                                            ${item.price.toFixed(2)}
                                        </td>
                                        <td className="px-3 py-2 sm:px-4 sm:py-3 text-center text-gray-700 text-sm sm:text-base">
                                            {item.quantity}
                                        </td>
                                        <td className="px-3 py-2 sm:px-4 sm:py-3 text-center font-bold text-gray-900 text-sm sm:text-base">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </td>
                                        <td className="px-3 py-2 sm:px-4 sm:py-3 text-center">
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="px-3 py-1.5 sm:px-4 sm:py-2 bg-red-600 text-white rounded text-xs sm:text-sm hover:bg-red-700 transition-colors"
                                            >
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="bg-white p-5 sm:p-8 rounded-lg border border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 sm:gap-6">
                        <div>
                            <p className="mb-2 text-gray-700 text-sm sm:text-base">
                                Total Items: <strong className="font-bold">{getTotalItems()}</strong>
                            </p>
                            <p className="text-xl sm:text-2xl font-bold text-blue-600">
                                Total: ${getTotalValue().toFixed(2)}
                            </p>
                        </div>
                        <Link
                            to="/"
                            className="px-4 py-2.5 sm:px-6 sm:py-3 bg-blue-600 text-white no-underline rounded hover:bg-blue-700 transition-colors text-sm sm:text-base"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            )}
        </main>
    );
};
