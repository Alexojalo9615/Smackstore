import jwt from 'jsonwebtoken';


const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization; // Ottiene l'header di autorizzazione

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token mancante o malformato' });
    }

    const token = authHeader.split(' ')[1]; // Estrae il token dall'header

    try{
    
       const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifica il token con la chiave segreta
       console.log("ID utente dal token:", decoded.id); // Stampa l'ID utente decodificato
       
       req.user = decoded; // Aggiunge l'oggetto utente decodificato alla richiesta
       next(); 
    }
    catch (err) {
        console.error("Token non valido:", err);
        return res.status(403).json({ message: 'Token non valido' });
    }   
}

export default verifyToken; 