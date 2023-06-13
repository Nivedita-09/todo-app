// Import required packages
const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

// Create an Express.js app
const app = express();
const port = 3001;

// Enable CORS
app.use(cors());

// Parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Create a MySQL connection
const connection = mysql.createConnection({
  //   host: 'localhost',
  //   user: 'your_username',
  //   password: 'your_password',
  //   database: 'your_database',
  host: "localhost",
  user: "root",
  database: "todo",
});

// Connect to MySQL
connection.connect();

// Define routes for CRUD operations

// Get all to-do items
app.get("/todos", (req, res) => {
  connection.query("SELECT * FROM todos", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Create a new to-do item
app.post("/todos", (req, res) => {
  const { title, completed } = req.body;
  connection.query(
    "INSERT INTO todos (title, completed) VALUES (?, ?)",
    [title, completed],
    (err, results) => {
      if (err) throw err;
      res.json({ id: results.insertId });
    }
  );
});

// Update a to-do item
app.put("/todos/:id", (req, res) => {
  const { title, completed } = req.body;
  const id = req.params.id;
  connection.query(
    "UPDATE todos SET title = ?, completed = ? WHERE id = ?",
    [title, completed, id],
    (err) => {
      if (err) throw err;
      res.sendStatus(200);
    }
  );
});

// Delete a to-do item
app.delete("/todos/:id", (req, res) => {
  const id = req.params.id;
  connection.query("DELETE FROM todos WHERE id = ?", [id], (err) => {
    if (err) throw err;
    res.sendStatus(200);
  });
});

// Update a to-do item
app.put("/todos/:id", (req, res) => {
  const { title, completed } = req.body;
  const id = req.params.id;
  connection.query(
    "UPDATE todos SET title = ?, completed = ? WHERE id = ?",
    [title, completed, id],
    (err) => {
      if (err) throw err;
      res.sendStatus(200);
    }
  );
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Helloe
