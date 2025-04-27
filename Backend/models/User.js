import {model, Schema} from 'mongoose';


const userSchema = new Schema({

    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    password: { // Da hashare per sicurezza
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },

}, {timestamps: true}); // Permette di salvare nel database la data di creazione e di modifica di un elemento


const User = model('User', userSchema); // Mongoose deve creare la collection su Mongo, prende il nome della risorsa e lo fa diventare plurale, minuscolo

export default User