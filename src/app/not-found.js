"use client";
import { Home, Search, ArrowLeft, Package, Leaf } from 'lucide-react';

export default function PageNotFound() {
    return (
        <div className="min-h-screen bg-linear-to-br from-emerald-50 via-teal-50 to-green-50 flex items-center justify-center p-4">
            <div className="text-center max-w-2xl">
                {/* 404 Animation */}
                <div className="relative mb-8">
                    <div className="text-[180px] font-black text-transparent bg-clip-text bg-linear-to-r from-emerald-600 via-teal-600 to-green-600 leading-none animate-pulse">
                        404
                    </div>
                </div>

                {/* Content Card */}
                <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 transform hover:scale-105 transition-transform duration-300 border-2 border-emerald-100">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Oops! Page Not Found
                    </h1>
                    <p className="text-lg text-gray-600 mb-8">
                        The page you're looking for seems to have gone on vacation.
                        Don't worry, we'll help you find your way back!
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => window.location.href = '/'}
                            className="group px-8 py-4 bg-linear-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                        >
                            <Home className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                            Back to Home
                        </button>

                        <button
                            onClick={() => window.history.back()}
                            className="px-8 py-4 bg-white border-2 border-emerald-300 text-emerald-700 rounded-xl font-semibold hover:bg-emerald-50 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Go Back
                        </button>
                    </div>

                    {/* Search Section */}
                    <div className="mt-8 pt-8 border-t border-emerald-200">
                        <p className="text-sm text-gray-500 mb-4">Looking for something specific?</p>
                        <div className="relative max-w-md mx-auto">
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="w-full px-6 py-3 pl-12 rounded-full border-2 border-emerald-300 focus:border-emerald-500 focus:outline-none transition-colors"
                            />
                            <Search className="w-5 h-5 text-emerald-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                        </div>
                    </div>
                </div>

                {/* Floating Elements */}
                <div className="mt-8 flex justify-center gap-4">
                    <div className="w-16 h-16 bg-linear-to-br from-emerald-400 to-teal-500 rounded-full animate-bounce opacity-20" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-12 h-12 bg-linear-to-br from-teal-400 to-green-500 rounded-full animate-bounce opacity-20" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-20 h-20 bg-linear-to-br from-green-400 to-emerald-500 rounded-full animate-bounce opacity-20" style={{ animationDelay: '300ms' }}></div>
                </div>
            </div>
        </div>
    );
}