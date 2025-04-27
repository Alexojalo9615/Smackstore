import mongoose from "mongoose";
import connectDb from "./connectDb.js";
import { uploadManual } from "./middlewares/cloudinaryConfig.js";
import TShirt from "./models/Tshirt.js";
import Wrestler from "./models/Wrestler.js";

const createTShirts = async () => {
  try {
    await connectDb(); // Connessione al database

    // Array di t-shirt da inserire nel database
    const tShirts = [
      {
        name: "T-Shirt John Cena UK",
        sizes: ["S", "M", "L", "XL"],
        price: 29.99,
        colors: ["Blu"],
        image: await uploadManual("./assets/tshirts/john-cena-tshirt1.jpeg"),
        wrestler: "John Cena",
      },
      {
        name: "T-Shirt John Cena Glasgow",
        sizes: ["M", "L"],
        price: 29.99,
        colors: ["Blu"],
        image: await uploadManual("./assets/tshirts/john-cena-tshirt2.png"),
        wrestler: "John Cena"
      },
      {
        name: "T-Shirt John Cena Hustle",
        sizes: ["S", "M", "L", "XL"],
        price: 29.99,
        colors: ["Nero"],
        image: await uploadManual("./assets/tshirts/john-cena-tshirt3.png"),
        wrestler: "John Cena"
      },
      {
        name: "T-Shirt Roman Reigns 1316",
        sizes: ["M", "L", "XL"],
        price: 29.99,
        colors: ["Nero"],
        image: await uploadManual("./assets/tshirts/roman-reigns-tshirt1.png"),
        wrestler: "Roman Reigns",
      },
      {
        name: "T-Shirt Roman Reigns Table",
        sizes: ["M", "L", "XL"],
        price: 29.99,
        colors: ["Nero"],
        image: await uploadManual("./assets/tshirts/roman-reigns-tshirt2.png"),
        wrestler: "Roman Reigns",
      },
      {
        name: "T-Shirt Roman Reigns Greatness",
        sizes: ["M", "L", "XL"],
        price: 29.99,
        colors: ["Nero"],
        image: await uploadManual("./assets/tshirts/roman-reigns-tshirt3.png"),
        wrestler: "Roman Reigns",
      },
      {
        name: "T-Shirt Rey Mysterio Hall of Fame",
        sizes: ["S", "M", "L"],
        price: 29.99,
        colors: ["Nero"],
        image: await uploadManual("./assets/tshirts/rey-mysterio-tshirt1.png"),
        wrestler: "Rey Mysterio",
      },
      {
        name: "T-Shirt Rey Mysterio Lucha",
        sizes: ["S", "M", "L"],
        price: 29.99,
        colors: ["Nero"],
        image: await uploadManual("./assets/tshirts/rey-mysterio-tshirt2.png"),
        wrestler: "Rey Mysterio",
      },
      {
        name: "T-Shirt Rey Mysterio 619",
        sizes: ["S", "M", "L"],
        price: 29.99,
        colors: ["Nero"],
        image: await uploadManual("./assets/tshirts/rey-mysterio-tshirt3.png"),
        wrestler: "Rey Mysterio",
      },
      {
        name: "T-Shirt CM Punk Thunder Black",
        sizes: ["S", "M", "L", "XL"],
        price: 29.99,
        colors: ["Nero"],
        image: await uploadManual("./assets/tshirts/cm-punk-tshirt1.png"),
        wrestler: "CM Punk",
      },
      {
        name: "T-Shirt CM Punk Thunder White",
        sizes: ["S", "M", "L", "XL"],
        price: 29.99,
        colors: ["Nero"],
        image: await uploadManual("./assets/tshirts/cm-punk-tshirt2.png"),
        wrestler: "CM Punk",
      },
      {
        name: "T-Shirt CM Punk Best in the World",
        sizes: ["S", "M", "L", "XL"],
        price: 29.99,
        colors: ["Nero"],
        image: await uploadManual("./assets/tshirts/cm-punk-tshirt3.png"),
        wrestler: "CM Punk",
      },
      {
        name: "T-Shirt Dominik Mysterio Daddy",
        sizes: ["M", "L", "XL"],
        price: 29.99,
        colors: ["Nero"],
        image: await uploadManual("./assets/tshirts/dominik-mysterio-tshirt1.png"),
        wrestler: "Dominik Mysterio",
      },
      {
        name: "T-Shirt Dominik Mysterio Dom",
        sizes: ["M", "L", "XL"],
        price: 29.99,
        colors: ["Bianca"],
        image: await uploadManual("./assets/tshirts/dominik-mysterio-tshirt2.png"),
        wrestler: "Dominik Mysterio",
      },
      {
        name: "T-Shirt Dominik Mysterio Latino",
        sizes: ["M", "L", "XL"],
        price: 29.99,
        colors: ["Nero"],
        image: await uploadManual("./assets/tshirts/dominik-mysterio-tshirt3.png"),
        wrestler: "Dominik Mysterio",
      },
      {
        name: "T-Shirt Rhea Ripley Mami",
        sizes: ["S", "M", "L", "XL"],
        price: 29.99,
        colors: ["Nero", "Viola"],
        image: await uploadManual("./assets/tshirts/rhea-ripley-tshirt1.png"),
        wrestler: "Rhea Ripley",
      },
      {
        name: "T-Shirt Rhea Ripley Back",
        sizes: ["S", "M", "L", "XL"],
        price: 29.99,
        colors: ["Nero"],
        image: await uploadManual("./assets/tshirts/rhea-ripley-tshirt2.png"),
        wrestler: "Rhea Ripley",
      },
      {
        name: "T-Shirt Rhea Ripley Mistake",
        sizes: ["S", "M", "L", "XL"],
        price: 29.99,
        colors: ["Nero"],
        image: await uploadManual("./assets/tshirts/rhea-ripley-tshirt3.png"),
        wrestler: "Rhea Ripley",
      },
      {
        name: "T-Shirt Charlotte Flair Top",
        sizes: ["S", "M", "L", "XL"],
        price: 29.99,
        colors: ["Nero"],
        image: await uploadManual("./assets/tshirts/charlotte-flair-tshirt1.png"),
        wrestler: "Charlotte Flair",
      },
      {
        name: "T-Shirt Charlotte Flair First",
        sizes: ["S", "M", "L", "XL"],
        price: 29.99,
        colors: ["Nero"],
        image: await uploadManual("./assets/tshirts/charlotte-flair-tshirt2.png"),
        wrestler: "Charlotte Flair",
      },
      {
        name: "T-Shirt Charlotte Flair Winner",
        sizes: ["S", "M", "L", "XL"],
        price: 29.99,
        colors: ["Nero"],
        image: await uploadManual("./assets/tshirts/charlotte-flair-tshirt3.png"),
        wrestler: "Charlotte Flair",
      },
      {
        name: "T-Shirt Bianca Belair Strongest",
        sizes: ["S", "M", "L", "XL"],
        price: 29.99,
        colors: ["Nero"],
        image: await uploadManual("./assets/tshirts/bianca-belair-tshirt1.png"),
        wrestler: "Bianca Belair",
      },
      {
        name: "T-Shirt Bianca Belair Est",
        sizes: ["S", "M", "L", "XL"],
        price: 29.99,
        colors: ["Nero"],
        image: await uploadManual("./assets/tshirts/bianca-belair-tshirt2.png"),
        wrestler: "Bianca Belair",
      },
      {
        name: "T-Shirt Bianca Belair Blessed",
        sizes: ["S", "M", "L", "XL"],
        price: 29.99,
        colors: ["Nero"],
        image: await uploadManual("./assets/tshirts/bianca-belair-tshirt3.png"),
        wrestler: "Bianca Belair",
      },
      {
        name: "T-Shirt Cody Rhodes Nightmare",
        sizes: ["S", "M", "L", "XL"],
        price: 29.99,
        colors: ["Nero"],
        image: await uploadManual("./assets/tshirts/cody-rhodes-tshirt1.png"),
        wrestler: "Cody Rhodes",
      },
      {
        name: "T-Shirt Cody Rhodes Picture",
        sizes: ["S", "M", "L", "XL"],
        price: 29.99,
        colors: ["Nero"],
        image: await uploadManual("./assets/tshirts/cody-rhodes-tshirt2.png"),
        wrestler: "Cody Rhodes",
      },
      {
        name: "T-Shirt Cody Rhodes Flag",
        sizes: ["S", "M", "L", "XL"],
        price: 29.99,
        colors: ["Nero"],
        image: await uploadManual("./assets/tshirts/cody-rhodes-tshirt3.png"),
        wrestler: "Cody Rhodes",
      },
      {
        name: "T-Shirt Seth Rollins Visionary",
        sizes: ["S", "M", "L", "XL"],
        price: 29.99,
        colors: ["Nero"],
        image: await uploadManual("./assets/tshirts/seth-rollins-tshirt1.png"),
        wrestler: "Seth Rollins",
      },
      {
        name: "T-Shirt Seth Rollins Picture",
        sizes: ["S", "M", "L", "XL"],
        price: 29.99,
        colors: ["Nero"],
        image: await uploadManual("./assets/tshirts/seth-rollins-tshirt2.png"),
        wrestler: "Seth Rollins",
      },
      {
        name: "T-Shirt Seth Rollins Freakin",
        sizes: ["S", "M", "L", "XL"],
        price: 29.99,
        colors: ["Nero"],
        image: await uploadManual("./assets/tshirts/seth-rollins-tshirt3.png"),
        wrestler: "Seth Rollins",
      },
      {
        name: "T-Shirt Drew McIntyre Dragon",
        sizes: ["S", "M", "L", "XL"],
        price: 29.99,
        colors: ["Nero"],
        image: await uploadManual("./assets/tshirts/drew-mcintyre-tshirt1.png"),
        wrestler: "Drew McIntyre",
      },
      {
        name: "T-Shirt Drew McIntyre Warrior",
        sizes: ["S", "M", "L", "XL"],
        price: 29.99,
        colors: ["Nero"],
        image: await uploadManual("./assets/tshirts/drew-mcintyre-tshirt2.png"),
        wrestler: "Drew McIntyre",
      },
      {
        name: "T-Shirt Drew McIntyre Medieval",
        sizes: ["S", "M", "L", "XL"],
        price: 29.99,
        colors: ["Nero"],
        image: await uploadManual("./assets/tshirts/drew-mcintyre-tshirt3.png"),
        wrestler: "Drew McIntyre",
      },
      {
        name: "T-Shirt Logan Paul Hate",
        sizes: ["S", "M", "L", "XL"],
        price: 29.99,
        colors: ["Bianca"],
        image: await uploadManual("./assets/tshirts/logan-paul-tshirt1.png"),
        wrestler: "Logan Paul",
      },
      {
        name: "T-Shirt Logan Paul Humble",
        sizes: ["S", "M", "L", "XL"],
        price: 29.99,
        colors: ["Nero"],
        image: await uploadManual("./assets/tshirts/logan-paul-tshirt2.png"),
        wrestler: "Logan Paul",
      },
      {
        name: "T-Shirt Logan Paul Picture",
        sizes: ["S", "M", "L", "XL"],
        price: 29.99,
        colors: ["Nero"],
        image: await uploadManual("./assets/tshirts/logan-paul-tshirt3.png"),
        wrestler: "Logan Paul",
      },
      {
        name: "T-Shirt Randy Orton RKO",
        sizes: ["S", "M", "L", "XL"],
        price: 29.99,
        colors: ["Nero"],
        image: await uploadManual("./assets/tshirts/randy-orton-tshirt1.png"),
        wrestler: "Randy Orton",
      },
      {
        name: "T-Shirt Randy Orton Predator",
        sizes: ["S", "M", "L", "XL"],
        price: 29.99,
        colors: ["Nero"],
        image: await uploadManual("./assets/tshirts/randy-orton-tshirt2.png"),
        wrestler: "Randy Orton",
      },
      {
        name: "T-Shirt Randy Orton Viper",
        sizes: ["S", "M", "L", "XL"],
        price: 29.99,
        colors: ["Nero"],
        image: await uploadManual("./assets/tshirts/randy-orton-tshirt3.png"),
        wrestler: "Randy Orton",
      },
      {
        name: "T-Shirt Aj Styles One",
        sizes: ["S", "M", "L", "XL"],
        price: 29.99,
        colors: ["Bianca"],
        image: await uploadManual("./assets/tshirts/aj-styles-tshirt1.png"),
        wrestler: "Aj Styles",
      },
      {
        name: "T-Shirt Aj Styles P1",
        sizes: ["S", "M", "L", "XL"],
        price: 29.99,
        colors: ["Nero"],
        image: await uploadManual("./assets/tshirts/aj-styles-tshirt2.png"),
        wrestler: "Aj Styles",
      },
      {
        name: "T-Shirt Aj Styles Phenomenal",
        sizes: ["S", "M", "L", "XL"],
        price: 29.99,
        colors: ["Nero"],
        image: await uploadManual("./assets/tshirts/aj-styles-tshirt3.png"),
        wrestler: "Aj Styles",
      },
    ];

    const updatedTShirts = await Promise.all(

      tShirts.map(async (tShirt) => {
        const wrestler = await Wrestler.findOne({ name: tShirt.wrestler }); // con 'findOne' cerco il wrestler in base al nome nella collection 'Wrestler', in questo caso il cirterio è {name: tShirt.wrestler}. Si usa await perchè 'findOne' è una funzione asincrona che restituisce una promise. Se il wrestler viene trovato, viene assegnato alla variabile 'wrestler', altrimenti 'wrestler' sarà null.
        if (wrestler) {

          tShirt.wrestler = wrestler._id; // Aggiorna l'ID del wrestler nella t-shirt
        } else {
          console.error(`Wrestler ${tShirt.wrestler} non trovato`);
        }
        return tShirt; // Restituisce la t-shirt aggiornata
      })
    );



    // Inserisce le t-shirt nel database
    await TShirt.insertMany(updatedTShirts);
    console.log("T-Shirt create con successo!");
  } catch (error) {
    console.error("Errore durante la creazione delle T-Shirt:", error);
  } finally {
    mongoose.connection.close(); // Chiude la connessione al database
  }
};

createTShirts(); 