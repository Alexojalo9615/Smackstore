import { useEffect, useState } from "react";
import axios from "axios";
import "../pages/style/Figures.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";


const Figures = () => {
    const [figures, setFigures] = useState([]);
    const naigate = useNavigate();
    const { addToCart } = useCart(); 

    useEffect(() => {
        const fetchFigures = async () => {
            try {
                const response = await axios.get("http://localhost:5030/api/action-figures/figures");
                setFigures(response.data);
                console.log(response.data);

            } catch (error) {
                console.error("Error fetching figures:", error);
            }
        };

        fetchFigures();
    }, []);

    return (
        <>
            <button className="btn border border-success text-success start-0 mt-5" onClick={() => naigate(-1)}> ← Torna allo shop</button>
            <div className="action">
                <h1 className="action-title">Tutte le Action Figures</h1>
                <div className="action-grid">
                    {figures.map((figure) => (
                        <div key={figure.id} className="action-card">
                            <img className="mb-2" src={figure.image} alt={figure.name} />
                            <h2 className="tit2 d-flex justify-content-center">{figure.name}</h2>
                            <div className="action d-flex justify-content-evenly ">
                                <p>{figure.price}€</p><p>{figure.wrestler.name}</p>
                            </div>
                            <div className="d-flex justify-content-center mb-2">
                                <button className="btn btn-success" onClick={() => addToCart(figure)}>Aggiungi al carrello</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );

}

export default Figures;