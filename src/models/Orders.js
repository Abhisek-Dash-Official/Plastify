import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            required: true,
            trim: true
        },
        userEmail: {
            type: String,
            required: true,
            trim: true
        },
        contactNumber: {
            type: Number,
            required: true
        },
        products: [
            {
                productId: { type: String, required: true },
                quantity: { type: Number, required: true },
                color: { type: String, trim: true },
                price: { type: Number, required: true },
            }],
        totalAmount: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            required: true,
            default: 'Pending'
        },
        shippingAddress: {
            type: String,
            required: true,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.models.UsersOrders ||
    mongoose.model("UsersOrders", OrderSchema);