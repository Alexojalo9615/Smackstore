import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext"; // Importa il contesto del carrello
import handleCheckout from "../contexts/HandleCheckout"; // Importa la funzione di checkout
import { toast } from "react-toastify";

const Cart = () => {
    const { cart, addToCart, removeItemFromCart, clearCart } = useCart(); // Consuma il contesto del carrello
    const navigate = useNavigate();

    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + parseFloat(item.price) * parseInt(item.quantity || 1), 0).toFixed(2);
    };

    return (
        <>
            <button className="btn border border-success text-success start-0 mt-5" onClick={() => navigate(-1)}> ← Torna indietro</button>
            <button className="btn border bg-danger border-danger text-light mt-5" onClick={() => clearCart()}> Svuota Carrello</button>

            <div className="cart-container">
                <h1>Carrello</h1>

                {cart.length === 0 ? (
                    <p>Il carrello è vuoto.</p>
                ) : (
                    <div>
                        {cart.map((item) => (
                            <div key={item._id} className="cart-item">
                                <img src={item.image} alt={item.name} />
                                <div className="cart-item-details">
                                    <h2>{item.name}</h2>
                                    <p>{item.price}€</p>
                                    <p>Quantità: {item.quantity}</p>
                                    <button
                                        onClick={() => {
                                            removeItemFromCart(item._id);
                                        }}
                                    >
                                        Rimuovi
                                    </button>
                                    <button
                                        onClick={() => {
                                            addToCart(item);
                                        }}
                                    >
                                        Aggiungi Quantità
                                    </button>
                                </div>
                            </div>
                        ))}
                        <div className="cart-total mb-5 border-top pt-3 text-center">
                            <h2 className="text-success">Totale: {getTotalPrice()}€</h2>
                        </div>
                        <div className="d-flex justify-content-center mb-5">
                            <button
                                className="btn btn-success"
                                onClick={() => {
                                    const token = localStorage.getItem("token");
                                    if (!token) {
                                        toast.warning("Effettua il login per accedere al carrello",);
                                        navigate("/login");
                                        return; // Exit the function if no token
                                    }
                                    handleCheckout(cart); // Proceed to checkout only if the token exists
                                }}
                            >
                                Procedi al pagamento
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Cart;