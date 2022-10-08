const app = require('express');
const jwt = require('jsonwebtoken');

require('dotenv').config();
const server = app();
const fs = require('fs');
const { callbackify } = require('util');

PORT = process.env.PORT || 3000;

const pages = new Map();

const files = fs.readdirSync('./src/pages');
const jsFiles = files.filter(f => f.split('.').pop() === 'js');
jsFiles.forEach(jsFile => {
    const page = require(`./src/pages/${jsFile}`);
    pages.set(page.name, page);
    console.log(`Loaded file: ${jsFile}`);
});

server.get('/', (req, res) => {
    res.send('Hello World!');
});

pages.forEach((pages) => {
    console.log('loaded page: ' + pages.name);
    server.get(`/${pages.name}`, pages.run);
});

server.listen(PORT, () => {
    console.log('Server is running on port: ' + PORT);
});