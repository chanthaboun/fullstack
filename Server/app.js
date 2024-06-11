const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const mysql = require('mysql2')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const secret = "developer2024"

const saltRounds = 10;
const app = express();
app.use(cors());
const port = 5000;
app.use(bodyParser.json());



// Create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'mydb',
});

// Registration endpoint
app.post('/register', jsonParser, (req, res) => {

    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {

        connection.execute(
            'INSERT INTO users(email, password, fname, lname) VALUES (?, ?, ?, ?)',
            [req.body.email, hash, req.body.fname, req.body.lname],

            function (err, results, fields) {
                if (err) {
                    res.json({ status: 'error', msg: err })
                    return
                }
                res.json({ status: 'Successfully!' })
            })
    });
});




app.post("/login", (req, res) => {
    connection.execute(
        'SELECT * FROM users WHERE email=?',
        [req.body.email],
        function (err, users, fields) {
            if (err) {
                res.json({ status: 'error', msg: err })
                return
            }
            if (users.length == 0) {
                res.json({ status: 'error', msg: 'no user found' })
                return
            };
            bcrypt.compare(req.body.password, users[0].password, (err, isLogin) => {
                if (isLogin) {
                    const token = jwt.sign({ email: users[0].email }, secret, { expiresIn: '1h' });
                    res.json({ status: 'ok', msg: 'login successfully!', token })
                } else {
                    res.json({ status: 'error', msg: 'login failed' })
                }
            });
        })
})



app.post("/authen", jsonParser, (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        var decoded = jwt.verify(token, secret);
        res.json({ status: 'ok', decoded })
        res.json({ decoded })
    } catch (error) {
        res.json({ status: 'error', msg: error.msg })
    }
})




app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});











