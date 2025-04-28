import { createContext, useContext, useState, useEffect } from "react";


const CartContext = createContext(); // createContext restituisc un oggetto con due proprietà: Provider e Consumer. Il Provider è un componente che fornisce il valore del contesto ai suoi figli, mentre il Consumer è un componente che consuma il valore del contesto. In questo caso stiamo creando un contesto chiamato CartContext.


function CartProviderWrapper({ children }) { // CartProviderWrapper è un componente che utilizza il CartContext.Provider per fornire il valore del contesto ai suoi figli. Il valore del contesto è un oggetto con le chiavi cart, addToCart, removeFromCart e clearCart.
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem("cart"); // localStorage.getItem() è un metodo che restituisce il valore di una chiave specifica dal LocalStorage. In questo caso stiamo cercando la chiave "cart".
        return savedCart ? JSON.parse(savedCart) : []; // JSON.parse() è un metodo che converte una stringa JSON in un oggetto JavaScript. In questo caso stiamo convertendo la stringa JSON restituita da localStorage.getItem() in un oggetto JavaScript. Se non c'è alcun valore salvato con la chiave "cart" restituiamo un array vuoto.
    });


    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart)); // localStorage.setItem() è un metodo che salva un valore in LocalStorage. In questo caso stiamo salvando il valore del cart convertito in una stringa JSON.
    }, [cart]);


    const addToCart = (product) => {
        setCart((prevCart) => [...prevCart, product]); // setCart è una funzione che aggiorna lo stato del cart. In questo caso stiamo aggiornando lo stato del cart aggiungendo il prodotto passato come argomento alla funzione addToCart.
    }


    const removeItemFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
    };


    const clearCart = () => {
        setCart([]); // setCart è una funzione che aggiorna lo stato del cart. In questo caso stiamo aggiornando lo stato del cart a un array vuoto.
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, removeItemFromCart, clearCart }}> {/* CartContext.Provider è un componente che accetta un valore "value" che sarà passato a tutti i componenti figli. In questo caso il valore è un oggetto con le chiavi cart, addToCart, removeFromCart e clearCart. é un meccanismo che non prevede l'utilizzo delle props */}
            {children}
        </CartContext.Provider>
    );
}

function useCart() {
    return useContext(CartContext); // useContext è un hook che consuma il valore del contesto. In questo caso stiamo consumando il valore del CartContext.
}


export { CartProviderWrapper, useCart }; 