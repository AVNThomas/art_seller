const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'art_seller'
});

module.exports = {
    name: 'login',
    run: (req, res) => {
        console.log(req.body);
        const { email, password } = req.body;
        connection.query(`SELECT * FROM user WHERE emailUSER = '${email}'`, (err, row, fields) => {
            if (row.length == 0) return res.send('Email not found');
            const hash = row[0].passUSER;
            const match = bcrypt.compareSync(password, hash);
            if (match) {
                res.json({
                        token: jsonwebtoken.sign({ user: email, }, process.env.JWT_SECRET, { expiresIn: '1h' })
                    });
            } else {
                res
                    .status(401)
                    .send('Incorrect password');
            }
        });
    }
}