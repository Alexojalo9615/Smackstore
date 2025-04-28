import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


function PaymentFailure() {
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 1000); // 1000 milliseconds = 1 second

        const redirectTimer = setTimeout(() => {
            navigate("/"); // Reindirizza alla home page dopo 3 secondi
        }, 5000); // 5000 millisecondi = 5 secondi

        return () => { clearTimeout(timer); // Pulisce il timer quando il componente viene smontato
                       clearTimeout(redirectTimer); // Pulisce il timer di reindirizzamento
        }
    }, [navigate]); // Aggiungo 'navigate' come dipendenza per evitare avvisi di dipendenze mancanti

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            {isVisible && (
            <motion.h1
                initial={{ scale: 0, opacity: 0 }}
                animate={{ opacity: 1, scale: 1.2 }}
                transition={{ duration: 0.8, type: "spring" }}
                style={{fontFamily: 'Impact, sans-serif', color: 'red', letterSpacing: '2px', textAlign: 'center'}}
            >
                <h1 className="text-center">Pagamento Fallito!</h1>
            </motion.h1>
            )}
        </div>
    );
}


export default PaymentFailure;