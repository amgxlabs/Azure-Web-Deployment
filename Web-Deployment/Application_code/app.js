const express = require('express');
const mysql = require('mysql2/promise'); // Using promises for async/await
const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies

// --- DATABASE CONNECTION CONFIGURATION ---

const dbConfig = {
    host: '[10.0.3.4]',    // Private IP of the DB-VM01
    user: 'project_user',
    password: 'YOUR_PASSWORD', // The password you set for user
    database: 'project_db'
};

// --- API ENDPOINTS ---

// Endpoint to add a new item

app.post('/items', async (req, res) => {
    const { message } = req.body; // Expecting a JSON body like {"message": "Some text"}

    if (!message) {
        return res.status(400).send({ error: 'Message content is required in the request body' });
    }

    let connection;
    try {
        connection = await mysql.createConnection(dbConfig);
        // Ensure the 'messages' table exists in your 'project_db'
        const [result] = await connection.execute('INSERT INTO messages (content) VALUES (?)', [message]);
        console.log(`Inserted item with ID: ${result.insertId}`);
        res.status(201).send({ id: result.insertId, message: message });
    } catch (err) {
        console.error('Error adding item to database:', err);
        res.status(500).send({ error: 'Failed to add item to database. Check API server logs.' });
    } finally {
        if (connection) await connection.end();
    }
});

// Endpoint to get all items

app.get('/items', async (req, res) => {
    let connection;
    try {
        connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute('SELECT id, content, created_at FROM messages ORDER BY id DESC');
        res.send(rows);
    } catch (err)
        console.error('Error fetching items from database:', err);
        res.status(500).send({ error: 'Failed to fetch items from database. Check API server logs.' });
    } finally {
        if (connection) await connection.end();
    }
});

// --- START THE SERVER ---

const PORT = 5000; // Your chosen AppPort (make sure this matches your NSG rules)
app.listen(PORT, '0.0.0.0', () => {           // Listen on all available network interfaces
    console.log(`API server listening on port ${PORT}`);
});
