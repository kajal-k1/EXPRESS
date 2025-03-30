
const express = require('express');
const mysql = require('mysql2');
const path = require('path');

const app = express();
const PORT =3002
;

app.use(express.json())
// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234@kajal', 
  database: 'test_db'
});

db.connect();

// Middleware
app.use(express.urlencoded({ extended: true }));

// Serve HTML form
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public','index.html'));
});

// Handle form submission
app.post('/submit', (req, res) => {
  const { firstName, lastName, phoneNumber, email } = req.body;
  const sql = 'INSERT INTO users (first_name, last_name, phone_number, email) VALUES (?, ?, ?, ?)';
  db.query(sql, [firstName, lastName, phoneNumber, email]);
  res.send('Data submitted successfully!');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

