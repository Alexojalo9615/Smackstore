import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const orderItemSchema = new Schema({

    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
})


const orderSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    orderItems: [orderItemSchema],
    totalPrice: {
        type: Number,
        required: true,
    },
    paymentStatus: {
        type: String,
        enum: ["pending", "completed", "failed"],
        default: "pending",
    },
    paymentIntentId: {
        type: String,
        required: true,
    },
}, { timestamps: true });


const Order = model("Order", orderSchema);

export default Order;