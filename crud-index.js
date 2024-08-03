const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

// Create an Express application
const app = express();
app.use(bodyParser.json());

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',  
  password: 'root', 
  database: 'cars'
});

// Connect to MySQL
connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
    return;
  }
  console.log('Connected to MySQL');
});

// Create (Insert)


app.post('/cardetails', (req, res) => {
    const { name, mfy, price } = req.body;
  
    if (!name || !mfy || !price) {
      return res.status(400).json({ error: 'Name, mfy, and price are required fields.' });
    }
  
    const query = 'INSERT INTO cardetails (name, mfy, price) VALUES (?, ?, ?)';
    connection.query(query, [name, mfy, price], (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send({ id: results.insertId });
      }
    });
  });

// Read (Get all)
app.get('/cardetails', (req, res) => {
  const query = 'SELECT * FROM cardetails';
  connection.query(query, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(results);
    }
  });
});

// Read (Get by ID)
app.get('/cardetails/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM cardetails WHERE id = ?';
  connection.query(query, [id], (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else if (results.length > 0) {
      res.status(200).json(results[0]);
    } else {
      res.status(404).send('Record not found');
    }
  });
});

// Update
app.put('/cardetails/:id', (req, res) => {
  const { id } = req.params;
  const { name, mfy, price } = req.body;
  const query = 'UPDATE cardetails SET name = ?, mfy = ?, price = ? WHERE id = ?';
  connection.query(query, [name, mfy, price, id], (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else if (results.affectedRows > 0) {
      res.status(200).send('Record updated successfully');
    } else {
      res.status(404).send('Record not found');
    }
  });
});

// Delete
app.delete('/cardetails/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM cardetails WHERE id = ?';
  connection.query(query, [id], (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else if (results.affectedRows > 0) {
      res.status(200).send('Record deleted successfully');
    } else {
      res.status(404).send('Record not found');
    }
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
