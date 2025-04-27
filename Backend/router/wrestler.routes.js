import { Router } from 'express';
import Wrestler from '../models/Wrestler.js';


const router = Router(); // Crea un router vuoto per gestire le rotte



//GET all wrestlers
router.get('/', async (req, res) => {
    try {
        const wrestlers = await Wrestler.find()

        res.status(200).json(wrestlers);

    } catch (err) {
        console.error("Errore nel recupero dei wrestlers:", err);
        res.status(500).json({ error: err.message });
    }
});


export default router;