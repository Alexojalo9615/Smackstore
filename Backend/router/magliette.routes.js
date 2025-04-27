import { Router } from 'express';
import TShirt from '../models/Tshirt.js';
import isAdmin from '../middlewares/authorization.js';
import verifyToken from '../middlewares/verifyToken.js'; 
import Wrestler from '../models/Wrestler.js';


const router = Router();


// POST magliette

router.post('/tshirts',verifyToken, isAdmin, async (req, res) => {
    try {
        const { name,sizes, price,colors,gender, image, wrestler } = req.body;

        // Crea e salva la nuova action figure
        const newTshirts = new TShirt({
            name,
            sizes,
            price,
            colors,
            gender,
            image,
            wrestler, 
        });
        const savedTshirts = await newTshirts.save();

        res.status(201).json(savedTshirts);
    } catch (err) {
        console.error("Errore nella creazione della tshirt:", err);
        res.status(500).json({ error: err.message });
    }
});

// GET all tshirts

router.get('/tshirts', async (req, res) => {
    try {
        const shirts = await TShirt.find().populate('wrestler');
        res.status(200).json(shirts);
    } catch (err) {
        console.error("Errore nel recupero della tshirt:", err);
        res.status(500).json({ error: err.message });
    }
});


// GET tshirts by ID

router.get('/tshirts/:id', async (req, res) => {
    try {

        const shirts = await TShirt.findById(req.params.id).populate('wrestler'); // 'TShirt.findById(req.params.id)' cerca un documento in TShirt il cui Id corrisponda 'req.params.id'. Con populate si sostituisce il riferimento al wrestler (che è un ID) con l'intero documento del wrestler associato 
        if (!shirts) {
            return res.status(404).json({ message: 'Tshirt non trovata' });
        }
        res.status(200).json(shirts);
    } catch (err) {
        console.error("Errore nel recupero della tshirt:", err);
        res.status(500).json({ error: err.message });
    }
});


// PUT tshirts by ID

router.put('/tshirts/:id',verifyToken, isAdmin, async (req, res) => {
    try {
        const { name,sizes, price,colors,gender, image, wrestler } = req.body;

        const updatedTshirts = await TShirt.findByIdAndUpdate(
            req.params.id,
            { name,sizes, price,colors,gender, image, wrestler },
            { new: true } // Restituisce il documento aggiornato
        ).populate('wrestler');

        if (!updatedTshirts) {
            return res.status(404).json({ message: 'Tshirt non trovata' });
        }
        res.status(200).json(updatedTshirts);
    } catch (err) {
        console.error("Errore nell'aggiornamento della Tshirt:", err);
        res.status(500).json({ error: err.message });
    }
});

// DELETE tshirts by ID

router.delete('/tshirts/:id',verifyToken, isAdmin, async (req, res) => {
    try {
        const deletedTshirt = await TShirt.findByIdAndDelete(req.params.id);

        if (!deletedTshirt) {
            return res.status(404).json({ message: 'Tshirt non trovata' });
        }
        res.status(200).json({ message: 'Tshirt eliminata con successo' });
    } catch (err) {
        console.error("Errore nell'eliminazione della tshirt:", err);
        res.status(500).json({ error: err.message });
    }
});


export default router;