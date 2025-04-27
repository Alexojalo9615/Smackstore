import express from 'express';
import Order from '../models/Orders.js';
import verifyToken from '../middlewares/verifyToken.js';
import { Router } from 'express';

const router = Router();

// POST /orders

router.post('/', verifyToken, async (req, res) => {
    try {
        console.log(req.body);

        let { orderItems, totalPrice, paymentIntentId } = req.body; // Estrai gli articoli dall'oggetto della richiesta

        orderItems = orderItems.map((item) => ({
            product: item._id, // ID del prodotto
            quantity: 1, // Quantità dell'articolo
            price: item.price, // Prezzo dell'articolo
            image: item.image, // Immagine dell'articolo
            name: item.name, // Nome dell'articolo
        })); 
            const order = new Order({
                user: req.user.id, // ID dell'utente autenticato
                orderItems,
                totalPrice,
                paymentIntentId, // il 'paymentIntentId' è un ID univoco generato da Stripe per identificare il pagamento
                paymentStatus: "completed", // Imposta lo stato del pagamento su completato
            });
            const savedOrder = await order.save(); // Salva l'ordine nel database
            res.status(201).json(savedOrder); // Restituisci l'ordine salvato come risposta

        } catch (error) {

            console.error("Errore durante la creazione dell'ordine:", error); // Stampa l'errore nella console
            res.status(500).json({ error: 'Errore durante la creazione dell\'ordine' }); // Restituisci un errore al client
        }
    });


export default router; 