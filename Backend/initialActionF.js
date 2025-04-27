import mongoose from "mongoose";
import connectDb from "./connectDb.js";
import ActionFigure from "./models/ActionFigures.js"; // Importa il modello ActionFigure
import { uploadManual } from "./middlewares/cloudinaryConfig.js";
import Wrestler from "./models/Wrestler.js";


const createActionFigures = async () => {

    try {
        await connectDb(); // Connessione al database

        const actionFigures = [
            {
                name: "John Cena  ",
                price: 49.99,
                image: await uploadManual("./assets/actionfigures/john-cena-figure.webp"),
                wrestler: "John Cena"
            },
            {
                name: "Roman Reigns ",
                price: 49.99,
                image: await uploadManual("./assets/actionfigures/roman-reigns-figure.png"),
                wrestler: "Roman Reigns"
            },
            {
                name: "Rey Mysterio ",
                price: 49.99,
                image: await uploadManual("./assets/actionfigures/rey-mysterio-figure.png"),
                wrestler: "Rey Mysterio"
            },
            {
                name: "CM Punk ",
                price: 49.99,
                image: await uploadManual("./assets/actionfigures/cm-punk-figure.png"),
                wrestler: "CM Punk"
            },
            {
                name: "Dominik Mysterio ",
                price: 49.99,
                image: await uploadManual("./assets/actionfigures/dominik-mysterio-figure.png"),
                wrestler: "Dominik Mysterio"
            },
            {
                name: "Rhea Ripley ",
                price: 49.99,
                image: await uploadManual("./assets/actionfigures/rhea-ripley-figure.png"),
                wrestler: "Rhea Ripley"
            },
            {
                name: "Charlotte Flair ",
                price: 49.99,
                image: await uploadManual("./assets/actionfigures/charlotte-flair-figure.png"),
                wrestler: "Charlotte Flair"
            },
            {
                name: "Bianca Belair ",
                price: 49.99,
                image: await uploadManual("./assets/actionfigures/bianca-belair-figure.png"),
                wrestler: "Bianca Belair"
            },
            {
                name: "Cody Rhodes ",
                price: 49.99,
                image: await uploadManual("./assets/actionfigures/cody-rhodes-figure.png"),
                wrestler: "Cody Rhodes"
            },
            {
                name: "Seth Rollins ",
                price: 49.99,
                image: await uploadManual("./assets/actionfigures/seth-rollins-figure.png"),
                wrestler: "Seth Rollins"
            },
            {
                name: "Drew McIntyre ",
                price: 49.99,
                image: await uploadManual("./assets/actionfigures/drew-mcintyre-figure.png"),
                wrestler: "Drew McIntyre"
            },
            {
                name: "Logan Paul ",
                price: 49.99,
                image: await uploadManual("./assets/actionfigures/logan-paul-figure.png"),
                wrestler: "Logan Paul"
            },
            {
                name: "Randy Orton ",
                price: 49.99,
                image: await uploadManual("./assets/actionfigures/randy-orton-figure.png"),
                wrestler: "Randy Orton"
            },
            {
                name: "Aj Styles ",
                price: 49.99,
                image: await uploadManual("./assets/actionfigures/aj-styles-figure.png"),
                wrestler: "Aj Styles"
            },
        ]


        const updatedActionFigures = await Promise.all(
            actionFigures.map(async (actionFigure) => {
                // const trimmedname =
                const wrestler = await Wrestler.findOne({ name: actionFigure.wrestler });
                // Cerca il wrestler in base al nome nella collezione Wrestler
                if (wrestler) {
                    actionFigure.wrestler = wrestler._id; // Aggiorna il campo wrestler con l'ID del wrestler trovato
                } else {
                    console.error(`Wrestler ${actionFigure.wrestler} non trovato`);
                }
                return actionFigure; // Restituisce l'action figure aggiornata
            })
        );

        await ActionFigure.insertMany(updatedActionFigures);
        console.log("Action Figures creati con successo!");
    } catch (error) {

        console.error("Errore durante la creazione delle Action Figures:", error);
     }
    finally {
        mongoose.connection.close(); // Chiude la connessione al database
    }
}

createActionFigures();

// const deleteActionFigures = async () => {
//     try {
//         await connectDb(); // Connessione al database

//         const result = await ActionFigure.deleteMany({}); // Cancella tutti i documenti nella collezione ActionFigure
//         console.log(`${result.deletedCount} action figures eliminate con successo!`);
//     } catch (error) {
//         console.error("Errore durante l'eliminazione delle action figures:", error);
//     } finally {
//         mongoose.connection.close(); // Chiude la connessione al database
//     }
// };

// // Chiama la funzione per eliminare le action figures
// deleteActionFigures();