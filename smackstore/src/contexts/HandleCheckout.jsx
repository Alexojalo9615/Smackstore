import { loadStripe } from '@stripe/stripe-js';


const stripePromise = loadStripe("pk_test_51RGhKJQhycv4X7XOtecLzddQxV67KmP7sZxfGjB8inTofDmPQyULiB6wCg4DHPlK1MUVNRVFae2uxSa8ViyvYEi700iLcirNjK"); // Carica la chiave pubblica di Stripe


const handleCheckout = async (cartItems) => { // Funzione per gestire il checkout


    try {

        const response = await fetch("http://localhost:5030/api/stripe/create-checkout-session", { // Invia una richiesta POST al server per creare una sessione di checkout
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ cartItems }), // Invia gli articoli del carrello come corpo della richiesta
        });
        const data = await response.json(); // Ottieni la risposta in formato JSON
        const stripe = await stripePromise; // Attendi il caricamento di Stripe

        window.location.href = data.url; // Reindirizza l'utente all'URL della sessione di checkout

    } catch (error) {
        console.error("Errore nel checkout:", error);
        alert('Si è verificato un errore nel pagamento.'); // Mostra un messaggio di errore
    }
}

export default handleCheckout; 