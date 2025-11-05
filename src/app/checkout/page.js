"use client";
import { useState, useEffect } from 'react';
import { ShoppingBag, Trash2, Tag, MapPin, Phone, Mail, User, CreditCard, Download } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import generatePDF from "../functions/createBillReceipt"

export default function Orders() {
    const [cartItems, setCartItems] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [couponCode, setCouponCode] = useState('');
    const [appliedCoupon, setAppliedCoupon] = useState(null);
    const [couponLoading, setCouponLoading] = useState(false);

    // User details
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [shippingAddress, setShippingAddress] = useState('');

    useEffect(() => {
        loadCart();
    }, []);

    const loadCart = async () => {
        try {
            const cart = JSON.parse(localStorage.getItem('plastifyCarts') || '[]');
            setCartItems(cart);

            if (cart.length > 0) {
                await fetchProducts(cart);
            }
        } catch (error) {
            console.error('Error loading cart:', error);
            toast.error('Failed to load cart items');
        } finally {
            setLoading(false);
        }
    };

    const fetchProducts = async (cart) => {
        try {
            const productPromises = cart.map(item =>
                fetch(`/api/getProducts?findOne=${item._id}`).then(res => res.json())
            );
            const productsData = await Promise.all(productPromises);
            setProducts(productsData);
        } catch (error) {
            console.error('Error fetching products:', error);
            toast.error('Failed to load product details');
        }
    };

    const removeFromCart = (index) => {
        const updatedCart = cartItems.filter((_, i) => i !== index);
        setCartItems(updatedCart);
        localStorage.setItem('plastifyCarts', JSON.stringify(updatedCart));

        const updatedProducts = products.filter((_, i) => i !== index);
        setProducts(updatedProducts);

        toast.success('Item removed from cart');
    };

    const updateQuantity = (index, newQuantity) => {
        if (newQuantity < 1) return;

        const updatedCart = [...cartItems];
        updatedCart[index].quantity = newQuantity;
        setCartItems(updatedCart);
        localStorage.setItem('plastifyCarts', JSON.stringify(updatedCart));
    };

    const checkCoupon = async () => {
        if (!couponCode.trim()) {
            toast.error('Please enter a coupon code');
            return;
        }
        if (!userEmail) {
            toast.error('Please enter your email first');
            return;
        }

        try {
            setCouponLoading(true);
            const res = await fetch(`/api/checkValidCoupon`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: userEmail, couponCode }),
            });
            const data = await res.json();

            if (data.success) {
                setAppliedCoupon({
                    code: couponCode,
                    discount: data.discount,
                    validity: data.validity,
                });
                toast.success(`Coupon applied! You got ${data.discount}% discount`);
            } else {
                toast.error(data.message || 'Invalid coupon code');
                setAppliedCoupon(null);
            }
        } catch (error) {
            console.error("Error checking coupon:", error);
            toast.error("Failed to validate coupon");
            setAppliedCoupon(null);
        } finally {
            setCouponLoading(false);
        }
    };

    const calculateTotal = () => {
        const subtotal = cartItems.reduce((total, item, index) => {
            const product = products[index];
            return total + (product?.price || 0) * item.quantity;
        }, 0);

        const discount = appliedCoupon ? (subtotal * appliedCoupon.discount) / 100 : 0;
        return {
            subtotal: subtotal.toFixed(2),
            discount: discount.toFixed(2),
            total: (subtotal - discount).toFixed(2)
        };
    };

    const placeOrder = async () => {
        if (!userName || !userEmail || !contactNumber || !shippingAddress) {
            toast.error('Please fill in all customer details');
            return;
        }

        if (cartItems.length === 0) {
            toast.error('Your cart is empty');
            return;
        }

        try {
            const { total } = calculateTotal();
            const orderProducts = cartItems.map((item, index) => ({
                productId: item._id,
                quantity: item.quantity,
                color: item.color,
                price: products[index]?.price || 0
            }));

            const orderData = {
                userName,
                userEmail,
                contactNumber,
                products: orderProducts,
                totalAmount: parseFloat(total),
                status: 'pending',
                shippingAddress,
                couponApplied: appliedCoupon?.code || null,
                discount: appliedCoupon?.discount || 0
            };

            const res = await fetch('/api/setOrder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderData)
            });

            const data = await res.json();

            if (res.ok) {
                // Generate PDF
                const { subtotal, discount, total } = calculateTotal();
                const pdf = generatePDF({ orderData, subtotal, discount, total, cartItems, products, appliedCoupon });

                // Show success with download option
                Swal.fire({
                    icon: 'success',
                    title: 'Order Placed Successfully!',
                    html: `
            <p>Your order has been placed successfully.</p>
            <p>Total Amount: <strong>INR${total}</strong></p>
          `,
                    showCancelButton: true,
                    confirmButtonText: '<i class="fas fa-download"></i> Download Invoice',
                    confirmButtonColor: '#10b981',
                    cancelButtonText: 'Close',
                    cancelButtonColor: '#6b7280'
                }).then((result) => {
                    if (result.isConfirmed) {
                        pdf.save(`Plastify-Invoice-${Date.now()}.pdf`);
                    }
                });

                // Clear cart
                localStorage.removeItem('plastifyCarts');
                setCartItems([]);
                setProducts([]);
                setAppliedCoupon(null);
                setCouponCode('');

                // Reset form
                setUserName('');
                setUserEmail('');
                setContactNumber('');
                setShippingAddress('');
            } else {
                toast.error(data.message || 'Failed to place order');
            }
        } catch (error) {
            console.error('Error placing order:', error);
            toast.error('Failed to place order. Please try again.');
        }
    };

    const { subtotal, discount, total } = calculateTotal();

    if (loading) {
        return (
            <div className="min-h-screen bg-linear-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-emerald-500 border-t-transparent mx-auto mb-4"></div>
                    <p className="text-emerald-700 font-semibold">Loading your cart...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-emerald-50 to-teal-50 py-8 px-4">
            <ToastContainer position="top-right" autoClose={3000} />

            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                    <ShoppingBag className="w-10 h-10 text-emerald-600" />
                    Checkout
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Cart</h2>

                            {cartItems.length === 0 ? (
                                <div className="text-center py-12">
                                    <ShoppingBag className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                                    <p className="text-gray-500 text-lg">Your cart is empty</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {cartItems.map((item, index) => {
                                        const product = products[index];
                                        return (
                                            <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                                                <img
                                                    src={`${process.env.NEXT_PUBLIC_IMAGE}/${product?.img}.jpg`}
                                                    alt={product?.title}
                                                    className="w-24 h-24 object-cover rounded-lg"
                                                />
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-gray-900">{product?.title}</h3>
                                                    <p className="text-sm text-gray-600">Color: {item.color}</p>
                                                    <p className="text-emerald-600 font-bold">INR{product?.price}</p>
                                                </div>
                                                <div className="flex flex-col items-end gap-2">
                                                    <button
                                                        onClick={() => removeFromCart(index)}
                                                        className="text-red-500 hover:text-red-700"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={() => updateQuantity(index, item.quantity - 1)}
                                                            className="w-8 h-8 bg-white border rounded-lg"
                                                        >
                                                            -
                                                        </button>
                                                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(index, item.quantity + 1)}
                                                            className="w-8 h-8 bg-white border rounded-lg"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* Customer Details */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Details</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        <User className="w-4 h-4 inline mr-2" />
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        value={userName}
                                        onChange={(e) => setUserName(e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                                        placeholder="Your Name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        <Mail className="w-4 h-4 inline mr-2" />
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={userEmail}
                                        onChange={(e) => setUserEmail(e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                                        placeholder="email@example.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        <Phone className="w-4 h-4 inline mr-2" />
                                        Contact Number
                                    </label>
                                    <input
                                        type="tel"
                                        value={contactNumber}
                                        onChange={(e) => setContactNumber(e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                                        placeholder="+1 234 567 8900"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        <MapPin className="w-4 h-4 inline mr-2" />
                                        Shipping Address
                                    </label>
                                    <textarea
                                        value={shippingAddress}
                                        onChange={(e) => setShippingAddress(e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                                        rows="3"
                                        placeholder="123 Main St, City, State, ZIP"
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

                            {/* Coupon */}
                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    <Tag className="w-4 h-4 inline mr-2" />
                                    Coupon Code
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                        className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                                        placeholder="DISCOUNT"
                                        disabled={appliedCoupon}
                                    />
                                    {!appliedCoupon ? (
                                        <button
                                            onClick={checkCoupon}
                                            disabled={couponLoading}
                                            className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 disabled:bg-gray-400"
                                        >
                                            {couponLoading ? 'Checking...' : 'Apply'}
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => {
                                                setAppliedCoupon(null);
                                                setCouponCode('');
                                            }}
                                            className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600"
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>
                                {appliedCoupon && (
                                    <p className="text-sm text-green-600 mt-2">
                                        ✓ {appliedCoupon.discount}% discount applied!
                                    </p>
                                )}
                            </div>

                            {/* Totals */}
                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>INR{subtotal}</span>
                                </div>
                                {appliedCoupon && (
                                    <div className="flex justify-between text-green-600">
                                        <span>Discount ({appliedCoupon.discount}%)</span>
                                        <span>-INR{discount}</span>
                                    </div>
                                )}
                                <div className="border-t pt-3 flex justify-between text-xl font-bold text-gray-900">
                                    <span>Total</span>
                                    <span className="text-emerald-600">INR{total}</span>
                                </div>
                            </div>

                            {/* Place Order Button */}
                            <button
                                onClick={placeOrder}
                                disabled={cartItems.length === 0}
                                className="w-full bg-linear-to-r from-emerald-600 to-teal-600 text-white py-4 rounded-xl font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all transform hover:scale-105 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                            >
                                <CreditCard className="w-5 h-5" />
                                Place Order
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}