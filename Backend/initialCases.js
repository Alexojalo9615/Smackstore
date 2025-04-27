import mongoose from "mongoose";
import connectDb from "./connectDb.js";
import PhoneCase from "./models/PhoneCases.js"; // Importa il modello PhoneCase
import { uploadManual } from "./middlewares/cloudinaryConfig.js";
import Wrestler from "./models/Wrestler.js";


const createPhoneCases = async () => {


    try {
        await connectDb();

        const phoneCases = [
            {
                name: "Cover John Cena - Hustle",
                image: await uploadManual("./assets/cases/john-cena-cover1.png"),
                color: "Blu",
                price: 19.99,
                wrestler: "John Cena"
            },
            {
                name: "Cover John Cena - Give Up",
                image: await uploadManual("./assets/cases/john-cena-cover2.png"),
                color: "Arancione",
                price: 19.99,
                wrestler: "John Cena"
            },
            {
                name: "Cover Roman Reigns - Thunder",
                image: await uploadManual("./assets/cases/roman-reigns-cover1.png"),
                color: "Blu",
                price: 19.99,
                wrestler: "Roman Reigns"
            },
            {
                name: "Cover Roman Reigns - Glasses",
                image: await uploadManual("./assets/cases/roman-reigns-cover2.png"),
                color: "Nero",
                price: 19.99,
                wrestler: "Roman Reigns"
            },
            {
                name: "Cover Rey Mysterio - Flames",
                image: await uploadManual("./assets/cases/rey-mysterio-cover1.png"),
                color: "Arancione",
                price: 19.99,
                wrestler: "Rey Mysterio"
            },
            {
                name: "Cover Rey Mysterio - Master",
                image: await uploadManual("./assets/cases/rey-mysterio-cover2.png"),
                color: "Nero",
                price: 19.99,
                wrestler: "Rey Mysterio"
            },
            {
                name: "Cover CM Punk - Front",
                image: await uploadManual("./assets/cases/cm-punk-cover1.png"),
                color: "Nero",
                price: 19.99,
                wrestler: "CM Punk"
            },
            {
                name: "Cover CM Punk - Lightning",
                image: await uploadManual("./assets/cases/cm-punk-cover2.png"),
                color: "Nero",
                price: 19.99,
                wrestler: "CM Punk"
            },
            {
                name: "Cover Dominik Mysterio - Dom",
                image: await uploadManual("./assets/cases/dominik-mysterio-cover1.png"),
                color: "Viola",
                price: 19.99,
                wrestler: "Dominik Mysterio"
            },
            {
                name: "Cover Dominik Mysterio - Front",
                image: await uploadManual("./assets/cases/dominik-mysterio-cover2.png"),
                color: "Viola",
                price: 19.99,
                wrestler: "Dominik Mysterio"
            },
            {
                name: "Cover Rhea Ripley - Front",
                image: await uploadManual("./assets/cases/rhea-ripley-cover1.png"),
                color: "Viola",
                price: 19.99,
                wrestler: "Rhea Ripley"
            },
            {
                name: "Cover Rhea Ripley - Mami",
                image: await uploadManual("./assets/cases/rhea-ripley-cover2.png"),
                color: "Nero",
                price: 19.99,
                wrestler: "Rhea Ripley"
            },
            {
                name: "Cover Charlotte Flair - Front",
                image: await uploadManual("./assets/cases/charlotte-flair-cover1.png"),
                color: "Blu",
                price: 19.99,
                wrestler: "Charlotte Flair"
            },
            {
                name: "Cover Charlotte Flair - Queen",
                image: await uploadManual("./assets/cases/charlotte-flair-cover2.png"),
                color: "Nero",
                price: 19.99,
                wrestler: "Charlotte Flair"
            },
            {
                name: "Cover Rey Mysterio - Kiss",
                image: await uploadManual("./assets/cases/bianca-belair-cover1.png"),
                color: "Rosa",
                price: 19.99,
                wrestler: "Bianca Belair"
            },
            {
                name: "Cover Cody Rhodes - Front",
                image: await uploadManual("./assets/cases/cody-rhodes-cover1.png"),
                color: "Bianco",
                price: 19.99,
                wrestler: "Cody Rhodes"
            },
            {
                name: "Cover Cody Rhodes - Nightmare",
                image: await uploadManual("./assets/cases/cody-rhodes-cover2.png"),
                color: "Nero",
                price: 19.99,
                wrestler: "Cody Rhodes"
            },
            {
                name: "Cover Seth Rollins - Front",
                image: await uploadManual("./assets/cases/seth-rollins-cover1.png"),
                color: "Rosso",
                price: 19.99,
                wrestler: "Seth Rollins"
            },
            {
                name: "Cover Seth Rollins - Freakin",
                image: await uploadManual("./assets/cases/seth-rollins-cover2.png"),
                color: "Nero",
                price: 19.99,
                wrestler: "Seth Rollins"
            },
            {
                name: "Cover Drew McIntyre - Sword ",
                image: await uploadManual("./assets/cases/drew-mcintyre-cover1.png"),
                color: "Blu",
                price: 19.99,
                wrestler: "Drew McIntyre"
            },
            {
                name: "Cover Drew McIntyre - Kneel",
                image: await uploadManual("./assets/cases/drew-mcintyre-cover2.png"),
                color: "Nero",
                price: 19.99,
                wrestler: "Drew McIntyre"
            },
            {
                name: "Cover Logan Paul - Faces",
                image: await uploadManual("./assets/cases/logan-paul-cover1.png"),
                color: "Bianco",
                price: 19.99,
                wrestler: "Logan Paul"
            },
            {
                name: "Cover Randy Orton - Veins",
                image: await uploadManual("./assets/cases/randy-orton-cover1.png"),
                color: "Rosso",
                price: 19.99,
                wrestler: "Randy Orton"
            },
            {
                name: "Cover Randy Orton - Killer ",
                image: await uploadManual("./assets/cases/randy-orton-cover2.png"),
                color: "Nero",
                price: 19.99,
                wrestler: "Randy Orton"
            },
            {
                name: "Cover Aj Styles - Front",
                image: await uploadManual("./assets/cases/aj-styles-cover1.png"),
                color: "Rosso",
                price: 19.99,
                wrestler: "Aj Styles"
            },
            {
                name: "Cover Aj Styles - Front",
                image: await uploadManual("./assets/cases/aj-styles-cover2.png"),
                color: "Blu",
                price: 19.99,
                wrestler: "Aj Styles"
            },
        ];


        const updatedCases = await Promise.all(
            phoneCases.map(async (phoneCase) => {
                const wrestler = await Wrestler.findOne({ name: phoneCase.wrestler }); 
                // Cerca il wrestler in base al nome nella collezione Wrestler
                if (wrestler) {
                    phoneCase.wrestler = wrestler._id; // Aggiorna il campo wrestler con l'ID del wrestler trovato
                } else {
                    console.error(`Wrestler ${phoneCase.wrestler} non trovato`);
                }
                return phoneCase; // Restituisce la cover aggiornata
            })
        );

        await PhoneCase.insertMany(updatedCases); // Inserisce le cover aggiornate nel database
        console.log("Phone Cases creati con successo!");
    } catch (error) {
        console.error("Errore durante la creazione delle Phone Cases:", error);
    } finally {
        mongoose.connection.close(); // Chiude la connessione al database
    }
};

createPhoneCases()