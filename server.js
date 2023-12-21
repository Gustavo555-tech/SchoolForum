const express = require('express');
const cors = require('cors');

// Initialize the Express app
const fs = require('fs');
const app = express();

// Use bodyParser to handle JSON data and cors to apply CORS policy
app.use(express.json());
app.use(cors());

const users = [];
const posts = [];
const notifications = [];

// Endpoint for login
app.post('/api/index', (req, res) => {
    const { username, password } = req.body;

    // Find the user in the array based on username and password
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        // Successful login
        res.json({ success: true, username: user.username });
    } else {
        // Failed login
        res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
});


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

        // Write the updated users array to the users.json file
        fs.writeFile('users.json', JSON.stringify(users, null, 2), 'utf-8');

        // Send a success response
        res.json({ success: true, message: 'Registration successful', userId: newUser.id });

    }
});

// Define a POST endpoint '/api/posts' to add new messages to the 'posts' array
app.post('/api/posts', (req, res) => {
    // Retrieve the message from the request
    const message = req.body.message;

    // Add the message to the 'posts' array along with the current timestamp
    const timestamp = new Date().toISOString(); // Use toISOString for a standardized timestamp
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

// Set the port to 5500 and start the server
const port = 5500;
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
