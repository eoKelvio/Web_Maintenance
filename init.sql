-- Cria as bases de dados
CREATE DATABASE parts_db;
CREATE DATABASE machines_db;
CREATE DATABASE maintenances_db;
CREATE DATABASE users_db;

-- Cria as tabelas nas bases de dados
\c parts_db
CREATE TABLE IF NOT EXISTS parts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  cost DECIMAL(10,2) NOT NULL,
  quantity INT NOT NULL
);

\c machines_db
CREATE TABLE IF NOT EXISTS machines (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(255),
  local VARCHAR(255),
  fabrication_date DATE,
  serial_number VARCHAR(255)
);

\c maintenances_db
CREATE TABLE IF NOT EXISTS maintenances (
  id SERIAL PRIMARY KEY,
  machine_id INT NOT NULL,
  date DATE NOT NULL,
  status VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  priority VARCHAR(255) NOT NULL,
  team_id INT NOT NULL
);

CREATE TABLE IF NOT EXISTS used_parts(
    id SERIAL PRIMARY KEY,
    maintenance_id INT NOT NULL,
    part_id INT NOT NULL,
    quantity INT NOT NULL,
    cost DECIMAL(10,2)
);

\c users_db
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    username VARCHAR(30) NOT NULL,
    password VARCHAR(30) NOT NULL,
    role VARCHAR(30) NOT NULL,   
    team_id INT NULL
);

CREATE TABLE IF NOT EXISTS teams (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    leader_id INT NOT NULL
);
