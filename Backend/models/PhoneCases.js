import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const phoneCaseSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String, // URL dell'immagine della cover
        required: false,
    },
    color: {
        type: String,
        required: false,
    },
    price: {
        type: Number,
        required: true,
    },
    wrestler: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Wrestler", // Riferimento al modello Wrestler
        required: true,
    },
}, { timestamps: true });

const PhoneCase = model("PhoneCase", phoneCaseSchema);

export default PhoneCase;
