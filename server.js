// Initialize the Express app
const app = express();

// Use bodyParser to handle JSON data and cors to apply CORS policy
app.use(bodyParser.json());
app.use(cors());

const users = [];
const posts = [];
const notifications = [];

// Endpoint for user registration
app.post('/api/register', (req, res) => {
    const { username, password, email } = req.body;

    // Check for a valid email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ success: false, message: 'Invalid email format' });
    }

    // Check if the email already exists
    const existingUser = users.find(u => u.username === username || u.email === email);

    if (existingUser) {
        // Username or email already exists, send an error response
        res.status(409).json({ success: false, message: 'Username or email already exists' });
    } else {
        // Add the new user to the array
        const newUser = { username, password, email, id: users.length + 1 };
        users.push(newUser);

        // Send a success response
        res.json({ success: true, message: 'Registration successful', userId: newUser.id });
    }
});

// Define a POST endpoint '/api/posts' to add new messages to the 'posts' array
app.post('/api/posts', (req, res) => {
    // Retrieve the message from the request
    const message = req.body.message;

    // Add the message to the 'posts' array along with the current timestamp
    const timestamp = new Date().toLocaleString(); // Generate current timestamp in short format
    posts.push({ message, timestamp });

    // Send a JSON response to indicate success
    res.json({ success: true });
});

// Define a GET endpoint '/api/posts' to retrieve all messages and return them as JSON
app.get('/api/posts', (req, res) => {
    // Send back the 'posts' array as JSON
    res.json(posts);
});

// Define a GET endpoint '/api/notifications' to retrieve all notifications and return them as JSON
app.get('/api/notifications', (req, res) => {
    // Send back the 'notifications' array as JSON
    res.json(notifications);
});

// This part will not run in the browser
if (typeof window === 'undefined') {
    const fs = require('fs');
    const express = require('express');
    const bodyParser = require('body-parser');
    const cors = require('cors');

    // Initialize the Express app and set the port
    const app = express();
    const port = 5500;

    // Start the server on the specified port and log a message to the console
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
}
