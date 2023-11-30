# projeto-final
CRUD for the final project of the Web Development course.

<h2> What do you need to run the project? </h2>

- &nbsp;Install node

<h2> How to run the project? </h2>

- &nbsp;npm init -y
- &nbsp;npm install express mysql2
- &nbsp;Execute node api.js
- &nbsp;After executing the project locally, you can access http://localhost:3000 to see the project.

<h2> Create MySQL </h2>

- &nbsp;CREATE DATABASE IF NOT EXISTS crud_nodejs_mysql;

- &nbsp;USE crud_nodejs_mysql;

- &nbsp;CREATE TABLE IF NOT EXISTS produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    preco DECIMAL(10, 2) NOT NULL
);

