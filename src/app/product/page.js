"use client";
import { useState, useEffect } from 'react';
import { ShoppingCart, Heart, Star, Truck, Shield, RotateCcw, Check } from 'lucide-react';

export default function Product() {
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [selectedColor, setSelectedColor] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const [relatedLoading, setRelatedLoading] = useState(false);
    const [isInCart, setIsInCart] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const id = params.get('_id');

        if (id) {
            fetchProduct(id);
        }
    }, []);

    const fetchProduct = async (id) => {
        try {
            setLoading(true);
            const res = await fetch(`/api/getProducts?findOne=${id}`);
            if (res.ok) {
                const data = await res.json();
                setProduct(data);
                setSelectedColor(data.colors[0]);

                // Fetch related products
                fetchRelatedProducts(data.category);
            }
        } catch (error) {
            console.error('Error fetching product:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchRelatedProducts = async (category, page = 1) => {
        try {
            setRelatedLoading(true);
            const res = await fetch(`/api/getProducts?filter=${category}&limit=12&page=${page}`);
            const data = await res.json();

            if (page === 1) {
                setRelatedProducts(data.products);
            } else {
                setRelatedProducts(prev => [...prev, ...data.products]);
            }
            setHasNextPage(data.hasNextPage);
        } catch (error) {
            console.error('Error fetching related products:', error);
        } finally {
            setRelatedLoading(false);
        }
    };

    const addToCart = () => {
        const cart = JSON.parse(localStorage.getItem('plastifyCarts') || '[]');
        const existingItem = cart.find(item => item._id === product._id && item.color === selectedColor);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({
                _id: product._id,
                quantity,
                color: selectedColor
            });
        }

        localStorage.setItem('plastifyCarts', JSON.stringify(cart));
        setIsInCart(true);
    };

    const buyNow = () => {
        addToCart();
        window.location.href = '/checkout';
    };

    const loadMore = () => {
        const currentPage = Math.ceil(relatedProducts.length / 12) + 1;
        fetchRelatedProducts(product.category, currentPage);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-linear-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center w-xl">
                <div className="text-center">
                    <div className="relative">
                        <div className="animate-spin rounded-full h-24 w-24 border-8 border-emerald-200 border-t-emerald-600 mx-auto"></div>
                        <ShoppingCart className="w-10 h-10 text-emerald-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                    </div>
                    <p className="mt-6 text-xl font-semibold text-emerald-700 animate-pulse">Loading Product...</p>
                    <div className="mt-4 flex gap-2 justify-center">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-linear-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
                <div className="text-center bg-white rounded-3xl shadow-2xl p-12 max-w-md">
                    <div className="mb-6">
                        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-12 h-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Product Not Found</h2>
                    <p className="text-gray-600 mb-8">We couldn't find the product you're looking for. It may have been removed or is temporarily unavailable.</p>
                    <button
                        onClick={() => window.location.href = '/home'}
                        className="px-8 py-4 bg-linear-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all transform hover:scale-105 shadow-lg"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-emerald-50 to-teal-50">
            <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                {/* Product Detail Section */}
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                        {/* Product Image */}
                        <div className="relative group">
                            <div className="aspect-square bg-linear-to-br from-emerald-100 to-teal-100 rounded-2xl overflow-hidden flex items-center justify-center">
                                <img
                                    src={`${process.env.NEXT_PUBLIC_IMAGE}/${product.img}.jpg`}
                                    alt={product.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                            <button className="absolute top-4 right-4 bg-white p-3 rounded-full shadow-lg hover:bg-red-50 transition-colors">
                                <Heart className="w-6 h-6 text-gray-600" />
                            </button>
                        </div>

                        {/* Product Info */}
                        <div className="flex flex-col justify-between">
                            <div>
                                <div className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold mb-4">
                                    {product.category}
                                </div>

                                <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.title}</h1>

                                <div className="flex items-center gap-4 mb-4">
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-5 h-5 ${i < Math.floor(product.rate) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-gray-600 font-medium">{product.rate} / 5.0</span>
                                </div>

                                <p className="text-gray-600 text-lg mb-6">{product.shortDesc}</p>

                                <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-4 mb-6">
                                    <div className="text-4xl font-bold text-emerald-700">${product.price}</div>
                                    <div className="text-sm text-emerald-600 mt-1">{product.stock} units in stock</div>
                                </div>

                                {/* Color Selection */}
                                <div className="mb-6">
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">Color</label>
                                    <div className="flex gap-3 flex-wrap">
                                        {product.colors.map((color) => (
                                            <button
                                                key={color}
                                                onClick={() => setSelectedColor(color)}
                                                className={`px-4 py-2 rounded-lg border-2 transition-all ${selectedColor === color
                                                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                                                    : 'border-gray-200 bg-white text-gray-700 hover:border-emerald-300'
                                                    }`}
                                            >
                                                {color}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Quantity */}
                                <div className="mb-6">
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">Quantity</label>
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="w-10 h-10 rounded-lg border-2 border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                                        >
                                            -
                                        </button>
                                        <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                                        <button
                                            onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                            className="w-10 h-10 rounded-lg border-2 border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-4 mb-8">
                                    <button
                                        onClick={addToCart}
                                        disabled={isInCart}
                                        className={`flex-1 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${isInCart
                                            ? 'bg-green-50 border-2 border-green-500 text-green-700 cursor-not-allowed'
                                            : 'bg-white border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50'
                                            }`}
                                    >
                                        {isInCart ? (
                                            <>
                                                <Check className="w-5 h-5" />
                                                Added to Cart
                                            </>
                                        ) : (
                                            <>
                                                <ShoppingCart className="w-5 h-5" />
                                                Add to Cart
                                            </>
                                        )}
                                    </button>
                                    <button
                                        onClick={buyNow}
                                        className="flex-1 bg-emerald-600 text-white py-4 rounded-xl font-semibold hover:bg-emerald-700 transition-colors"
                                    >
                                        Buy Now
                                    </button>
                                </div>

                                {/* Features */}
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="flex flex-col items-center text-center p-3 bg-gray-50 rounded-lg">
                                        <Truck className="w-6 h-6 text-emerald-600 mb-2" />
                                        <span className="text-xs text-gray-600">Free Shipping</span>
                                    </div>
                                    <div className="flex flex-col items-center text-center p-3 bg-gray-50 rounded-lg">
                                        <Shield className="w-6 h-6 text-emerald-600 mb-2" />
                                        <span className="text-xs text-gray-600">2 Year Warranty</span>
                                    </div>
                                    <div className="flex flex-col items-center text-center p-3 bg-gray-50 rounded-lg">
                                        <RotateCcw className="w-6 h-6 text-emerald-600 mb-2" />
                                        <span className="text-xs text-gray-600">30 Day Returns</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="border-t border-gray-200 p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Description</h2>
                        <p className="text-gray-600 leading-relaxed">{product.description}</p>
                    </div>
                </div>

                {/* Related Products */}
                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Products</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {relatedProducts.filter(p => p._id !== product._id).map((item) => (
                            <div
                                key={item._id}
                                onClick={() => window.location.href = `/product?_id=${item._id}`}
                                className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transform transition-all hover:scale-105 hover:shadow-2xl"
                            >
                                <div className="aspect-square bg-linear-to-br from-emerald-100 to-teal-100 relative">
                                    <img
                                        src={`${process.env.NEXT_PUBLIC_IMAGE}/${item.img}.jpg`}
                                        alt={item.title}
                                        className="w-full h-full object-cover"
                                    />
                                    {item.stock < 100 && (
                                        <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                                            Low Stock
                                        </div>
                                    )}
                                </div>
                                <div className="p-4">
                                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{item.title}</h3>
                                    <div className="flex items-center justify-between">
                                        <span className="text-2xl font-bold text-emerald-600">${item.price}</span>
                                        <div className="flex items-center gap-1">
                                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                            <span className="text-sm text-gray-600">{item.rate}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {hasNextPage && (
                        <div className="text-center mt-8">
                            <button
                                onClick={loadMore}
                                disabled={relatedLoading}
                                className="px-8 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-colors disabled:bg-gray-400"
                            >
                                {relatedLoading ? 'Loading...' : 'View More'}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}