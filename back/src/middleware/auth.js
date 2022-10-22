const { query } = require('express');
const jsonwebtoken = require('jsonwebtoken');
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'art_seller'
});

module.exports = {
    name: 'auth',
    function(headers) {
        const { token } = headers;
        if (!token) {
            return false;
        }
        const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
        console.log(decoded.user);
        connection.query(`SELECT * FROM user WHERE emailUSER = '${decoded.user}'`, (err, row, fields) => {
            if (row.length == 0) return false;
            return true;
        });
    }
}