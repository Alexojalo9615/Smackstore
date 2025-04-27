const isAdmin = (req, res, next) => {

    if(req.user && req.user.role === 'admin') {
        next(); // L'utente è un admin, continua con la richiesta
    }
    else {
      return res.status(403).json({ message: 'Accesso negato: solo admin.' });
    }
}


export default isAdmin;