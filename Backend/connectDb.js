import dotenv from 'dotenv';
dotenv.config({ path: './.env' }); 
import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_STRING,  // Col metodo 'connect()' si stabilisce una connessione al database MongoDB, usando in questo caso la connection string e accetta una stringa che Include informazioni al suo interno come l'URL , il server MongoDb, il nome del database ed eventualmente le chiavi di autenticazione. Mentre mongoose è una libreria di MongoDB
    
    );

    console.log("Connesione a MongoDB riuscita!");
    
  } catch (error) {
    console.error("Errore durante la connessione a MongoDB:", error);
  }
}

export default connectDb;