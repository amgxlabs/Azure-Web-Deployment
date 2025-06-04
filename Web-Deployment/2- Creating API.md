1) **Connect to `App-VM01`:**

Use Azure Bastion to SSH into `AppVM01` with your username and SSH private key.

![App VM Bastion Connection](./screenshots/Phase-2.2-API/1-appvm-bastion.png)

---

2) **Install Node.js and npm (Node Package Manager):**
 
 Update package lists using the following command:

```
sudo apt update
```


Install Node.js and nmp(Node Package manager):

```
sudo apt install nodejs npm -y
```

![Install Node.js and npm](./screenshots/Phase-2.2-API/2-install-nodejs-npm.png)

Verify the installation by checking their versions:

```
node -v
npm -v
```

![Check Node.js and npm Version](./screenshots/Phase-2.2-API/3-node-npm-check-version.png)

You should see version numbers printed for both.

---

3) **Set Up Your Project Directory & Initialize:** 

Create a directory for your API project: 

```
mkdir my_api_project
cd my_api_project
```

Initialize a new Node.js project (this creates a package.json file to manage dependencies): 

```
npm init -y
```

![Initialize npm Project (npm init)](./screenshots/Phase-2.2-API/4-npm-init.png)

The -y flag accepts all the defaults, which is fine for this project.

---

4) **Install Necessary npm Packages:**

**Express.js:** A popular web framework for Node.js. 
**mysql2:** A good MySQL client library for Node.js that supports promises (which makes async code cleaner). 

```
npm install express mysql2
```

![Install Express and MySQL Packages](./screenshots/Phase-2.2-API/5-install-express-mysql.png)

---

5) **Create Your API Code File (e.g., app.js):**

Create a new file, app.js, using a command-line text editor like nano or vim: 

```
nano app.js
```

Paste the following example code into app.js. Read through it to understand what it's doing. 

```
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
```

![Code Snippet](./screenshots/Phase-2.2-API/6-code-snippet.png)

**VERY IMPORTANT:** You **MUST** replace the values in dbConfig with your actual DB-VM01 private IP, the project_user credentials you created.
And, change the Port number of Node.js file of App-VM01, in case you had it changed.
For me, the Port number is 5000.

Save the file and exit nano (Ctrl+X, then Y, then Enter).

---

6) **Ensure messages Table Exists in MySQL on DBVM01:** 

Now, we have to create a table name messages inside the database.
SSH into DBVM01 via Bastion. 

![DB VM Bastion Connection](./screenshots/Phase-2.2-API/7-dbvm-bastion.png)

Login into MySql as root:

```
sudo mysql -u root -p
```

Select the database you had created:

```
USE project_db;
```

Then create the message table with the following Sql commands:

```
CREATE TABLE IF NOT EXISTS messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

![Database Commands](./screenshots/Phase-2.2-API/8-db-commands.png)

If you want to verify the creation of table, use the following commands:

```
SHOW TABLES;
DESCRIBE messages;
```

![Describe Table Command Output](./screenshots/Phase-2.2-API/9-describe-table.png)

And in the end, just exit:

```
EXIT;
```

---

7) **Run & Test Your API Locally on AppVM01:**

Go back to your SSH session on AppVM01, inside your my_api_project directory. 
Start your API application: 

```
node app.js
```

![Node Application Listening Confirmation](./screenshots/Phase-2.2-API/10-node-app-listening.png)

You should see "API server listening on port 5000" (or your chosen port). 
Open a second SSH session to App-VM01 via Bastion. (You'll need two terminal windows/tabs connected to App-VM01 for this testing). In this second terminal, use curl to test your API endpoints by adding a item:

```
curl -X POST -H "Content-Type: application/json" -d '{"message":"First message from API!"}' http://localhost:5000/items
```

You should get a response with the new item.
Now, Test GET (retrieve items): 

```
curl http://localhost:5000/items
```

![POST Requests Example](./screenshots/Phase-2.2-API/11-post-requests.png)

Check the terminal where node app.js is running; you should see your console.log messages. You should see a JSON array containing the message you just posted.

![Inserted Items with ID](./screenshots/Phase-2.2-API/12-inserted-items-with-id.png)

---

8) **Make Your API Run Persistently (using PM2):**

node app.js will stop when you close your SSH session. pm2 is a process manager that will keep it running and restart it if it crashes. Stop your node app.js process (Ctrl+C in its terminal). Install PM2 globally: 

```
sudo npm install pm2 -g
```

Start your API with PM2(--name my-api gives your process a recognizable name in PM2): 

```
pm2 start app.js --name my-api
```

![Install PM2](./screenshots/Phase-2.2-API/13-install-pm2.png)

Check PM2 status: 

```
pm2 list
```

![PM2 List Output](./screenshots/Phase-2.2-API/14-pm2-list.png)

You should see my-api with a status of "online". 
To view logs for your API run by PM2: 

```
pm2 logs my-api
```

Set PM2 to auto-start on server reboot: 

```
pm2 startup
```

This command will output another command you need to run (usually with sudo). Copy and run that command. 

![PM2 Logs Output](./screenshots/Phase-2.2-API/15-pm2-logs.png)

Save the current PM2 process list so it resurrects on reboot: 

```
pm2 save
```

---
