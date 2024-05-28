const express = require("express");
const path = require("path")
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const port = 5000;

app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '7irelo@gmail.net',
    database: 'lorettabank'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL Connected...');
});

function verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];

    if (!token) {
        return res.status(403).send('No token provided');
    }

    jwt.verify(token, 'your_secret_key', (err, decoded) => {
        if (err) {
            return res.status(500).send('Failed to authenticate token');
        }

        req.userId = decoded.id;
        next();
    });
}


// app.use(express.static("./public"))
/*
app.get("/", (req, res) =>
{
    res.status(200).sendFile(path.resolve(__dirname, "./index.html"))
});
*/
app.use(express.static("./public"))
app.get("/", (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, "./public/index.html"))
    // res.json([{name: "Messi", number: 10}, {name: "Ronaldo", number: 7}])
});

// View balance
app.get('/balance', verifyToken, (req, res) => {
    const query = 'SELECT balance FROM users WHERE id = ?';
    db.execute(query, [req.userId], (err, results) => {
        if (err) {
            return res.status(500).send('Server error');
        }
        res.status(200).send({ balance: results[0].balance });
    });
});

// Deposit money
app.post('/deposit', verifyToken, (req, res) => {
    const { amount } = req.body;

    const updateBalance = 'UPDATE users SET balance = balance + ? WHERE id = ?';
    const addTransaction = 'INSERT INTO transactions (user_id, amount, type) VALUES (?, ?, "credit")';

    db.execute(updateBalance, [amount, req.userId], (err) => {
        if (err) {
            return res.status(500).send('Server error');
        }

        db.execute(addTransaction, [req.userId, amount], (err) => {
            if (err) {
                return res.status(500).send('Server error');
            }
            res.status(200).send('Deposit successful');
        });
    });
});

// Withdraw money
app.post('/withdraw', verifyToken, (req, res) => {
    const { amount } = req.body;

    const updateBalance = 'UPDATE users SET balance = balance - ? WHERE id = ? AND balance >= ?';
    const addTransaction = 'INSERT INTO transactions (user_id, amount, type) VALUES (?, ?, "debit")';

    db.execute(updateBalance, [amount, req.userId, amount], (err, results) => {
        if (err || results.affectedRows === 0) {
            return res.status(400).send('Insufficient funds');
        }

        db.execute(addTransaction, [req.userId, amount], (err) => {
            if (err) {
                return res.status(500).send('Server error');
            }
            res.status(200).send('Withdrawal successful');
        });
    });
});


// Register a new user
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);

    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.execute(query, [username, hashedPassword], (err, results) => {
        if (err) {
            return res.status(500).send('Server error');
        }
        res.status(201).send('User registered');
    });
});


// Login a user
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const query = 'SELECT * FROM users WHERE username = ?';
    db.execute(query, [username], (err, results) => {
        if (err || results.length === 0) {
            return res.status(400).send('User not found');
        }

        const user = results[0];
        const passwordIsValid = bcrypt.compareSync(password, user.password);

        if (!passwordIsValid) {
            return res.status(401).send('Invalid password');
        }

        const token = jwt.sign({ id: user.id }, 'your_secret_key', {
            expiresIn: 86400 // 24 hours
        });

        res.status(200).send({ auth: true, token });
    });
});

app.all("*", (req, res) => {
    res.status(404).send("<h1>Error Page</h1>");
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});