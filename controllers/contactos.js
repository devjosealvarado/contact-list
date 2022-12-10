const contactosRouter = require('express').Router();
const User = require('../models/user');
const Contactos = require('../models/contacto');
    
contactosRouter.post('/', async (request, response) => {
    const { user } = request;

    if (!user) {
        return response.sendStatus(401);
    }

    const { text } = request.body;
    const { telefono } = request.body;
    // console.log(telefono);

    const newContacto = new Contactos({
        text,
        telefono,
        checked: false,
        user: user._id,
    });

    // console.log(request);

    const savedContacto = await newContacto.save();

    response.status(201).json(savedContacto);
});

contactosRouter.get('/', async (request, response) => {
    // COMPRUEBA QUE EL USUARIO INICIO SESION
    const { user } = request;

    if (!user) {
        return response.sendStatus(401);
    }

    const contactos = await Contactos.find({user: user._id});

    response.status(200).json(contactos);

});

contactosRouter.delete('/:id', async (request, response) => {
    // ELIMINA TAREAS
    const { user } = request;

    if (!user) {
        return response.sendStatus(401);
    }

    await Contactos.findByIdAndDelete(request.params.id);
    console.log(request.params);
    response.sendStatus(204);

});

contactosRouter.patch('/:id', async (request, response) => {
    // EDITA EL CHECK
    const { user } = request;

    if (!user) {
        return response.sendStatus(401);
    }
    const { text } = request.body;
    const { telefono } = request.body;
    await Contactos.findByIdAndUpdate(request.params.id, {text, telefono});
    response.sendStatus(200);
});

module.exports = contactosRouter;