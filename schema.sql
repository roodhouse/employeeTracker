DROP DATABASE IF EXISTS employees_db;
-- creating the database 
CREATE DATABASE employees_db;

-- using the database
USE employees_db;

CREATE TABLE department (
    id INT PRIMARY KEY,
    name VARCHAR(30)
);
