import express, { Router } from 'express';
import mysql from 'mysql';

const router = Router();
const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ts_crud'
});

// Middleware para parse do corpo das requisições JSON
router.use(express.json());

// Rota de índice
router.get('/', (req, res) => {
  res.send('Welcome to the API');
});

// Rota GET para inserir dados no banco de dados
// http://localhost:3000/insere?name=Renato&description=programador
router.get('/insere', (req, res) => {
  const { name, description } = req.query;
  
  if (!name || !description) {
    return res.status(400).send('Name and description are required');
  }
  
  connection.query('INSERT INTO items (name, description) VALUES (?, ?)', [name, description], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(result);
    }
  });
});

// Rota para inserir um item via query string
router.get('/insere', (req, res) => {
  const { name, description } = req.query;

  if (!name || !description) {
    return res.status(400).send('Name and description are required');
  }

  connection.query('INSERT INTO items (name, description) VALUES (?, ?)', [name, description], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(result);
    }
  });
});

// Rota para listar todos os itens
router.get('/items', (req, res) => {
  connection.query('SELECT * FROM items', (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(results);
    }
  });
});

// Rota para listar um item específico por ID
router.get('/leitura/:id', (req, res) => {
  const { id } = req.params; // Captura o parâmetro de rota 'id'

  // Converte o id para um número
  const parsedId = parseInt(id, 10);

  // Verifica se o id é um número válido
  if (isNaN(parsedId)) {
    return res.status(400).send('ID deve ser um número válido');
  }

  // Consulta o banco de dados
  connection.query('SELECT * FROM items WHERE id = ?', [parsedId], (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else if (results.length === 0) {
      res.status(404).send('Item não encontrado');
    } else {
      res.status(200).json(results[0]);
    }
  });
});

// Rota para atualizar o nome de um item
router.get('/atualizar', (req, res) => {
  const { id, name } = req.query;

  // Verifica se os parâmetros necessários foram fornecidos
  if (!id || !name) {
    return res.status(400).send('ID e nome são obrigatórios');
  }

  // Converte o id para um número
  const parsedId = parseInt(id as string, 10);

  // Verifica se o id é um número válido
  if (isNaN(parsedId)) {
    return res.status(400).send('ID deve ser um número válido');
  }

  // Atualiza o nome no banco de dados
  connection.query('UPDATE items SET name = ? WHERE id = ?', [name, parsedId], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else if (result.affectedRows === 0) {
      res.status(404).send('Item não encontrado para atualizar');
    } else {
      res.status(200).send('Item atualizado com sucesso');
    }
  });
});

// Rota GET para excluir um item por ID
router.get('/excluir', (req, res) => {
  const { id } = req.query; // Captura o parâmetro 'id' da query string

  // Verifica se o parâmetro id foi fornecido
  if (!id) {
    return res.status(400).send('ID é obrigatório');
  }

  // Converte o id para um número
  const parsedId = parseInt(id as string, 10);

  // Verifica se o id é um número válido
  if (isNaN(parsedId)) {
    return res.status(400).send('ID deve ser um número válido');
  }

  // Remove o item do banco de dados
  connection.query('DELETE FROM items WHERE id = ?', [parsedId], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else if (result.affectedRows === 0) {
      res.status(404).send('Item não encontrado para exclusão');
    } else {
      res.status(200).send('Item excluído com sucesso');
    }
  });
});

export default router;
