DROP DATABASE IF EXISTS employees_db;

CREATE DATABASE employees_db;
USE employees_db;

CREATE TABLE department
(
  id INT PRIMARY KEY AUTO_INCREMENT,
  department_name VARCHAR(30)
);

CREATE TABLE roles
(id INT PRIMARY KEY AUTO_INCREMENT,
title VARCHAR(30),
salary DECIMAL(10,2),
department_id INT
);

CREATE TABLE employee
(id INT PRIMARY KEY AUTO_INCREMENT,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT,
manager_id INT
);