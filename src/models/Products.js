import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'A product must have a title.'],
        trim: true
    },
    shortDesc: {
        type: String,
        trim: true
    },
    img: {
        type: String,
        required: [true, 'A product must have an image.']
    },
    price: {
        type: Number,
        required: [true, 'A product must have a price.'],
        min: [0, 'Price cannot be negative.']
    },
    rate: {
        type: Number,
        min: [0, 'Rating must be at least 0.'],
        max: [5, 'Rating cannot be more than 5.'],
        default: 0
    },
    colors: {
        type: [String],
        required: [true, 'A product must have at least one color.'],
    },
    description: {
        type: String,
        required: [true, 'A product must have a description.'],
        trim: true
    },
    stock: {
        type: Number,
        required: [true, 'Stock quantity must be defined.'],
        min: [0, 'Quantity cannot be negative.'],
        default: 0
    },
});

export default mongoose.models.products || mongoose.model("products", productSchema);