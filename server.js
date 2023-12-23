const express = require('express');
const cors = require('cors');

// Initialize the Express app
const fs = require('fs');
const app = express();

// Import the uuid library
const { v4: uuidv4 } = require('uuid');

// Use bodyParser to handle JSON data and cors to apply CORS policy
app.use(express.json());
app.use(cors());

const users = [];
const posts = [];
const notifications = [];

// Endpoint for login
app.post('/api/index', (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        res.json({ success: true, username: user.username, userId: user.id });
    } else {
        res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
});

// Endpoint for user registration
app.post('/api/register', async (req, res) => {
    const { username, password, email } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return res.status(400).json({ success: false, message: 'Invalid email format' });
    }

    const existingUser = users.find(u => u.username === username || u.email === email);

    if (existingUser) {
        res.status(409).json({ success: false, message: 'Username or email already exists' });
    } else {
        const userId = uuidv4(); // Generate a unique user ID
        const newUser = { username, password, email, id: userId };
        users.push(newUser);

        try {
            await fs.promises.writeFile('users.json', JSON.stringify(users, null, 2), 'utf-8');
            res.json({ success: true, message: 'Registration successful', userId });
        } catch (error) {
            console.error('Error writing to file:', error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }
});

// Endpoint for updating user profile
app.put('/api/profile/:userId', (req, res) => {
    const userId = req.params.userId;
    const { username, email } = req.body;

    // Find the user in the array based on userId
    const user = users.find(u => u.id === userId);

    if (user) {
        // Update user profile
        user.username = username || user.username;
        user.email = email || user.email;

        // Update the users.json file
        fs.promises.writeFile('users.json', JSON.stringify(users, null, 2), 'utf-8')
            .then(() => {
                res.json({ success: true, message: 'Profile updated successfully', user });
            })
            .catch(error => {
                console.error('Error writing to file:', error);
                res.status(500).json({ success: false, message: 'Internal server error' });
            });
    } else {
        res.status(404).json({ success: false, message: 'User not found' });
    }
});

// Endpoint for changing email
app.post('/api/change-email/:userId', (req, res) => {
    const userId = req.params.userId;
    const { newEmail } = req.body;

    const user = users.find(u => u.id === userId);

    if (user) {
        console.log('Updating email for user:', user.username);
        console.log('Old Email:', user.email);
        
        user.email = newEmail;

        fs.promises.writeFile('users.json', JSON.stringify(users, null, 2), 'utf-8')
            .then(() => {
                console.log('Email changed successfully');
                console.log('New Email:', newEmail);
                res.json({ success: true, message: 'Email changed successfully', user });
            })
            .catch(error => {
                console.error('Error writing to file:', error);
                res.status(500).json({ success: false, message: 'Internal server error' });
            });
    } else {
        console.log('User not found for ID:', userId);
        res.status(404).json({ success: false, message: 'User not found' });
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
