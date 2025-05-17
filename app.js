const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const SESSION_SECRET = process.env.SESSION_SECRET || 'voting-app-secret';

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// In-memory data store
const users = {}; // { pinCode: { voted: boolean } }
const votes = {
    'Google Meet': 0,
    'Zoom': 0
};

// Generate 15 valid codes with 2 letters and 2 digits
// Avoiding P, O, 0, B, 6, Q, I, 1, D
function generateValidCodes() {
    const allowedLetters = 'ACEFGHJKLMNRSTUVWXYZ'.split('');
    const allowedDigits = '2345789'.split('');
    const validCodes = [];

    // Helper to generate a random code
    function generateCode() {
        // Shuffle the letters and digits
        let letters = [...allowedLetters].sort(() => 0.5 - Math.random()).slice(0, 2);
        let digits = [...allowedDigits].sort(() => 0.5 - Math.random()).slice(0, 2);

        // Randomize positions (mix letters and digits)
        const parts = [...letters, ...digits];
        parts.sort(() => 0.5 - Math.random());

        return parts.join('');
    }

    // Generate 15 unique codes
    while (validCodes.length < 15) {
        const code = generateCode();
        if (!validCodes.includes(code)) {
            validCodes.push(code);
        }
    }

    return validCodes;
}

// Generate the valid PIN codes
const validCodes = generateValidCodes();
console.log('Generated valid PIN codes:', validCodes);

// Store the hashed versions for security
const validPinHashes = validCodes.map(code => hashPin(code));

// Hash a PIN for security
function hashPin(pin) {
    return crypto.createHash('sha256').update(pin).digest('hex');
}

// Routes
app.get('/', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
    const { pin } = req.body;

    if (!pin || pin.length !== 4) {
        return res.render('login', { error: 'Please enter a valid 4-character PIN' });
    }

    // Hash the PIN and check if it's valid
    const pinHash = hashPin(pin);
    if (!validPinHashes.includes(pinHash)) {
        return res.render('login', { error: 'Invalid PIN. Please try again.' });
    }

    if (!users[pinHash]) {
        users[pinHash] = { voted: false };
    }

    req.session.user = pinHash;
    res.redirect('/vote');
});

app.get('/vote', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/');
    }

    const userPinHash = req.session.user;

    if (users[userPinHash].voted) {
        return res.redirect('/results');
    }

    res.render('vote');
});

app.post('/submit-vote', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/');
    }

    const userPinHash = req.session.user;

    if (users[userPinHash].voted) {
        return res.redirect('/results');
    }

    const { option } = req.body;

    if (option === 'Google Meet' || option === 'Zoom') {
        votes[option]++;
        users[userPinHash].voted = true;
    }

    res.redirect('/results');
});

app.get('/results', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/');
    }

    res.render('results', { votes });
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

// Export the list of valid codes for admin reference
// In production, this would need proper authentication
if (NODE_ENV === 'development') {
    app.get('/admin-codes', (req, res) => {
        res.json({ validCodes });
    });
}

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('Generated valid PIN codes:', validCodes.join(', '));
}); 