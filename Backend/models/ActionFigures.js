import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const actionFigureSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String, // URL dell'immagine
    required: true,
  },
  wrestler: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Wrestler",
    required: true,
  },
}, { timestamps: true });

const ActionFigure = model("ActionFigure", actionFigureSchema);

export default ActionFigure;