import mongoose from "mongoose";
import { Schema, model } from "mongoose";


const wrestlerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  roster: {
    type: String,
    enum: ["Raw", "SmackDown", "NXT"],
    required: true,
  },
  image: {
    type: String, // URL dell'immagine
    required: true,
  },
  currentTitle: {
    type: [String], // Array di stringhe per i titoli detenuti
  },
  country: {
    type: String,
  },
}, { timestamps: true });

const Wrestler = model("Wrestler", wrestlerSchema); // Crea il modello Wrestler utilizzando lo schema definito

export default Wrestler; 