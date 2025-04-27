import express from 'express';
import Stripe from 'stripe';
import { Router } from 'express';

const router = Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Inizializza Stripe con la chiave segreta

// POST /create-checkout-session
router.post('/create-checkout-session', async (req, res) => {
    try {
        const { cartItems } = req.body; // Estrai gli articoli dal corpo della richiesta

        const line_items = cartItems.map((item) => ({
            price_data: {
                currency: 'eur',
                unit_amount: Math.round(item.price * 100), // Prezzo in centesimi, perchè Stripe accetta solo i centesimi. Math.round() arrotonda il prezzo a un numero intero più vicino
                product_data: {
                    name: item.name,
                    images: [item.image], // Deve essere un URL pubblico o verrà restituito un errore
                },
            },
            quantity: item.quantity || 1, // Quantità dell'articolo, se non specificata si assume 1
        }));

        const session = await stripe.checkout.sessions.create({ // Si utilizza 'stripe.checkout.sessions.create' per creare una sessione di checkout
            payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            success_url: "http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}", // URL di successo

            cancel_url: "http://localhost:3000/cancel", // URL di cancellazione
        });
        console.log(session.url);

        res.status(200).json({ url: session.url }); // Restituisci l'URL della sessione di checkout
    } catch (error) {

        console.error("Errore nella creazione della sessione di checkout:", error);
        res.status(500).json({ error: 'Errore nella creazione della sessione di checkout' });
    }
});


// GET / session/:sessionId
router.get('/session/:id', async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.retrieve(req.params.id); // Recupera la sessione di checkout da Stripe

        res.status(200).json({payment_intent: session.payment_intent}); // Restituisci l'oggetto della sessione di checkout
    } catch (error) {
        console.error("Errore nel recupero della sessione Stripe:", error);
        res.status(500).json({ error: 'Errore nel recupero della sessione' });
    }
});


export default router;