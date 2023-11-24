const pool = require('../database')
const express = require('express')
const router = express.Router()

router.post('/books', async (req, res) => {
  try {
    const { userId } = req.body
    const query = {
      text: 'SELECT f.id, f.fine_amount, book.title, f.fined_at, t.transaction_amount FROM fine f JOIN customer c ON f.customer_id = c.id LEFT JOIN fine_to_book ftb ON f.id = ftb.fine_id LEFT JOIN transaction t ON f.id = t.fine_id JOIN book ON ftb.book_id = book.id WHERE c.id = $1;',
      values: [userId]
    }

    const { rows } = await pool.query(query, [userId]);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching fines for books:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/media', async (req, res) => {
  try {
    const { userId } = req.body
    const query = {
      text: 'SELECT f.id, f.fine_amount, media.title, f.fined_at, t.transaction_amount FROM fine f JOIN customer c ON f.customer_id = c.id LEFT JOIN fine_to_media ftm ON f.id = ftm.fine_id LEFT JOIN transaction t ON f.id = t.fine_id JOIN media ON ftm.media_id = media.id WHERE c.id = $1;',
      values: [userId]
    }

    const { rows } = await pool.query(query);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching fines for media:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/devices', async (req, res) => {
  try {
    const { userId } = req.body
    const query = {
      text: 'SELECT f.id, f.fine_amount, device.device_name, f.fined_at, t.transaction_amount FROM fine f JOIN customer c ON f.customer_id = c.id LEFT JOIN fine_to_device ftd ON f.id = ftd.fine_id LEFT JOIN transaction t ON f.id = t.fine_id JOIN device ON ftd.device_id = device.id WHERE c.id = $1',
      values: [userId]
    }

    const { rows } = await pool.query(query)
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching fines for devices:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.post('/payBook', async (req, res) => {
  try {
    const { id, cardNumber } = req.body;
    const fineAmount = await getFineAmount(id, 'book');

    const query = {
      text: 'INSERT INTO transaction (fine_id, transaction_amount, card_number) VALUES ($1, $2, $3)',
      values: [id, fineAmount, cardNumber],
    };

    await pool.query(query);

    res.status(200).json({ message: 'Payment successful' });
  } catch (error) {
    console.error('Error paying fine for book:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/payMedia', async (req, res) => {
  try {
    const { id, cardNumber } = req.body;
    const fineAmount = await getFineAmount(id, 'media');

    const query = {
      text: 'INSERT INTO transaction (fine_id, transaction_amount, card_number) VALUES ($1, $2, $3)',
      values: [id, fineAmount, cardNumber],
    };

    await pool.query(query);

    res.status(200).json({ message: 'Payment successful', });
  } catch (error) {
    console.error('Error paying fine for media:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/payDevice', async (req, res) => {
  try {
    const { id, cardNumber } = req.body;
    const fineAmount = await getFineAmount(id, 'device');

    const query = {
      text: 'INSERT INTO transaction (fine_id, transaction_amount, card_number) VALUES ($1, $2, $3)',
      values: [id, fineAmount, cardNumber],
    };

    await pool.query(query);

    res.status(200).json({ message: 'Payment successful', });
  } catch (error) {
    console.error('Error paying fine for device:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

async function getFineAmount(id) {
  const fineQuery = {
    text: 'SELECT fine_amount FROM fine WHERE id = $1',
    values: [id],
  };

  const { rows } = await pool.query(fineQuery);

  if (rows.length === 0) {
    throw new Error(`Fine not found for ID ${id}`);
  }

  return rows[0].fine_amount;
}

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