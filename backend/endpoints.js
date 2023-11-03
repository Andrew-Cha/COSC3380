const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const bodyParser = require('body-parser');
const initializeQuery = require('./initialState')
require('dotenv').config({
    path: '../frontend/.env'
})


const app = express();
app.use(cors());
app.use(bodyParser.json())

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '',
    port: 5432,
});


app.get('/api/media', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Media');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error' });
    }
});


app.get('/api/books', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Book');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error' });
    }
});

app.get('/api/devices', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Device');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error' });
    }
});

app.get('/api/customers', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM customer');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error' });
    }
});

app.post('/api/customers/login', async (req, res) => {
    const { firstName, lastName, password } = req.body
    if (firstName == "" || lastName == "" || password == "") {
        res.status(400).json({ message: "Invalid credentials" })
    }
    const query = {
        text: 'SELECT * FROM customer WHERE first_name = $1 AND last_name = $2 AND password = $3',
        values: [firstName, lastName, password]
    }

    await pool.query(query, (error, results) => {
        console.log(results)
        if (error || results.rowCount == 0) {
            console.error('Could not find user in database.')
            res.status(400).json({ message: "Invalid credentials" })
        } else {
            res.status(200).json(results.rows[0])
        }
    })
})

app.post('/api/customers/create', async (req, res) => {
    const { firstName, lastName, password } = req.body
    const query = {
        text: 'INSERT INTO customer(first_name, last_name, password) VALUES($1, $2, $3)',
        values: [firstName, lastName, password],
    };

    pool.query(query, (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'An error occurred while inserting the data.' });
        } else {
            res.status(201).json({ message: "User created successfully." })
        }
    });
})

app.get('/api/customer/:id', async (req, res) => {
    const customerId = req.params.id;
    console.log(customerId)
    try {
        const result = await pool.query('SELECT first_name, last_name, registration_date, password FROM customer WHERE id = $1', [customerId]);
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Customer not found' });
        } else {
            res.json(result.rows[0]);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error' });
    }
});

app.listen(3000, process.env.VITE_SERVER_URL, async () => {
    await pool.query(initializeQuery);
    console.log(`Server is running on http://${process.env.VITE_SERVER_URL}:3000`);
});
