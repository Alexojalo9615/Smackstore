import { useEffect, useState } from "react";
import axios from "axios";
import "../pages/style/Covers.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";


const Covers = () => {
    const [cover, setCover] = useState([]);
    const navigate = useNavigate();
    const { addToCart } = useCart(); // Importa la funzione addToCart dal contesto del carrello

    useEffect(() => {
        const fetchCovers = async () => {
            try {
                const response = await axios.get("http://localhost:5030/api/cases/cases");
                setCover(response.data);
                console.log(response.data);

            } catch (error) {
                console.error("Error fetching covers:", error);
            }
        };

        fetchCovers();
    }, []);

    return (
        <>
            <button className="btn border border-success text-success start-0 mt-5" onClick={() => navigate(-1)}> ← Torna allo shop</button>
            <div className="cover">
                <h1 className="cover-title">Tutte le Cover</h1>
                <div className="cover-grid">
                    {cover.map((covers) => (
                        <div key={covers.id} className="cover-card">
                            <img className="mb-2" src={covers.image} alt={covers.name} />
                            <h2 className="tit3 justify-content-center ">{covers.name}</h2>
                            <div className="cover d-flex justify-content-evenly ">
                                <p>{covers.price}€</p><p>{covers.wrestler.name}</p><p>{covers.color}</p>
                            </div>
                            <div className="d-flex justify-content-center mt-2">
                                <button className="btn btn-success" onClick={() => addToCart(covers)}>Aggiungi al carrello</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );

}

export default Covers;