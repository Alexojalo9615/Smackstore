import { Router } from "express";
import User from "../models/User.js"; // Importa il modello User
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import verifyToken from "../middlewares/verifyToken.js";
import isAdmin from "../middlewares/authorization.js";


const router = Router(); // Crea un router vuoto per gestire le rotte


router.get("/", (req, res) => {
    console.log('Siamo qui dentro la rotta /')
    res.send("Ciao da Express!"); // Risposta per la rotta principale
});

router.post("/", (req, res) => {
    console.log(req); // Log della richiesta')
    res.send({ success: true }); // Risposta per la rotta /users
});

// POST registrazione

router.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ message: 'Tutti i campi sono obbligatori' });
        }

        // Verifica se l'utente esiste già
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Utente già registrato' });
        }

        // Cripta la password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crea e salva il nuovo utente
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword // Salva la password criptata
        });
        await newUser.save();

        //GENERA un token per il login
        const token = jwt.sign(
            {
                id: newUser._id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email
            },

            process.env.JWT_SECRET,

            { expiresIn: '1h' });

        res.status(201).json({ token }); // Invia il token al cliente

    } catch (err) {
        console.error("Errore nella registrazione:", err);
        res.status(500).json({ error: err.message });
    }
});


// POST login

router.post('/login', async (req, res) => {

    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }); // Cerca un utente nel database con l'email fornita
        if (!user) {
            return res.status(404).json({ message: 'Utente non trovato' });
        } // Se l'utente non esiste, restituisce un errore

        const passwordMatch = await bcrypt.compare(password, user.password); // Confronta la password fornita con quella salvata nel database
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Password errata' });
        }

        const token = jwt.sign(
            {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            },

            process.env.JWT_SECRET,

            { expiresIn: '2h' });// Genera un token JWT

        res.json({
            success: true,
            token,
            user: { 
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
             }
        }); // Invia il token e i dati dell'utente al client

        console.log("Login effettuato con successo:", token);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// GET profilo utente - Rotta protetta

router.get('/profile', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password'); // Trova l'utente in base all'ID decodificato dal token e non restituisce la password
        if (!user) {
            return res.status(404).json({ message: 'Utente non trovato' });
        }

        res.json(user); // Invia i dati dell'utente al client

    } catch (err) {
        console.error("Errore nel recupero del profilo:", err);
        res.status(500).json({ error: err.message });
    }
});


export default router; 