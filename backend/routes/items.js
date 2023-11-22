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
module.exports = router