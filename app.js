const express = require('express');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const db = require('./config/database');   
const app = express();
const PORT = process.env.PORT || 3005;

// Middleware and configurations
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: process.env.SESSION_SECRET || 'secretKey', // Load from env for security
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' } // Secure cookie in production
}));

// Prevent browser caching
app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');
    next();
});

// Middleware to check authentication
const checkAuth = (req, res, next) => {
    req.session.loggedin ? next() : res.redirect('/login');
};

// Routes
app.use('/login', authRoutes);

app.get('/dashboard', checkAuth, (req, res) => {
    res.render('home', { username: req.session.username });
});

app.get('/cc/sun', checkAuth, (req, res) => {
    res.render('sunOutageCS', { username: req.session.username });
});

app.get('/cc/maintenance', checkAuth, (req, res) => {
    res.render('maintenanceCS', { username: req.session.username });
});

app.get('/no/sun', checkAuth, (req, res) => {
    res.render('sunOutageNO', { username: req.session.username });
});

// Start server
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
