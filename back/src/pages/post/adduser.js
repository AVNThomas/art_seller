const mysql = require('mysql2');
const bcrypt = require('bcrypt');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'art_seller'
});

module.exports = {
    name: 'adduser',
    run: (req, res) => {
        const { username, password, email } = req.body;
        connection.query(`SELECT * FROM user WHERE emailUSER = '${email}'`, (err, row, fields) => {
            console.log(row.length);
            if (row.length == 1) return res.send('Email already exists');
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
            connection.query(`INSERT INTO user (USERcol, passUSER, emailUSER) VALUES ("${username}", "${hash}", "${email}");`, (err, results) => {
                if (err) throw err;
                res.send(results);
            });
        });
    }
}