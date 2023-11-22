const pool = require('../database')
const express = require('express')
const router = express.Router()

router.get('/books', async (req, res) => {

})

router.get('/media', async (req, res) => {

})

router.get('/devices', async (req, res) => {

})


router.post('/payBook', async (req, res) => {

})

router.post('/payMedia', async (req, res) => {

})
router.post('/payDevice', async (req, res) => {

})


router.get('/reports/fines', async (req, res) => {
    try {
        const { period } = req.query;
        let startDate;

        if (period === 'lastDay') {
            startDate = new Date();
            startDate.setDate(startDate.getDate() - 1);
        } else if (period === 'lastWeek') {
            startDate = new Date();
            startDate.setDate(startDate.getDate() - 7);
        } else if (period === 'lastMonth') {
            startDate = new Date();
            startDate.setMonth(startDate.getMonth() - 1);
        } else if (period === 'lastYear') {
            startDate = new Date();
            startDate.setFullYear(startDate.getFullYear() - 1);
        } else {
            return res.status(400).json({ error: 'Invalid period' });
        }

        const query = `
        SELECT SUM(fine_amount) AS total_fines
        FROM fine
        WHERE fined_at >= $1;
      `;

        const result = await pool.query(query, [startDate]);

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/reports/pastLoans', async (req, res) => {
    try {
        const { period } = req.query;
        let startDate;

        if (period === 'lastDay') {
            startDate = new Date();
            startDate.setDate(startDate.getDate() - 1);
        } else if (period === 'lastWeek') {
            startDate = new Date();
            startDate.setDate(startDate.getDate() - 7);
        } else if (period === 'lastMonth') {
            startDate = new Date();
            startDate.setMonth(startDate.getMonth() - 1);
        } else if (period === 'lastYear') {
            startDate = new Date();
            startDate.setFullYear(startDate.getFullYear() - 1);
        } else {
            return res.status(400).json({ error: 'Invalid period' });
        }

        const query = `
      SELECT
        c.first_name || ' ' || c.last_name AS customer_name,
        'book' AS item_type,
        b.title AS item_name,
        b2c.returned_at AS date
      FROM
        book_to_customer b2c
      JOIN
        customer c ON b2c.customer_id = c.id
      JOIN
        book b ON b2c.book_id = b.id
      WHERE
        b2c.returned_at >= $1
      UNION
      SELECT
        c.first_name || ' ' || c.last_name AS customer_name,
        'media' AS item_type,
        m.title AS item_name,
        m2c.returned_at AS date
      FROM
        media_to_customer m2c
      JOIN
        customer c ON m2c.customer_id = c.id
      JOIN
        media m ON m2c.media_id = m.id
      WHERE
        m2c.returned_at >= $1
      UNION
      SELECT
        c.first_name || ' ' || c.last_name AS customer_name,
        'device' AS item_type,
        d.device_name AS item_name,
        d2c.returned_at AS date
      FROM
        device_to_customer d2c
      JOIN
        customer c ON d2c.customer_id = c.id
      JOIN
        device d ON d2c.device_id = d.id
      WHERE
        d2c.returned_at >= $1;
    `;

        const result = await pool.query(query, [startDate]);

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router