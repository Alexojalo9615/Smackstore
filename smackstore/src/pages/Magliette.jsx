import { useEffect, useState } from "react";
import axios from "axios";
import "../pages/style/Magliette.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";


const Magliette = () => {
    const [magliette, setMagliette] = useState([]);
    const naigate = useNavigate();
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchMagliette = async () => {
            try {
                const response = await axios.get("http://localhost:5030/api/tshirts/tshirts");
                setMagliette(response.data);
                console.log(response.data);

            } catch (error) {
                console.error("Error fetching magliette:", error);
            }
        };

        fetchMagliette();
    }, []);

    return (
        <>
            <button className="btn border border-success text-success start-0 mt-5" onClick={() => naigate(-1)}> ← Torna allo shop</button>
            <div className="shoppy">
                <h1 className="shoppy-title">Tutte le Tshirts</h1>
                <div className="shoppy-grid">
                    {magliette.map((maglietta) => (
                        <div key={maglietta.id} className="shoppy-card">
                            <img className="mb-2" src={maglietta.image} alt={maglietta.name} />
                            <h2 className="tit justify-content-center">{maglietta.name}</h2>
                            <div className="maglietta d-flex justify-content-evenly ">
                                <p>{maglietta.price}€</p><p>{maglietta.wrestler.name}</p>
                            </div>
                            <div className="d-flex justify-content-center mb-2">
                                <button className="btn btn-success" onClick={() => addToCart(maglietta)}>Aggiungi al carrello</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );

}

export default Magliette;