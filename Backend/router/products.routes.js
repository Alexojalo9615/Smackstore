import { Router } from 'express';
import verifyToken from '../middlewares/verifyToken.js';
import { upload } from '../middlewares/cloudinaryConfig.js';
import Product from '../models/Product.js';


const router = Router(); // Crea un router vuoto per gestire le rotte

// POST a new product

router.post('/', verifyToken, upload.single("image"), async (req, res) => {
    try {
        const { name, price, category, wrestler } = req.body;

        if (!name || !price || !category || !wrestler || !req.file) {
            return res.status(400).json({ message: 'Tutti i campi sono obbligatori' });
        }

        // Crea e salva il nuovo prodotto
        const newProduct = new Product({
            name,
            price,
            category,
            image: req.file.path, // Percorso dell'immagine caricata su Cloudinary
            wrestler,
            user: req.user.id, // Associa il prodotto all'ID dell'utente autenticato

        });
        const savedProduct = await newProduct.save();

        res.status(201).json(savedProduct);
    } catch (err) {
        console.error("Errore nella creazione del prodotto:", err);
        res.status(500).json({ error: err.message });
    }
});

// GET all products

router.get('/user/:userId', verifyToken, async (req, res) => {
    console.log("ID dell'URL del prodotto:", req.params.id);
    console.log("ID dell'utente loggato(token):", req.user.id || req.user._id);

    const userId = req.user.id || req.user._id; // Ottieni l'ID dell'utente autenticato dal token
    const productId = req.params.userId; // Ottieni l'ID del prodotto creato dall'utente 

    if (productId !== userId.toString()) { // Controlla se il prodotto appartiene all'utente autenticato
        return res.status(403).json({ message: 'Non sei autorizzato a visualizzare questo prodotto' });
    }

    try {

        const filter = { user: userId }; // Filtra i prodotti per l'ID dell'utente autenticato
        const totalPosts = await Product.countDocuments(filter); // Contiamo quanti documenti ci sono nella collezione

        const posts = await Product.find(filter)
            .populate("wrestler") // Popoliamo il campo wrestler con i dati del wrestler associato
            .populate("user")
            .sort({ createdAt: -1 }); // Troviamo tutti i post, ordinati per data di creazione in ordine decrescente

        res.status(200).json({ posts, totalPosts }); // Inviamo i post e il totale al client

    } catch (err) {
        console.error("Errore nel recupero dei prodotti:", err);
        res.status(500).json({ error: err.message });
    }
});



//GET a product by ID

router.get('/:productId', verifyToken, async (req, res) => {

    try {
        const productId = req.params.productId; // Ottieni l'ID del prodotto dalla richiesta
        const product = await Product.findById(productId) // Trova il prodotto per ID
            .populate("wrestler")

        if (!product) {
            return res.status(404).json({ message: 'Prodotto non trovato' });
        }
        res.status(200).json(product); // Invia il prodotto trovato al client
    } catch (err) {

        console.error("Errore nel recupero del prodotto:", err);
        res.status(500).json({ error: err.message });
    }
});




//PUT a product by ID

router.put('/product/user/:id', verifyToken, upload.single("image"), async (req, res) => {
    try {
        const productId = req.params.id;
        const { name, price, category, wrestler } = req.body;

        // Trova il prodotto da aggiornare
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Prodotto non trovato' });
        }

        // Controlla che il prodotto appartenga all'utente autenticato
        if (product.user.toString() !== req.user.id) { // 'product.user' è il campo del modello Product che contiene l'ID dell'utente che ha creato il prodotto. Generalmente è riferito a un documento nella collezione degli utenti. '.toString()' converte l'ID dell'utente in una stringa per confrontarlo con l'ID dell'utente autenticato, questo è necessario perchè 'product.user' è un oggetto di tipo ObjectId e non una stringa, mentre 'req.user.id' è una stringa. 'req.user.id' è l'ID dell'utente autenticato, che viene passato dal middleware 'verifyToken'. La condizione controlla se l'ID dell'utente che ha creato il prodotto è uguale all'ID dell'utente autenticato.
            return res.status(403).json({ message: 'Non sei autorizzato ad aggiornare questo prodotto' });
        }

        // Aggiorna i campi del prodotto
        product.name = name || product.name;
        product.price = price || product.price;
        product.category = category || product.category;
        product.wrestler = wrestler || product.wrestler;

        if (req.file) { // Controlla se nella richiesta HTTP è presente un file caricato, questo file viene gestito da 'upload.single("image")', che utilizza CLoudinary per caricare l'immagine. Se è presente la proprietà req.file conterrà i dettagli del file, inclusa la posizione 'path'.
            product.image = req.file.path; // Se è presente un nuovo file, aggiorna l'immagine del prodotto con il nuovo percorso dell'immagine caricata su Cloudinary
        }

        const updatedProduct = await product.save();
        res.status(200).json(updatedProduct);
    } catch (err) {
        console.error("Errore nell'aggiornamento del prodotto:", err);
        res.status(500).json({ error: err.message });
    }
});



// DELETE a product by ID

router.delete('/product/user/:id', verifyToken, async (req, res) => {
    try {
        const productId = req.params.id;

        // Trova il prodotto da eliminare
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Prodotto non trovato' });
        }

        // Controlla che il prodotto appartenga all'utente autenticato
        if (product.user.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Non sei autorizzato a eliminare questo prodotto' });
        }

        // Elimina il prodotto
        await product.deleteOne();
        res.status(200).json({ message: 'Prodotto eliminato con successo' });
    } catch (err) {
        console.error("Errore nell'eliminazione del prodotto:", err);
        res.status(500).json({ error: err.message });
    }
});


export default router;