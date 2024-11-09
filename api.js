const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');
const { env } = require('process');
require('dotenv').config()


const app = express();
const port = 3000;

// Configuração do banco de dados
const db = mysql.createConnection({
  host:  env.DB_HOST,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE
});

// Conectar ao banco de dados
db.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.message);
  } else {
    console.log('Conectado ao banco de dados MySQL');
  }
});

// Configuração do Express
app.use(bodyParser.json());

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rota padrão
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rotas CRUD
app.get('/api/produtos', (req, res) => {
  // Buscar todos os produtos
  db.query('SELECT * FROM produtos', (err, results) => {
    if (err) {
      console.error('Erro ao buscar produtos:', err.message);
      res.status(500).send('Erro interno do servidor');
    } else {
      res.json(results);
    }
  });
});

app.post('/api/produtos', (req, res) => {
  // Adicionar um novo produto
  const { nome, preco } = req.body;
  db.query('INSERT INTO produtos (nome, preco) VALUES (?, ?)', [nome, preco], (err, result) => {
    if (err) {
      console.error('Erro ao adicionar produto:', err.message);
      res.status(500).send('Erro interno do servidor');
    } else {
      res.json({ id: result.insertId, nome, preco });
    }
  });
});

app.delete('/api/produtos/:id', (req, res) => {
  // Deleva um produto
  const id = req.params.id;
  db.query('DELETE FROM produtos where (id = ?)', [id], (err, result) => {
    if (err) {
      console.error('Erro ao deletar produto:', err.message);
      res.status(500).send('Erro interno do servidor');
    } else {
      res.status(200).json({message:'Produto deletado'});
    }
  });
});

app.get('/api/produtos/:id', (req, res) => {
   // Buscar os detalhes de um produto específico
   const id = req.params.id;
   db.query('SELECT * FROM produtos WHERE id = ?', [id], (err, results) => {
       if (err) {
           console.error('Erro ao buscar detalhes do produto:', err.message);
           res.status(500).send('Erro interno do servidor');
       } else {
           // Verificar se o produto foi encontrado
           if (results.length === 0) {
               res.status(404).json({ message: 'Produto não encontrado' });
           } else {
               res.json(results[0]);
           }
       }
   });
});

app.put('/api/produtos/:id', (req, res) => {
   // Atualizar um produto específico
   const id = req.params.id;
   const { nome, preco } = req.body;

   db.query('UPDATE produtos SET nome = ?, preco = ? WHERE id = ?', [nome, preco, id], (err, result) => {
       if (err) {
           console.error('Erro ao atualizar produto:', err.message);
           res.status(500).send('Erro interno do servidor');
       } else {
           res.status(200).json({ message: 'Produto atualizado com sucesso' });
       }
   });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor iniciado na porta localhost:${port}`);
});
