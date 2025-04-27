import { Router } from 'express';
import ActionFigure from '../models/ActionFigures.js';
import isAdmin from '../middlewares/authorization.js';
import verifyToken from '../middlewares/verifyToken.js';
import Wrestler from '../models/Wrestler.js';


const router = Router();


// POST action figures

router.post('/figures',verifyToken, isAdmin, async (req, res) => {
    try {
        const { name, price, image, wrestler } = req.body;

        // Crea e salva la nuova action figure
        const newActionFigure = new ActionFigure({
            name,
            price,
            image,
            wrestler, 
        });
        const savedFigure = await newActionFigure.save();

        res.status(201).json(savedFigure);
    } catch (err) {
        console.error("Errore nella creazione dell'action figure:", err);
        res.status(500).json({ error: err.message });
    }
});

// GET all action figures

router.get('/figures', async (req, res) => {
    try {
        const figures = await ActionFigure.find().populate('wrestler');
        res.status(200).json(figures);
    } catch (err) {
        console.error("Errore nel recupero delle action figures:", err);
        res.status(500).json({ error: err.message });
    }
});


// GET action figure by ID

router.get('/figures/:id', async (req, res) => {
    try {

        const figure = await ActionFigure.findById(req.params.id).populate('wrestler'); // 'ActionFigure.findById(req.params.id)' cerca un documento in ActionFigure il cui Id corrisponda 'req.params.id'. Con populate si sostituisce il riferimento al wrestler (che è un ID) con l'intero documento del wrestler associato 
        if (!figure) {
            return res.status(404).json({ message: 'Action figure non trovata' });
        }
        res.status(200).json(figure);
    } catch (err) {
        console.error("Errore nel recupero dell'action figure:", err);
        res.status(500).json({ error: err.message });
    }
});


// PUT action figure by ID

router.put('/figures/:id',verifyToken, isAdmin, async (req, res) => {
    try {
        const { name, price, image, wrestler } = req.body;

        const updatedFigure = await ActionFigure.findByIdAndUpdate(
            req.params.id,
            { name, price, image, wrestler },
            { new: true } // Restituisce il documento aggiornato
        ).populate('wrestler');

        if (!updatedFigure) {
            return res.status(404).json({ message: 'Action figure non trovata' });
        }
        res.status(200).json(updatedFigure);
    } catch (err) {
        console.error("Errore nell'aggiornamento dell'action figure:", err);
        res.status(500).json({ error: err.message });
    }
});

// DELETE action figure by ID

router.delete('/figures/:id',verifyToken, isAdmin, async (req, res) => {
    try {
        const deletedFigure = await ActionFigure.findByIdAndDelete(req.params.id);

        if (!deletedFigure) {
            return res.status(404).json({ message: 'Action figure non trovata' });
        }
        res.status(200).json({ message: 'Action figure eliminata con successo' });
    } catch (err) {
        console.error("Errore nell'eliminazione dell'action figure:", err);
        res.status(500).json({ error: err.message });
    }
});


export default router;