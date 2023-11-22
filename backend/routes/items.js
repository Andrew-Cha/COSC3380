const pool = require('../database')
const express = require('express')
const router = express.Router()

router.get('/media', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Media');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error' });
    }
});


router.get('/books', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Book');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error' });
    }
});

router.get('/devices', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Device');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error' });
    }
});

router.post('/loanBook', async (req, res) => {

})

router.post('/loanMedia', async (req, res) => {

})

router.post('/loanDevice', async (req, res) => {

})


router.post('/holdBook', async (req, res) => {

})

router.post('/holdMedia', async (req, res) => {

})

router.post('/holdDevice', async (req, res) => {

})

router.post('/returnBook', async (req, res) => {

})

router.post('/returnMedia', async (req, res) => {

})

router.post('/returnDevice', async (req, res) => {

})

router.post('/extendBook', async (req, res) => {

})

router.post('/extendMedia', async (req, res) => {

})

router.post('/extendDevice', async (req, res) => {

})

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