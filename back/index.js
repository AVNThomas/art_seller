const app = require('express');

require('dotenv').config();
const server = app();
const fs = require('fs');
const mysql = require('mysql2');
const cors = require('cors');

PORT = process.env.PORT || 3000;

const bodyParser = require('body-parser');
server.use(bodyParser.json());
server.use(cors());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'art_seller'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});

const getpages = new Map();
const postpages = new Map();

const getfiles = fs.readdirSync('./src/pages/get');
const getjsFiles = getfiles.filter(f => f.split('.').pop() === 'js');
getjsFiles.forEach(jsFile => {
    const page = require(`./src/pages/get/${jsFile}`);
    getpages.set(page.name, page);
    console.log(`Loaded get file: ${jsFile}`);
});

const postfiles = fs.readdirSync('./src/pages/post');
const postjsFiles = postfiles.filter(f => f.split('.').pop() === 'js');
postjsFiles.forEach(jsFile => {
    const page = require(`./src/pages/post/${jsFile}`);
    postpages.set(page.name, page);
    console.log(`Loaded post file: ${jsFile}`);
});

server.get('/', (req, res) => {
    console.log('GET /');
    res.send('Hello World!');
});

getpages.forEach((pages) => {
    console.log(`routed get page: ${pages.name}`);
    server.get(`/${pages.name}`, pages.run);
});

postpages.forEach((pages) => {
    console.log(`routed post page: ${pages.name}`);
    server.post(`/${pages.name}`, pages.run);
});

server.listen(PORT, () => {
    console.log('Server is running on port: ' + PORT);
});