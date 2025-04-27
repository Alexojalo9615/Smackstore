import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const tShirtSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    sizes: {
        type: [String],
        required: true,
        enum: ["XS", "S", "M", "L", "XL", "XXL"],
    },
    price: {
        type: Number,
        required: true,
    },
    colors: {
        type: [String],
        required: true,
    },
    material: {
        type: String,
        required: false,
    },
    gender: {
        type: String,
        enum: ["Unisex", "Male", "Female"],
        default: "Unisex",
    },
    image: {
        type: String, 
        required: true,
    },
    wrestler: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Wrestler", 
        required: true,
    },
}, { timestamps: true });


const TShirt = model("TShirt", tShirtSchema); // Crea il modello TShirt utilizzando lo schema definito

export default TShirt; 