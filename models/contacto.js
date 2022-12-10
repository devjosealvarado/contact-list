const mongoose = require('mongoose');

const contactoSchema = new mongoose.Schema({
    text: String,
    telefono: String,
    checked: Boolean,
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

contactoSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject._v;
    }
});

const Contacto = mongoose.model('Contacto', contactoSchema);

module.exports = Contacto;