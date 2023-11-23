const pool = require('../database')
const express = require('express')
const router = express.Router()

// All devices
router.get('/media', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM media WHERE media.id NOT IN (select media_id from media_to_customer where returned_at is NULL) AND media.id NOT IN (select media_id from hold_to_media WHERE held_until > current_timestamp)');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error' });
    }
});


router.get('/books', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM book WHERE book.id NOT IN (select book_id from book_to_customer where returned_at is NULL) AND book.id NOT IN (select book_id from hold_to_book WHERE held_until > current_timestamp)')
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error' });
    }
});

router.get('/devices', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM device WHERE device.id NOT IN (select device_id from device_to_customer where returned_at is NULL) AND device.id NOT IN (select device_id FROM hold_to_device WHERE held_until > current_timestamp)');
        res.status(200).json(result.rows);
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
    const { userId, mediaId } = req.body
    const query = {
        text: 'INSERT INTO media_to_customer(customer_id, media_id, loaned_at, loaned_until, returned_at) VALUES($1, $2, current_timestamp, current_timestamp + interval \'30 seconds\', NULL)',
        values: [userId, mediaId],
    };
    await pool.query(query, (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'An error occurred while inserting the data.' });
        } else {
            res.status(201).json({ message: "Media loaned successfully." })
        }
    });
})

router.post('/loanDevice', async (req, res) => {
    const { userId, deviceId } = req.body
    const query = {
        text: 'INSERT INTO device_to_customer(customer_id, device_id, loaned_at, loaned_until, returned_at) VALUES($1, $2, current_timestamp, current_timestamp + interval \'30 seconds\', NULL)',
        values: [userId, deviceId],
    };
    await pool.query(query, (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'An error occurred while inserting the data.' });
        } else {
            res.status(201).json({ message: "Device loaned successfully." })
        }
    });
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
            res.status(201).json({ message: "Media held successfully." })
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
            res.status(201).json({ message: "Device held successfully." })
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

// User's loans
router.get('/loanedBooks/:id', async (req, res) => {
    const query = {
        text: 'SELECT * FROM book JOIN book_to_customer ON book_to_customer.book_id=book.id WHERE book_to_customer.customer_id = $1',
        values: [req.params.id],
    };
    await pool.query(query, (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'An error occurred while retrieving the data.' });
        } else {
            res.status(201).json(results.rows)
        }
    });
})

router.get('/loanedDevices/:id', async (req, res) => {
    const query = {
        text: 'SELECT * FROM device JOIN device_to_customer ON device_to_customer.device_id=device.id WHERE device_to_customer.customer_id = $1',
        values: [req.params.id],
    };
    await pool.query(query, (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'An error occurred while retrieving the data.' });
        } else {
            res.status(201).json(results.rows)
        }
    });
})

router.get('/loanedMedia/:id', async (req, res) => {
    const query = {
        text: 'SELECT * FROM media JOIN media_to_customer ON media_to_customer.media_id=media.id WHERE media_to_customer.customer_id = $1',
        values: [req.params.id],
    };
    await pool.query(query, (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'An error occurred while retrieving the data.' });
        } else {
            res.status(201).json(results.rows)
        }
    });
})

// User's holds
router.get('/heldBooks/:id', async (req, res) => {
    const query = {
        text: 'SELECT * FROM book JOIN hold_to_book ON hold_to_book.book_id=book.id WHERE hold_to_book.customer_id = $1',
        values: [req.params.id],
    };
    await pool.query(query, (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'An error occurred while retrieving the data.' });
        } else {
            res.status(201).json(results.rows)
        }
    });
})

router.get('/heldDevices/:id', async (req, res) => {
    const query = {
        text: 'SELECT * FROM device JOIN hold_to_device ON hold_to_device.device_id=device.id WHERE hold_to_device.customer_id = $1',
        values: [req.params.id],
    };
    await pool.query(query, (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'An error occurred while retrieving the data.' });
        } else {
            res.status(201).json(results.rows)
        }
    });
})

router.get('/heldMedia/:id', async (req, res) => {
    const query = {
        text: 'SELECT * FROM media JOIN hold_to_media ON hold_to_media.media_id=media.id WHERE hold_to_media.customer_id = $1',
        values: [req.params.id],
    };
    await pool.query(query, (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'An error occurred while retrieving the data.' });
        } else {
            res.status(201).json(results.rows)
        }
    });
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