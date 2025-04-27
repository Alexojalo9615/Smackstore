import dotenv from 'dotenv';
dotenv.config({ path: './.env' }); // Carica le variabili d'ambiente dal file .env
import mongoose from 'mongoose';


const OLD_NAME = "Cover Rey Mysterio - Kiss";
const NEW_NAME = "Cover Bianca Belair - Kiss";

async function runMigration() {
    try {
        await mongoose.connect(process.env.MONGO_STRING);
        console.log("Connected to MongoDB");

        const result = await mongoose.connection.db.collection("phonecases").updateMany(
            { name: OLD_NAME },
            { $set: { name: NEW_NAME } },
        );

        console.log('Matched documents:', result.matchedCount);
        console.log('Modified documents:', result.modifiedCount);

    } catch (error) {
        console.error("Error during migration:", error);
    } finally {
        await mongoose.connection.close();
        console.log("Connection closed");
    }
}


runMigration()