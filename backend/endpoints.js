const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config({
    path: '../frontend/.env'
})
const initializeQuery = require('./initialState')

const app = express();
app.use(cors());

const pool = new Pool({
    user: 'andrew',
    host: 'localhost',
    database: 'postgres',
    password: '',
    port: 5432,
});

app.get('/api/users', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM customer');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error' });
    }
});

app.listen(3000, process.env.VITE_SERVER_URL, async () => {
    await pool.query(initializeQuery)
    console.log(`Server is running on http://${process.env.VITE_SERVER_URL}:3000`);
});