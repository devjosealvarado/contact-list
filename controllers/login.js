const loginRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


loginRouter.post('/', async (request, response) => {
    const {email, password} = request.body;
    const userExist = await User.findOne({email});
    
    const passwordValidation = await bcrypt.compare(password, userExist.passwordHash);
    if (!userExist) {
        return response.status(400).json({error: 'El email o contraseña son invalidos'});
    } 
    
    if (!passwordValidation) {
        return response.status(400).json({error: 'El email o contraseña son invalidos'})
    }

    const userForToken = {
        id: userExist._id,
        email: userExist.email
    }

    const accessToken = jwt.sign(userForToken, process.env.ACCESS_TOKEN, {expiresIn: '1d'});

    response.cookie('accessToken', accessToken, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
        secure: false,
        httpOnly: true
    })

    response.status(200).json(userExist._id);
});

module.exports = loginRouter;