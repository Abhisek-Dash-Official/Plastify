import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/Orders";

export async function POST(request) {
    try {
        await connectDB();

        const body = await request.json();

        const {
            userName,
            userEmail,
            contactNumber,
            products,
            totalAmount,
            status,
            shippingAddress,
        } = body;

        // Basic validation
        if (
            !userName ||
            !userEmail ||
            !contactNumber ||
            !products ||
            !totalAmount ||
            !status ||
            !shippingAddress
        ) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Create new order
        const newOrder = await Order.create({
            userName,
            userEmail,
            contactNumber,
            products,
            totalAmount,
            status,
            shippingAddress,
        });

        return NextResponse.json(
            { message: "Order placed successfully" },
            { status: 201 }
        );
    } catch (error) {
        console.error("Order API Error:", error);
        return NextResponse.json(
            { error: "Failed to create order" },
            { status: 500 }
        );
    }
}