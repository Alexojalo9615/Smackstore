import connectDb from "./connectDb.js"; 
import mongoose from "mongoose";
import User from "./models/User.js";
import bcrypt from "bcrypt"; // Importa bcrypt per l'hashing delle password


const utentiIniziali = [
    {
        firstName: "Gino",
        lastName: "Rossi",
        email: "ginogino123@gmail.com",
        password: "1234asdf",
    },

    {
        firstName: "Mario",
        lastName: "Bianchi",
        email: "mariomario1256@gmail.com",
        password: "5678asdf",
    },
    {
        firstName: "Maria",
        lastName: "Verdi",
        email: "mariamaria56@gmail.com",
        password: "5485gjgu",
    },
    {
        firstName: "Peter",
        lastName: "Pan",
        email: "peter58@gmail.com",
        password: "4751xlick",
    },
    {
        firstName: "Bianca",
        lastName: "Neve",
        email: "biancabianca56@gmail.com",
        password: "3625cndhvf",
    }
];


// const testDbCreation = async () => {
//     try {
//       const testUser = new User({
//         firstName: 'Test',
//         lastName: 'User',
//         email: 'testuser@example.com',
//         password: 'testpassword',
//       });
//       await testUser.save();
//       console.log('Utente di test creato e database smackstore creato automaticamente!');
//     } catch (error) {
//       console.error('Errore durante la creazione dell\'utente di test:', error);
//     }
//   };
  
//   testDbCreation();
  


const initial = async () => {
    try {
        await connectDb(); // Chiama la funzione per connettersi a MongoDB

        // Controlla se ci sono già utenti nel database
        const utentiEsistenti = await User.find({});
        if (utentiEsistenti.length === 0) {
            // Se non ci sono utenti, crea gli utenti iniziali
            const promesse = utentiIniziali.map(async (utente) => {
                const hashedPassword = await bcrypt.hash(utente.password, 10); // 'bcrypt async' è una funzione asincrona fornita dalla libreria bcrypt che prende due parametri: la passwrod da hashare dichiarata dall'utente 'utente.password' e il numero di round di hashing (10 in questo caso). Restituisce una promessa che si risolve con la password hashata. Si utilizza 'await' per attendere il completamento dell'hashing prima di continuare.
                const nuovoUtente = new User({
                    ...utente,
                    password: hashedPassword,
                });
                return nuovoUtente.save(); // Salva il nuovo utente
            });

            await Promise.all(promesse); // 'Promise.all()' è un metodo di JavaScript che accetta un array di promesse e restituisce una nuova promessa che si risolve quando tutte le promesse nell'array sono risolte. In questo caso, aspettiamo che tutte le promesse di salvataggio degli utenti siano completate prima di continuare.
            console.log("Utenti iniziali creati con successo!");
        } else {
            console.log("Gli utenti iniziali esistono già nel database.");
        }
    } catch (error) {
        console.error("Errore durante la creazione degli utenti iniziali:", error);
    } finally {
        mongoose.connection.close(); // Chiude la connessione al database
    }
};

initial(); // Chiama la funzione per inizializzare gli utenti

