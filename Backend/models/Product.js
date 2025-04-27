import mongoose, { model, Schema } from "mongoose";


const productSchema = new Schema({

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
    category: {
        type: String,
        enum: ['Tshirt', 'Action Figure', 'Cover'],
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Riferimento al modello User
        required: true,
    },
    wrestler: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Wrestler', // Riferimento al modello Wrestler
        required: true,
    },
}, { timestamps: true }); // Permette di salvare nel database la data di creazione e di modifica di un elemento


const Product = model("Product", productSchema)

export default Product;
