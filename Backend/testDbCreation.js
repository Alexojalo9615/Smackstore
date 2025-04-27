import mongoose from "mongoose";
import connectDb from "./connectDb.js";
import User from "./models/User.js"; 

const testDbCreation = async () => {
  try {
    await connectDb(); 

    const testUser = new User({
      firstName: "Test",
      lastName: "User",
      email: "testuser@example.com",
      password: "testpassword",
    });

    await testUser.save(); // Scrive un documento nel DB
    console.log("Utente di test creato! Database 'smackstore' creato automaticamente.");
  } catch (error) {
    console.error("Errore durante la creazione dell'utente di test:", error);
  } finally {
    mongoose.connection.close(); // Chiudi la connessione dopo l'operazione
  }
};

// Avvia la creazione dell'utente di test
testDbCreation();
