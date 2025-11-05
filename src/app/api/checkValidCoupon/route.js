import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Contribution from "@/models/Contribution";

export async function POST(request) {
    try {
        await connectDB();

        const { email, couponCode } = await request.json();

        if (!email || !couponCode) {
            return NextResponse.json(
                { success: false, message: "Email and coupon code are required." },
                { status: 400 }
            );
        }

        // Find the coupon in the database
        const coupon = await Contribution.findOne({ email, couponCode });

        if (!coupon) {
            return NextResponse.json(
                { success: false, message: "Invalid coupon or email." },
                { status: 404 }
            );
        }

        // Check if coupon is expired
        const today = new Date();
        const expiryDate = new Date(coupon.validity);

        if (expiryDate < today) {
            return NextResponse.json(
                { success: false, message: "Coupon has expired." },
                { status: 200 }
            );
        }

        // Coupon is valid
        return NextResponse.json(
            {
                success: true,
                message: "Coupon is valid.",
                discount: coupon.discount,
                validity: coupon.validity,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error checking coupon:", error);
        return NextResponse.json(
            { success: false, message: "Internal server error." },
            { status: 500 }
        );
    }
}