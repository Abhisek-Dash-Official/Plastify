"use client";
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

export default function Home() {
    const page = useRef(1);
    const limit = 12;
    const [products, setProducts] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const searchParams = useSearchParams();
    const router = useRouter();

    const handleViewMore = () => {
        fetch(`/api/getProducts?filter=${selectedCategory}&page=${page.current}&limit=${limit}`).then(res => res.json())
            .then(
                data => {
                    setProducts(prev => [...prev, ...data.products]);
                    setHasMore(data.hasNextPage)
                    page.current++;
                }
            );
    }

    const categories = ['All', 'Bottles', 'Containers', 'Cutlery', 'Bags', 'Accessories'];

    const filteredProducts = selectedCategory === 'All'
        ? products
        : products.filter(p => p.category === selectedCategory);

    useEffect(() => {
        const filterFromUrl = searchParams.get('filter');
        if (filterFromUrl) {
            setSelectedCategory(filterFromUrl);
        } else {
            setSelectedCategory('All')
        }
        page.current = 1

        fetch(`/api/getProducts?filter=${selectedCategory}&page=${page.current}&limit=${limit}`).then(res => res.json())
            .then(
                data => {
                    setProducts(data.products);
                    setHasMore(data.hasNextPage)
                    page.current++;
                }
            );
    }, [searchParams, selectedCategory]);


    return (
        <div className="min-h-screen bg-linear-to-br from-green-50 to-emerald-100">
            {/* Hero Section */}
            <div className="relative bg-linear-to-r from-green-600 to-emerald-600 text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                </div>

                <div className="container mx-auto px-4 py-20 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">
                            Shop Eco-Friendly Bio-Plastic Products
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 text-green-100">
                            Quality products made from sustainable, biodegradable materials
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="#productGrid" className="bg-white text-green-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-green-50 transform hover:scale-105 transition-all shadow-lg">
                                Shop Now
                            </Link>
                            <Link href="/learnMore" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-green-600 transform hover:scale-105 transition-all">
                                Learn More
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid md:grid-cols-4 gap-6 mb-16">
                    <div className="bg-white rounded-xl p-6 shadow-lg text-center transform hover:scale-105 transition-transform">
                        <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="font-bold text-lg mb-2">100% Biodegradable</h3>
                        <p className="text-gray-600 text-sm">Naturally decomposes without harming the environment</p>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-lg text-center transform hover:scale-105 transition-transform">
                        <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="font-bold text-lg mb-2">Best Prices</h3>
                        <p className="text-gray-600 text-sm">Competitive pricing on all eco-friendly products</p>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-lg text-center transform hover:scale-105 transition-transform">
                        <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                        </div>
                        <h3 className="font-bold text-lg mb-2">Fast Delivery</h3>
                        <p className="text-gray-600 text-sm">Quick and eco-friendly shipping nationwide</p>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-lg text-center transform hover:scale-105 transition-transform">
                        <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="font-bold text-lg mb-2">Quality Assured</h3>
                        <p className="text-gray-600 text-sm">Certified sustainable and durable products</p>
                    </div>
                </div>

                {/* Category Filter */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-center text-green-700 mb-6">Browse Our Products</h2>
                    <div className="flex flex-wrap justify-center gap-3">
                        {categories.map(category => (
                            <button
                                key={category}
                                disabled={category.toLowerCase() === selectedCategory.toLowerCase()}
                                onClick={() => {
                                    if (category === 'All') {
                                        window.location.href = "/home";
                                    } else {
                                        window.location.href = `/home?filter=${category}`;
                                    }
                                }}
                                className={`px-6 py-2 rounded-full font-semibold transition-all ${selectedCategory.toLowerCase() === category.toLowerCase()
                                    ? 'bg-green-600 text-white shadow-lg transform scale-105'
                                    : 'bg-white text-gray-700 hover:bg-green-100'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Products Grid */}
                <div id="productGrid" className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 scroll-mt-56">
                    {filteredProducts.map(product => (
                        <div
                            key={product._id}
                            className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-all"
                            onClick={() => router.push(`/product?_id=${product._id}`)}
                        >
                            <div className="relative">
                                <img
                                    src={`${process.env.NEXT_PUBLIC_IMAGE}/${product.img}.jpg`}
                                    alt=" "
                                    className="w-full h-48 object-cover"
                                />
                                {product.stock === 0 && (
                                    <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                        Out of Stock
                                    </div>
                                )}
                                <div className="absolute top-2 left-2 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                    {product.category}
                                </div>
                            </div>

                            <div className="p-4">
                                <h3 className="font-bold text-lg mb-2 text-gray-800">{product.title}</h3>
                                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>

                                <div className="flex items-center mb-3">
                                    <div className="flex text-yellow-400">
                                        {[...Array(5)].map((_, i) => (
                                            <svg
                                                key={i}
                                                className={`w-4 h-4 ${i < Math.floor(product.rate)
                                                    ? "fill-current"
                                                    : "fill-gray-300"
                                                    }`}
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <span className="text-sm text-gray-600 ml-2">({product.rate})</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* View More Button */}
            {hasMore && <div className="flex justify-center items-center">
                <button
                    onClick={handleViewMore}
                    className="mb-8 px-6 py-2 text-2xl bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full shadow-md transition-all duration-200 flex items-center gap-2 group"
                >
                    <span>View More</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>}

            {/* CTA Section */}
            <div className="bg-linear-to-r from-green-600 to-emerald-600 text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold mb-4">Join the Green Revolution</h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto">
                        Every purchase contributes to a cleaner planet. Start your eco-friendly journey today!
                    </p>
                    <div className="flex flex-wrap justify-center gap-6">
                        <div className="bg-green-700 bg-opacity-30 rounded-xl p-6 border border-white border-opacity-30">
                            <div className="text-4xl font-bold mb-2">10,000+</div>
                            <div className="text-green-50">Happy Customers</div>
                        </div>
                        <div className="bg-green-700 bg-opacity-30 rounded-xl p-6 border border-white border-opacity-30">
                            <div className="text-4xl font-bold mb-2">500T</div>
                            <div className="text-green-50">Plastic Saved</div>
                        </div>
                        <div className="bg-green-700 bg-opacity-30 rounded-xl p-6 border border-white border-opacity-30">
                            <div className="text-4xl font-bold mb-2">100%</div>
                            <div className="text-green-50">Eco-Friendly</div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}