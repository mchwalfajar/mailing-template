const express = require('express');
const router = express.Router();
const path = require('path');
const app = express()
const db = require('../config/database');

// Redirect to dashboard if already logged in
router.get('/', (req, res) => {
    if (req.session.loggedin) {
        return res.redirect('/dashboard'); // Redirect to dashboard if session exists
    }
    res.sendFile(path.join(__dirname, '../views/login.html'));
});

// Handle login form submission
router.post('/', (req, res) => {
    const { username, password } = req.body;

    db.query('SELECT * FROM admin WHERE username = ? AND password = ?', [username, password], (err, results) => {
        if (err) {
            console.error('Error during login query:', err);
            return res.status(500).send('Internal server error');
        }

        if (results.length > 0) {
            req.session.loggedin = true;
            req.session.username = username; // Simpan username di session
            res.send('Login successful');
        } else {
            res.status(401).send('Invalid credentials');
        }
    });
});

// Logout route
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).send('Could not log out');
        }
        res.clearCookie('connect.sid'); // Clear session cookie
        res.redirect('/login'); // Redirect to login after logout
    });
});

module.exports = router;



