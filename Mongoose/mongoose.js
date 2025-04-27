import mongoose from 'mongoose';



 // Chiusura connessione con MongoDB per evitare che resti aperta
 mongoose.connection.close()