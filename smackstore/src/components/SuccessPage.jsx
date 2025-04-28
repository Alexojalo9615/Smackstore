import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import axios from "axios";

function PaymentSuccess() {
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();
    const { clearCart, cart } = useCart();

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 1000); // 1000 milliseconds = 1 second

        const createOrder = async () => {
            try {
                const token = localStorage.getItem("token");
                const sessionId = new URLSearchParams(window.location.search).get("session_id"); // Ottieni l'ID della sessione dalla query string

                const { data } = await axios.get(`http://localhost:5030/api/stripe/session/${sessionId}`); // Recupera la sessione di pagamento da Stripe
                const paymentIntentId = data.payment_intent; // Ottieni l'ID del pagamento dalla risposta

                const totalPrice = cart.reduce((total, item) => total + parseFloat(item.price) * parseInt(item.quantity || 1), 0).toFixed(2); // Calcola il prezzo totale del carrello

                const orderData = {
                    orderItems: cart,
                    totalPrice,
                    paymentIntentId,
                };

                await axios.post("http://localhost:5030/api/orders", orderData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                console.log("Ordine in invio al backend:", orderData);

                clearCart(); // Svuota il carrello dopo aver creato l'ordine
            } catch (error) {
                console.error("Errore durante il salvataggio dell'ordine:", error);
            }
        }
        if (cart.length > 0) {
            createOrder(); // Crea l'ordine solo se ci sono articoli nel carrello
        }


        const redirectTimer = setTimeout(() => {
            navigate("/"); // Reindirizza alla home page dopo 3 secondi
        }, 5000); // 5000 millisecondi = 5 secondi

        return () => {
            clearTimeout(timer);
            clearTimeout(redirectTimer); // Pulisce il timer di reindirizzamento
        }
    }, [navigate, cart, clearCart]); // Aggiungo 'navigate' come dipendenza per evitare avvisi di dipendenze mancanti

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            {isVisible && (
                <motion.h1
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ opacity: 1, scale: 1.2 }}
                    transition={{ duration: 0.8, type: "spring" }}
                    style={{ fontFamily: 'Impact, sans-serif', color: 'green', letterSpacing: '2px', textAlign: 'center' }}
                >
                    <h1 className="text-center">Pagamento Effettuato con Successo!</h1>
                </motion.h1>
            )}
        </div>
    );
}

export default PaymentSuccess;