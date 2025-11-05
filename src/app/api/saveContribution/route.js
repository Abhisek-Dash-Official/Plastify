import { connectDB } from "@/lib/db";
import Contribution from "@/models/Contribution";

export async function POST(req) {
    try {
        const body = await req.json();
        const { name, email, couponCode, discount, validity } = body;

        if (!name || !email || !couponCode) {
            return Response.json(
                { success: false, message: "Missing required fields." },
                { status: 400 }
            );
        }

        await connectDB();

        const existing = await Contribution.findOne({ couponCode });
        if (existing) {
            return Response.json(
                { success: false, message: "Coupon code already exists, please try again." },
                { status: 409 }
            );
        }

        const newEntry = await Contribution.create({
            name,
            email,
            couponCode,
            discount,
            validity,
        });

        return Response.json(
            { success: true, message: "Contribution saved successfully!", data: newEntry },
            { status: 201 }
        );

    } catch (error) {
        console.error("❌ Error saving contribution:", error);
        return Response.json(
            { success: false, message: "Internal Server Error", details: error.message },
            { status: 500 }
        );
    }
}