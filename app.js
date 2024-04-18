const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

// Middleware to log each request to a file
app.use(function(req, res, next) {
    const logMessage = `${new Date().toISOString()} - Requested path: ${req.path}\n`;
    fs.appendFile(path.join(__dirname, 'request.log'), logMessage, (err) => {
        if (err) {
            console.error('Error logging request:', err);
        }
    });
    next();
});

// Route to handle requests to the root URL
app.get('/', (req, res) => {
    const currentTime = new Date().toLocaleString();
    const greetingMessage = `Hello World! Current server time is: ${currentTime} hello from VM-1`;
    res.send(greetingMessage);
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
