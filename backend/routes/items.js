const pool = require('../database')
const express = require('express')
const router = express.Router()

// All devices
router.get('/media', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Media');
        const items = result.rows.map(obj => ({ ...obj, is_available: true }))
        res.status(200).json(items);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error' });
    }
});


router.get('/books', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Book');
        const items = result.rows.map(obj => ({ ...obj, is_available: true }))
        res.status(200).json(items);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error' });
    }
});

router.get('/devices', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Device');
        const items = result.rows.map(obj => ({ ...obj, is_available: true }))
        res.status(200).json(items);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error' });
    }
});

// Loan
router.post('/loanBook', async (req, res) => {
    const { userId, bookId } = req.body
    const query = {
        text: 'INSERT INTO book_to_customer(customer_id, book_id, loaned_at, loaned_until, returned_at) VALUES($1, $2, current_timestamp, current_timestamp + interval \'30 seconds\', NULL)',
        values: [userId, bookId],
    };
    await pool.query(query, (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'An error occurred while inserting the data.' });
        } else {
            res.status(201).json({ message: "Book loaned successfully." })
        }
    });
})

router.post('/loanMedia', async (req, res) => {
    res.status(200).json({ message: "OK " })
})

router.post('/loanDevice', async (req, res) => {
    res.status(200).json({ message: "OK " })
})

// Hold
router.post('/holdBook', async (req, res) => {
    const { userId, bookId } = req.body
    const query = {
        text: 'INSERT INTO hold_to_book(customer_id, book_id, held_at, held_until) VALUES($1, $2, current_timestamp, current_timestamp + interval \'30 seconds\')',
        values: [userId, bookId],
    };
    await pool.query(query, (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'An error occurred while inserting the data.' });
        } else {
            res.status(201).json({ message: "Book held successfully." })
        }
    });
})

router.post('/holdMedia', async (req, res) => {
    const { userId, mediaId } = req.body
    const query = {
        text: 'INSERT INTO hold_to_media(customer_id, media_id, held_at, held_until) VALUES($1, $2, current_timestamp, current_timestamp + interval \'30 seconds\')',
        values: [userId, mediaId],
    };
    await pool.query(query, (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'An error occurred while inserting the data.' });
        } else {
            res.status(201).json({ message: "Book held successfully." })
        }
    });
})

router.post('/holdDevice', async (req, res) => {
    const { userId, deviceId } = req.body
    const query = {
        text: 'INSERT INTO hold_to_device(customer_id, device_id, held_at, held_until) VALUES($1, $2, current_timestamp, current_timestamp + interval \'30 seconds\')',
        values: [userId, deviceId],
    };
    await pool.query(query, (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'An error occurred while inserting the data.' });
        } else {
            res.status(201).json({ message: "Book held successfully." })
        }
    });
})

// Return
router.post('/returnBook', async (req, res) => {
    res.status(200).json({ message: "OK " })
})

router.post('/returnMedia', async (req, res) => {
    res.status(200).json({ message: "OK " })
})

router.post('/returnDevice', async (req, res) => {
    res.status(200).json({ message: "OK " })
})

// Extend
router.post('/extendBook', async (req, res) => {
    res.status(200).json({ message: "OK " })
})

router.post('/extendMedia', async (req, res) => {
    res.status(200).json({ message: "OK " })
})

router.post('/extendDevice', async (req, res) => {
    res.status(200).json({ message: "OK " })
})

router.get('/loanedBooks', async (req, res) => {
    res.status(200).json({ message: "OK " })
})

router.get('/loanedDevices', async (req, res) => {
    res.status(200).json({ message: "OK " })
})

router.get('/loanedMedia', async (req, res) => {
    res.status(200).json({ message: "OK " })
})

router.get('/heldBooks', async (req, res) => {
    res.status(200).json({ message: "OK " })
})

router.get('/heldDevices', async (req, res) => {
    res.status(200).json({ message: "OK " })
})

router.get('/heldMedia', async (req, res) => {
    res.status(200).json({ message: "OK " })
})

// Create
router.post('/createBook', async (req, res) => {
    const { condition_book, isbn, book_title, year_book, edition, genre } = req.body;

    const query = {
        text: 'INSERT INTO Book(condition_book, isbn, title, year_book, edition, genre) VALUES($1, $2, $3, $4, $5, $6)',
        values: [condition_book, isbn, book_title, year_book, edition, genre],
    };

    await pool.query(query, (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'An error occurred while inserting the data.' });
        } else {
            res.status(201).json({ message: "Book added successfully." })
        }
    });
})

router.post('/createMedia', async (req, res) => {
    const { media_title, file_link, file_type, author, file_size } = req.body;

    const query = {
        text: 'INSERT INTO media(title, file_link, file_type, author, upload_day, file_size) VALUES($1, $2, $3, $4, current_date, $5)',
        values: [media_title, file_link, file_type, author, file_size],
    };

    await pool.query(query, (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'An error occurred while inserting the data.' });
        } else {
            res.status(201).json({ message: "Media added successfully." })
        }
    });
})

router.post('/createDevice', async (req, res) => {
    const { device_type, device_name, manufacturer, year_publish, serial_number, operating_system, maintenance_history } = req.body;

    const query = {
        text: 'INSERT INTO device(device_type, device_name, manufacturer, year_publish, serial_number, operating_system, maintenance_history) VALUES($1, $2, $3, $4, $5, $6, $7)',
        values: [device_type, device_name, manufacturer, year_publish, serial_number, operating_system, maintenance_history],
    };

    await pool.query(query, (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'An error occurred while inserting the data.' });
        } else {
            res.status(201).json({ message: "Device added successfully." })
        }
    });
})
module.exports = router