import { useEffect, useState } from "react";
import cenaImg from "../assets/Cena img.png"
import reignsImg from "../assets/Reigns img.png"
import reyImg from "../assets/Rey img.png"
import punkImg from "../assets/Cm img.png"
import dominikImg from "../assets/Dominik img.png"
import rheaImg from "../assets/Rhea img.png"
import flairImg from "../assets/Flair img.png"
import biancaImg from "../assets/Bianca img.png"
import codyImg from "../assets/Cody img.png"
import sethImg from "../assets/Seth img.png"
import drewImg from "../assets/Drew img.png"
import loganImg from "../assets/Logan img.png"
import randyImg from "../assets/Randy img.png"
import ajImg from "../assets/Aj img.png"
import "../pages/style/HeroCarousel.css";


const slides = [
    {
        image: cenaImg,
        title: "John Cena",
    },
    {
        image: reignsImg,
        title: "Roman Reigns",
    },
    {
        image: reyImg,
        title: "Rey Mysterio",
    },
    {
        image: punkImg,
        title: "CM Punk",
    },
    {
        image: dominikImg,
        title: "Dominik Mysterio",
    },
    {
        image: rheaImg,
        title: "Rhea Ripley",
    },
    {
        image: flairImg,
        title: "Charlotte Flair",
    },
    {
        image: biancaImg,
        title: "Bianca Belair",
    },
    {
        image: codyImg,
        title: "Cody Rhodes",
    },
    {
        image: sethImg,
        title: "Seth Rollins",
    },
    {
        image: drewImg,
        title: "Drew McIntyre",
    },
    {
        image: loganImg,
        title: "Logan Paul",
    },
    {
        image: randyImg,
        title: "Randy Orton",
    },
    {
        image: ajImg,
        title: "AJ Styles",
    }
]


const HeroCarousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length); // L'operatore % assicura che una volta raggiunto l'ultimo slide, il carosello torni al primo
        }, 4000); // Cambia slide ogni 4 secondi

        return () => clearInterval(interval); // Pulisce l'intervallo quando il componente viene smontato
    }, []);

    return (
        <div className="hero-carousel">
            {slides.map((slide, index) => (
                <div key={index} className={`slide ${index === currentSlide ? "active" : ""}`}>
                    <h2> {slide.title}</h2>
                    <img src={slide.image} alt={slide.title} />
                </div>
            ))}
        </div>
    );
};

export default HeroCarousel;