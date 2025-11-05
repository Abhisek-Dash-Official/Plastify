import mongoose from "mongoose";

const ContributionSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, trim: true },
        couponCode: { type: String, required: true, unique: true },
        discount: { type: Number, required: true },
        validity: { type: String, required: true },
    },
    { timestamps: false }
);

export default mongoose.models.contributions ||
    mongoose.model("contributions", ContributionSchema);