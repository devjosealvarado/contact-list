const logoutRouter = require('express').Router();

logoutRouter.get('/', async (request, response) => {
    const cookies = request.cookies;

    if (!cookies.accessToken) return response.sendStatus(401);

    response.clearCookie('accessToken', {
        secure: process.env.NODE_ENV == 'production',
        httpOnly: true
    });

    response.sendStatus(201);
})

module.exports = logoutRouter;