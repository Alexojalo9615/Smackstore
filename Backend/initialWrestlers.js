import mongoose from "mongoose";
import connectDb from "./connectDb.js";
import Wrestler from "./models/Wrestler.js"; // Importa il modello Wrestler
import { uploadManual } from "./middlewares/cloudinaryConfig.js";


const createWrestlers = async () => {
  try {
    await connectDb(); // Connessione al database

    // Array di wrestler da inserire nel database
    const wrestlers = [
      {
        name: "John Cena",
        roster: "Raw",
        image: await uploadManual("./assets/john-cena-image.png"),
        currentTitle: "",
        country: "USA",
      },
      {
        name: "Roman Reigns",
        roster: "SmackDown",
        image:await uploadManual("./assets/roman-reigns-image.png"), 
        currentTitle: ["Undisputed WWE Universal Championship"],
        country: "USA",
      },
      {
        name: "Rey Mysterio",
        roster: "Raw",
        image:await uploadManual("./assets/rey-mysterio-image.png"), 
        currentTitle:"",
        country: "Mexico",
      },
      {
        name: "CM Punk",
        roster: "Raw",
        image:await uploadManual("./assets/cm-punk-image.png"), 
        currentTitle: "",
        country: "USA",
      },
      {
        name: "Dominik Mysterio",
        roster: "Raw",
        image:await uploadManual("./assets/dominik-mysterio-image.png"),
        currentTitle: ["NXT North American Championship", "SmackDown Tag Team Championship"],
        country: "USA",
      },
      {
        name: "Rhea Ripley",
        roster: "Raw",
        image:await uploadManual("./assets/rhea-ripley-image.png"), 
        currentTitle: ["WWE Women's World Championship"],
        country: "Australia",
      },
      {
        name: "Charlotte Flair",
        roster: "SmackDown",
        image:await uploadManual("./assets/charlotte-flair-image.png"),
        currentTitle: "",
        country: "USA",
      },
      {
        name: "Bianca Belair",
        roster: "SmackDown",
        image:await uploadManual("./assets/bianca-belair-image.png"),
        currentTitle: ["WWE Women's Tag Team Championship"],
        country: "USA",
      },
      {
        name: "Cody Rhodes",
        roster: "Raw",
        image:await uploadManual("./assets/cody-rhodes-image.png"),
        currentTitle: ["WWE Undisputed Championship"],
        country: "USA",
      },
      {
        name: "Seth Rollins",
        roster: "Raw",
        image:await uploadManual("./assets/seth-rollins-image.png"), 
        currentTitle: "",
        country: "USA",
      },
      {
        name: "Drew McIntyre",
        roster: "SmackDown",
        image:await uploadManual("./assets/drew-mcintyre-image.png"), 
        currentTitle: "",
        country: "UK",
      },
      {
        name: "Logan Paul",
        roster: "Raw",
        image:await uploadManual("./assets/logan-paul-image.png"), 
        currentTitle: "",
        country: "USA",
      },
      {
        name: "Randy Orton",
        roster: "SmackDown",
        image:await uploadManual("./assets/randy-orton-image.png"), 
        currentTitle: "",
        country: "USA",
      },
      {
        name: "Aj Styles",
        roster: "Raw",
        image:await uploadManual("./assets/aj-styles-image.png"),
        currentTitle: "",
        country: "USA",
      },
     
    ];

    // Inserimento dei wrestler nel database
    await Wrestler.insertMany(wrestlers); // Con 'insertMany' puoi inserire un array di documenti in una sola volta nel database, in unica operazione
    console.log("Wrestler creati con successo!");
  } catch (error) {
    console.error("Errore durante la creazione dei wrestler:", error);
  } finally {
    mongoose.connection.close(); 
  }
}

createWrestlers(); 