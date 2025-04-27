import { Router } from 'express';
import PhoneCase from '../models/PhoneCases.js';
import isAdmin from '../middlewares/authorization.js';
import Wrestler from '../models/Wrestler.js';

const router = Router();


// POST phone cases

router.post('/cases',isAdmin, async (req, res) => {
    try {
        const { name, price, image, wrestler } = req.body;

        // Crea e salva la nuova action figure
        const newCases = new PhoneCase({
            name,
            image,
            color,
            price,
            wrestler,
        });
        const savedCases = await newCases.save();

        res.status(201).json(savedCases);
    } catch (err) {
        console.error("Errore nella creazione della cover:", err);
        res.status(500).json({ error: err.message });
    }
});

// GET all phone cases

router.get('/cases', async (req, res) => {
    try {
        const covers = await PhoneCase.find().populate('wrestler');
        res.status(200).json(covers);
    } catch (err) {
        console.error("Errore nel recupero delle cover:", err);
        res.status(500).json({ error: err.message });
    }
});


// GET phone cases by ID

router.get('/cases/:id', async (req, res) => {
    try {

        const covers = await PhoneCase.findById(req.params.id).populate('wrestler'); // 'PhoneCases.findById(req.params.id)' cerca un documento in PhoneCases il cui Id corrisponda 'req.params.id'. Con populate si sostituisce il riferimento al wrestler (che è un ID) con l'intero documento del wrestler associato 
        if (!covers) {
            return res.status(404).json({ message: 'Cover non trovata' });
        }
        res.status(200).json(covers);
    } catch (err) {
        console.error("Errore nel recupero della cover:", err);
        res.status(500).json({ error: err.message });
    }
});


// PUT phone cases by ID

router.put('/cases/:id',isAdmin, async (req, res) => {
    try {
        const { name, price, image, wrestler } = req.body;

        const updatedCases = await PhoneCase.findByIdAndUpdate(
            req.params.id,
            { name, image,color, price, wrestler },
            { new: true } // Restituisce il documento aggiornato
        ).populate('wrestler');

        if (!updatedCases) {
            return res.status(404).json({ message: 'Cover non trovata' });
        }
        res.status(200).json(updatedCases);
    } catch (err) {
        console.error("Errore nell'aggiornamento delle cover:", err);
        res.status(500).json({ error: err.message });
    }
});

// DELETE action figure by ID

router.delete('/cases/:id',isAdmin, async (req, res) => {
    try {
        const deletedCases = await PhoneCase.findByIdAndDelete(req.params.id);

        if (!deletedCases) {
            return res.status(404).json({ message: 'Cover non trovata' });
        }
        res.status(200).json({ message: 'Cover eliminata con successo' });
    } catch (err) {
        console.error("Errore nell'eliminazione della cover:", err);
        res.status(500).json({ error: err.message });
    }
});


export default router;