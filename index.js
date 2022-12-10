const app = require('./app');
const http = require('http');

const server = http.createServer(app);

server.listen(5500, () => {
    console.log('El servidor esta corriendo');
});