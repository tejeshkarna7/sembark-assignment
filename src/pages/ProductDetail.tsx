/** React Imports */
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

/** Components */
import { apiService } from '../api/apiService';
import { useCart } from '../context/CartContext';
import { Product } from '../context/ProductContext';

/** Main Export */
export const ProductDetail: React.FC = () => {

    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [addedToCart, setAddedToCart] = useState(false);

    useEffect(() => {
        const loadProduct = async () => {
            try {
                if (!id) throw new Error('Product ID not found');
                const productData = await apiService.fetchProductById(parseInt(id));
                setProduct(productData);
                setError(null);
            } catch (err) {
                setError('Failed to load product details');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        loadProduct();
    }, [id]);
    const handleAddToCart = () => {
        if (product) {
            addToCart({
                id: product.id,
                title: product.title,
                price: product.price,
                quantity,
            });
            setAddedToCart(true);
            setTimeout(() => setAddedToCart(false), 2000);
        }
    };
    if (loading) {
        return (
            <main className="p-8 text-center">
                <p className="text-lg text-gray-600">Loading product details...</p>
            </main>
        );
    }
    if (error || !product) {
        return (
            <main className="p-8 text-center">
                <p className="text-red-600 text-lg mb-6">{error || 'Product not found'}</p>
                <button
                    onClick={() => navigate('/')}
                    className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                    Back to Home
                </button>
            </main>
        );
    }
    const imageUrl = product.images?.[0] || product.image || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%23e5e7eb" width="400" height="400"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="20" fill="%239ca3af"%3EProduct Image Not Available%3C/text%3E%3C/svg%3E';
    return (
        <main className="p-8 max-w-4xl mx-auto">
            <button
                onClick={() => navigate('/')}
                className="mb-6 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors text-sm"
            >
                ← Back to Home
            </button>
            <article className="slide-in grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-100 p-8 rounded-lg border border-gray-200">
                <section className="slide-in flex items-start justify-center">
                    <img
                        src={imageUrl}
                        alt={product.title}
                        className="w-full h-auto rounded-lg object-cover hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                            e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%23e5e7eb" width="400" height="400"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="20" fill="%239ca3af"%3EProduct Image Not Available%3C/text%3E%3C/svg%3E';
                        }}
                    />
                </section>
                <section className="flex flex-col gap-6">
                    <header>
                        <h1 className="text-4xl font-bold mb-2">{product.title}</h1>
                        <p className="text-gray-600 text-base">
                            {typeof product.category === 'string' ? product.category : product.category?.name || 'Uncategorized'}
                        </p>
                    </header>
                    <div className="text-3xl font-bold text-blue-600">
                        Price: ${product.price.toFixed(2)}
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold mb-2">Description</h2>
                        <p className="text-gray-700 leading-relaxed">{product.description}</p>
                    </div>
                    <div className="flex gap-4 items-center">
                        <label className="font-bold">
                            Quantity:
                            <input
                                type="number"
                                min="1"
                                max="10"
                                value={quantity}
                                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                className="ml-2 px-3 py-2 rounded border border-gray-300 w-16 text-center"
                            />
                        </label>
                    </div>
                    <button
                        onClick={handleAddToCart}
                        className="px-6 py-3 bg-black text-white rounded-xl font-bold text-lg"
                    >
                        Add to My Cart
                    </button>
                    {addedToCart && (
                        <div className="slide-in px-4 py-3 bg-green-100 text-green-700 rounded text-center font-semibold">
                            ✓ Added to cart successfully!
                        </div>
                    )}
                </section>
            </article>
        </main>
    );
};