import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../pages/style/FavoritesProduct.css";


const products = [
    {
        id: 1,
        name: "CM Punk ",
        image: "/img/cm-punk-figure.png",
        price: 49.99,
        wrestler: { name: "CM Punk" },
        route: "/shop/action-figures",
    },
    {
        id: 2,
        name: "Rey Mysterio ",
        image: "./img/rey-mysterio-figure.png",
        price: 49.99,
        wrestler: { name: "Rey Mysterio" },
        route: "/shop/action-figures",
    },
    {
        id: 3,
        name: "Cover John Cena - Hustle",
        image: "./img/john-cena-cover1.png",
        price: 19.99,
        wrestler: { name: "John Cena" },
        route: "/shop/cover",
    },
    {
        id: 4,
        name: "T-Shirt Rhea Ripley Mami",
        image: "./img/rhea-ripley-tshirt1.png",
        price: 29.99,
        wrestler: { name: "Rhea Ripley" },
        route: "/shop/magliette",
    },
];


const FavoritesProduct = () => {
    const [currentIndex, setCurrentIndex] = useState(0); // Indice per scorrere il carosello
    const navigate = useNavigate(); // Hook per la navigazione

    const moveCarousel = () => {

        setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length); // Torna all'inizio quando raggiunge la fine
    };

    useEffect(() => {
        const interval = setInterval(moveCarousel, 3000); // Cambia immagine ogni 3 secondi

        return () => clearInterval(interval); // Pulisci l'intervallo quando il componente viene smontato
    }, []);


    return (
        <section className="favorites-product-container">
            <h2 className="favorites-title">In Evidenza</h2>
            <div className="fav-carousel-container">
                <div className="fav-carousel row" >
                    {products.map((product, index) => (
                        <div
                            key={product.id}
                            onClick={() => navigate(product.route)}
                            style={{ cursor: "pointer" }}
                            className={`fav-card col-md-3 col-lg-3  ${index === currentIndex ? "active" : ""}`}
                        >
                            <img src={product.image} alt={product.name} />
                            <h3>{product.name}</h3>
                            <p>{product.price}€</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );

};

export default FavoritesProduct;