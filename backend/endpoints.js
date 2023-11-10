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
        if (error || results.rowCount == 0) {
            console.error('Could not find user in database.')
            res.status(400).json({ message: "Invalid credentials" })
        } else {
            res.status(200).json(results.rows[0])
        }
    })
})

app.post('/api/customers/create', async (req, res) => {
    const { firstName, lastName, password, roleId } = req.body

    const existing_user_query = {
        text: 'SELECT * FROM customer WHERE first_name = $1 AND last_name = $2',
        values: [firstName, lastName, password]
    }
    let alreadyExists = false
    await pool.query(existing_user_query, (error, results) => {
        if (error || results.rowCount > 0) {
            res.status(400).json({ message: "This name already exists." })
            alreadyExists = true
        }
    })

    if (alreadyExists) return;

    const query = {
        text: 'INSERT INTO customer(first_name, last_name, password, registration_date, role_id) VALUES($1, $2, $3, current_timestamp, $4)',
        values: [firstName, lastName, password, roleId],
    };
    await pool.query(query, (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'An error occurred while inserting the data.' });
        } else {
            res.status(201).json({ message: "User created successfully." })
        }
    });
})

app.get('/api/fineToBook', async (req, res) => {
    try {
        const result = await pool.query(`SELECT 
        c.first_name AS customer_name,
        f.fine_amount,
        b.title AS title
    FROM
        fine_to_book AS f, customer AS c, book AS d
    JOIN
        customer ON f.customer_id = c.id
    JOIN
        fine ON f.fine_id = f.id
    JOIN
        book ON f.book_id = b.id;`);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error' });
    }
});
app.get('/api/fineToMedia', async (req, res) => {
    try {
        const result = await pool.query(`SELECT 
        c.first_name AS customer_name,
        f.fine_amount,
        m.title AS media_name
    FROM
        fine_to_media AS ftm, customer AS c, media AS m, fine as F
    JOIN
        fine AS f ON f.fine_id = f.id
    JOIN
        customer ON f.customer_id = c.id
    JOIN
        media AS m ON f.media_id = m.id;
    `);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error' });
    }
});
app.get('/api/fineToDevice', async (req, res) => {
    try {
        const result = await pool.query(`SELECT 
        c.first_name AS customer_name,
        f.fine_amount,
        d.device_name AS device_name
    FROM
        fine_to_device AS f, customer AS c, device AS d
    JOIN
        customer ON f.customer_id = c.id
    JOIN
        fine ON f.fine_id = f.id
    JOIN
        device ON f.device_id = d.id;`);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error' });
    }
});
app.post('/api/fine', async (req, res) => {
    const { id } = req.body;
    try {
        await pool.query('UPDATE fine SET fine_amount = 0 WHERE id = $1', [id]);
        res.json({ message: "Pay successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error' });
    }
});

app.listen(3000, process.env.VITE_SERVER_URL, async () => {
    await pool.query(initializeQuery);
    console.log(`Server is running on http://${process.env.VITE_SERVER_URL}:3000`);
});
