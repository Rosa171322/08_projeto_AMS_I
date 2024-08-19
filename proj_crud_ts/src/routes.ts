import { Router } from 'express';
import mysql from 'mysql';
const router = Router();
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ts_crud'
});
connection.connect();

// Rota de índice
router.get('/', (req, res) => {
    res.send('Welcome to the API');
  });

// Example route for creating an item
router.post('/item', (req, res) => {
  const { name, description } = req.body;
  connection.query('INSERT INTO items (name, description) VALUES (?, ?)', [name, description], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(result);
    }
  });
});

router.get('/insere', (req, res) => {
    const { name, description } = req.query;
    
    if (!name || !description) {
      return res.status(400).send('Name and description are required');
    }
    
    connection.query('INSERT INTO db_items (name, description) VALUES (?, ?)', [name, description], (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send(result);
      }
    });
  });
  
// More CRUD routes...
export default router;