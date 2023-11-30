# CRUD de Produtos - Node.js, Express, MySQL, Bootstrap

Este é um projeto de exemplo de um CRUD (Create, Read, Update, Delete) de produtos utilizando Node.js, Express, MySQL para o backend e Bootstrap para o frontend.

## Requisitos

Certifique-se de ter os seguintes requisitos instalados em sua máquina:

- Node.js: [Instalar Node.js](https://nodejs.org/)
- MySQL: [Instalar MySQL](https://dev.mysql.com/downloads/)

## Configuração do Banco de Dados

1. Crie um banco de dados MySQL chamado `crud_nodejs_mysql`.

```sql
CREATE DATABASE crud_nodejs_mysql;
USE crud_nodejs_mysql;

CREATE TABLE produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    preco DECIMAL(10, 2) NOT NULL
);

```
