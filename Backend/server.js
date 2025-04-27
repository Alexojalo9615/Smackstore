import dotenv from 'dotenv';
dotenv.config({ path: './.env' }); // Carica le variabili d'ambiente dal file .env
import express from 'express';
import userRouter from './router/user.routes.js';
import cors from 'cors'; // Importa il middleware CORS
import connectDb from './connectDb.js'; 
import actionFigureRoutes from './router/actionFigures.routes.js'; 
import tshirtRoutes from './router/magliette.routes.js'; 
import coverRoutes from './router/cover.routes.js';
import productRouter from './router/products.routes.js';
import wrestlerRoutes from './router/wrestler.routes.js'; // Importa il router per i wrestler
import stripeRoutes from './router/stripe.routes.js'; // Importa il router per Stripe
import orderRoutes from './router/orders.routes.js'; // Importa il router per gli ordini

console.log("Avvio del server...");
console.log("Provo a connettermi a MongoDB...", process.env.MONGO_STRING);


const server = express(); // Inizializza il server Express
server.use(cors()); // Abilita CORS per tutte le richieste
server.use(express.json()); // Dicendogli questo il nostro server sarà in grado di "parsare" il body di tipo json


// Rotta principale 
server.get('/', (req, res) => {
    res.send("Benvenuto nel server!");
});


async function avviaServer() {

    try {

        await connectDb(); // Chiama la funzione per connettersi a MongoDB

        server.use("/users", userRouter); // Associo il server al router, gli dico di usarlo col prefisso /users
        server.use("/api/action-figures", actionFigureRoutes); // Associo il server al router, gli dico di usarlo col prefisso api/actionFigures
        server.use("/api/tshirts", tshirtRoutes); // Associo il server al router, gli dico di usarlo col prefisso api/tshirts
        server.use("/api/cases", coverRoutes); // Associo il server al router, gli dico di usarlo col prefisso api/cases
        server.use("/api/wrestlers", wrestlerRoutes); // Associo il server al router, gli dico di usarlo col prefisso api/wrestlers
        server.use("/products", productRouter ) // Associo il server al router, gli dico di usarlo col prefisso /products
        server.use("/api/stripe", stripeRoutes); // Associo il server al router, gli dico di usarlo col prefisso api/stripe
        server.use("/api/orders", orderRoutes); // Associo il server al router, gli dico di usarlo col prefisso api/orders

        server.listen(process.env.PORT || 5030, () => {

            console.log('Server avviato!'); // Messaggio di avvio del server

        });

    } catch (error) {
        console.error("Errore durante la connessione a MongoDB:", error);
    }
}

avviaServer(); // Questa funzione avvia il server