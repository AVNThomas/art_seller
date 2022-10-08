const app = require('express');


require('dotenv').config();
const server = app();

PORT = process.env.PORT || 3000;

server.get('/', (req, res) => {
    res.send('Hello World');
});

server.listen(PORT, () => {
    console.log('Server is running on port: ' + PORT);
});