"use client";
import React, { useState } from "react";
import { Leaf, Gift, Coins, Mail, User, Package, CheckCircle } from "lucide-react";
import Swal from "sweetalert2";
import createReceipt from "../functions/createCouponReceipt";
import { toast } from "react-toastify";

export default function Contribute() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        wasteType: "",
        quantity: "",
        amount: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation
        if (!form.name || !form.email) {
            Swal.fire({
                icon: "error",
                title: "Missing Details!",
                text: "Please fill in your name and email before contributing.",
                confirmButtonColor: "#16a34a",
            });
            return;
        }

        if (!form.wasteType && !form.amount) {
            Swal.fire({
                icon: "error",
                title: "Incomplete Details!",
                text: "Please fill at least waste contribution or monetary contribution.",
                confirmButtonColor: "#16a34a",
            });
            return;
        }

        let discount = 0, d1 = 0, d2 = 0;
        let validityDays = 0;

        if (form.amount || form.quantity) {
            if (form.amount > 5000 || form.quantity > 10) {
                if (form.amount) {
                    // More money → higher percentage (up to 25%)
                    d1 += Math.min(5 + Math.floor(form.amount / 2000), 25);
                    validityDays += d1 + 25;
                }
                if (form.quantity) {
                    // More waste → higher percentage (up to 20%)
                    d2 += Math.min(3 + Math.floor(form.quantity / 3), 20);
                    validityDays += d2 + 10;
                }
            } else {
                // Show success message (no coupon)
                Swal.fire({
                    icon: "success",
                    title: "Thank You for Your Contribution! 🌱",
                    text: "Your small effort makes a big difference! Keep contributing to earn exciting coupons next time.",
                    confirmButtonColor: "#16a34a",
                });
                return; // Stop further execution (no coupon generation)
            }
        } else {
            // fallback for random
            d1 = Math.floor(Math.random() * 10) + 5;
        }
        discount = d1 + d2;
        console.log(discount, d1, d2)
        const today = new Date();
        const expiryDate = new Date(today);
        expiryDate.setDate(today.getDate() + validityDays);
        const validity = expiryDate.toDateString();

        // Generate Unique Coupon Code
        const uniqueId = Date.now().toString(36) + Math.floor(Math.random() * 1000).toString(36);
        const couponCode = `PLAST-${form.name.slice(0, 3).toUpperCase()}-${uniqueId.toUpperCase()}`;

        // Create Contribution Object
        const contribution = {
            name: form.name.trim(),
            email: form.email.trim(),
            couponCode,
            discount,
            validity
        };

        // Send contribution data to backend
        // Send contribution data to backend
        fetch("/api/saveContribution", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(contribution),
        })
            .then(async (res) => {
                const data = await res.json();
                if (!data.success) {
                    toast.error(data.message || "Something went wrong!");
                    return;
                }

                // Show success SweetAlert only after DB save success
                Swal.fire({
                    icon: "success",
                    title: "Contribution Successful! 🌱",
                    html: `
        <div style="text-align:left; font-size:16px">
          <p><b>Name:</b> ${form.name}</p>
          <p><b>Email:</b> ${form.email}</p>
          ${form.wasteType
                            ? `<p><b>Waste Donated:</b> ${form.wasteType} (${form.quantity} kg)</p>`
                            : ""
                        }
          ${form.amount
                            ? `<p><b>Money Contributed:</b> ₹${form.amount}</p>`
                            : ""
                        }
          <hr style="margin:10px 0;"/>
          <p><b>🎁 Coupon Code:</b> <span style="color:#16a34a">${couponCode}</span></p>
          <p><b>💰 Discount:</b> ${discount}%</p>
          <p><b>📅 Valid Till:</b> ${validity}</p>
          <p style="margin-top:8px;">Use this coupon on your next purchase!</p>
        </div>
      `,
                    confirmButtonText: "Download Receipt",
                    confirmButtonColor: "#16a34a",
                }).then(() => createReceipt(form, couponCode, discount, validity));

            })
            .catch((err) => {
                console.error("❌ Save failed:", err);
                toast.error("Failed to connect to the server!");
            });
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-emerald-50 via-green-50 to-teal-50 py-20 px-6">
            <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-sm shadow-xl rounded-3xl p-10 border border-green-100">
                <div className="text-center mb-10">
                    <div className="flex justify-center mb-4">
                        <Gift className="w-12 h-12 text-green-600" />
                    </div>
                    <h1 className="text-4xl font-bold text-green-900 mb-2">Contribute to Plastify</h1>
                    <p className="text-green-700 text-lg">
                        Donate organic waste or funds to help us make eco-friendly bioplastics.
                        Get rewarded with coupons for your contribution!
                    </p>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="w-full">
                            <label className="block text-green-800 font-semibold mb-2">Full Name</label>
                            <div className="flex items-center border border-green-200 rounded-lg px-4">
                                <User className="w-5 h-5 text-green-600 mr-2" />
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    className="w-full py-2 outline-none bg-transparent"
                                    placeholder="Enter your name"
                                    required
                                />
                            </div>
                        </div>
                        <div className="w-full">
                            <label className="block text-green-800 font-semibold mb-2">Email Address</label>
                            <div className="flex items-center border border-green-200 rounded-lg px-4">
                                <Mail className="w-5 h-5 text-green-600 mr-2" />
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    className="w-full py-2 outline-none bg-transparent"
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-green-800 font-semibold mb-2">
                            Waste Type (Optional)
                        </label>
                        <div className="flex items-center border border-green-200 rounded-lg px-4">
                            <Package className="w-5 h-5 text-green-600 mr-2" />
                            <select
                                name="wasteType"
                                value={form.wasteType}
                                onChange={handleChange}
                                className="w-full py-2 outline-none bg-transparent"
                            >
                                <option value="" disabled>Select waste type</option>

                                <optgroup label="Starch-Based Sources">
                                    <option value="Potato Peels">Potato Peels</option>
                                    <option value="Corn Waste">Corn Waste (husks, kernels)</option>
                                    <option value="Rice Husk">Rice Husk / Broken Rice</option>
                                    <option value="Cassava Waste">Cassava / Tapioca Waste</option>
                                </optgroup>

                                <optgroup label="Sugar & Cellulose Sources">
                                    <option value="Sugarcane Bagasse">Sugarcane Bagasse (Juice Waste)</option>
                                    <option value="Fruit Waste">Fruit Waste (banana, mango, citrus peels)</option>
                                    <option value="Vegetable Waste">Vegetable Waste (starch-rich)</option>
                                    <option value="Paper Pulp Waste">Paper Pulp Waste (cellulose fiber)</option>
                                </optgroup>

                                <optgroup label="Oil & Organic Residues">
                                    <option value="Used Cooking Oil">Used Cooking Oil</option>
                                    <option value="Algae Biomass">Algae Biomass (from ponds or industry)</option>
                                </optgroup>

                                <option value="Others">Others</option>
                            </select>
                        </div>
                    </div>

                    {form.wasteType && (
                        <div>
                            <label className="block text-green-800 font-semibold mb-2">
                                Quantity (in kg)
                            </label>
                            <input
                                type="number"
                                name="quantity"
                                value={form.quantity}
                                onChange={handleChange}
                                className="w-full border border-green-200 rounded-lg px-4 py-2 outline-none bg-transparent"
                                placeholder="Enter quantity"
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-green-800 font-semibold mb-2">
                            Money Contribution (Optional)
                        </label>
                        <div className="flex items-center border border-green-200 rounded-lg px-4">
                            <Coins className="w-5 h-5 text-green-600 mr-2" />
                            <input
                                type="number"
                                name="amount"
                                value={form.amount}
                                onChange={handleChange}
                                className="w-full py-2 outline-none bg-transparent"
                                placeholder="Enter amount in ₹"
                                min="0"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-3 rounded-full font-semibold text-lg flex items-center justify-center gap-2 transition"
                    >
                        <CheckCircle className="w-5 h-5" />
                        Contribute Now
                    </button>
                </form>
            </div>
        </div>
    );
}