import { useState, useEffect } from 'react';
import "../pages/style/Catchphrase.css"


const catchphrase = [

    "Rest in Peace ...",
    "You Can't See Me!",
    "It's Time to Play the Game!",
    "I Am the Best There Is, the Best There Was, and the Best There Ever Will Be",
    "Give Me a Hell Yeah!",
]

const CatchphraseBanner = () => {
    const [currentPhrase, setCurrentPhrase] = useState("");
    const [index, setIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);

    useEffect(() => {
        const actualPhrase = catchphrase[index];

        if (charIndex < actualPhrase.length) {
            const timeout = setTimeout(() => {
                setCurrentPhrase(actualPhrase.slice(0, charIndex +1)); // 'slice' restituisce una parte della stringa
                setCharIndex((prev) => prev + 1);
            }
            , 100); // Tempo di digitazione per ogni carattere
        return () => clearTimeout(timeout); // Pulisce l'intervallo quando il componente viene smontato
        } else {
            const pause = setTimeout(() => {
                setCharIndex(0);
                setIndex((prev) => (prev + 1) % catchphrase.length); // Passa alla frase successiva
                setCurrentPhrase(""); // Resetta la frase corrente

            }, 2000); // Tempo di pausa tra le frasi

            return () => clearTimeout(pause); // Pulisce il timeout quando il componente viene smontato
        }
    }, [index, charIndex]);

    return (

        <div className="catchphrase-banner text-center mt-5">
            <h1 className="catchphrase-text ">{currentPhrase} <span className='cursor'>|</span> </h1>
        </div>
    );
}


export default CatchphraseBanner;