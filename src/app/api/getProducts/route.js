import { NextResponse } from 'next/server';
import { connectDB } from "@/lib/db";
import Product from "@/models/Products";

export async function GET(request) {
    try {
        await connectDB();
    } catch (error) {
        console.error("MongoDB Connection Error:", error);
        return NextResponse.json({ message: "Database connection failed" }, { status: 500 });
    }

    try {
        const { searchParams } = new URL(request.url);

        const findOneItemOf_id = searchParams.get('findOne');
        const filter = searchParams.get('filter') || 'All';
        const page = parseInt(searchParams.get('page')) || 1;
        const limit = parseInt(searchParams.get('limit')) || 12;
        const skip = (page - 1) * limit;

        if (findOneItemOf_id) {
            const product = await Product.findById(findOneItemOf_id);
            if (!product) {
                return NextResponse.json({ error: "Product not found" }, { status: 404 });
            }

            return NextResponse.json(product, { status: 200 });
        }

        const query = {};
        if (filter !== 'All') {
            query.category = filter;
        }

        const products = await Product.find(query)
            .limit(limit + 1)
            .skip(skip)
            .lean();

        let hasNextPage = false;
        if (products.length > limit) {
            hasNextPage = true;
            products.pop();
        }

        return NextResponse.json({
            products,
            hasNextPage
        });

    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ message: "Failed to fetch products" }, { status: 500 });
    }
}