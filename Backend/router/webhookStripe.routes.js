import express from "express";
import Stripe from "stripe";
import { Router } from "express";   

const router = Router(); 
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); 

// POST /webhook

router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature']; // Ottieni la firma dall'intestazione della richiesta
    const endpointSecret =  process.env.STRIPE.WEBHOOK.SECRET; // La chiave segreta del webhook

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret); // Verifica la firma e costruisci l'evento
    } catch (err) {
        console.error(`Webhook Error: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Gestisci l'evento in base al tipo
    if (event.type === 'checkout.session.completed') {
        const paymentIntent = event.data.object; // Ottieni l'oggetto della sessione
        console.log('Pagamento riuscito!', paymentIntent);

    } else {
        console.log('Pagamento non riuscito!', event.data.object); // Gestisci il pagamento non riuscito
        console.log(`Evento non gestito: ${event.type}`); // Gestisci altri eventi se necessario
    }

    res.status(200).send('Webhook ricevuto!'); // Rispondi al webhook
});

export default router;