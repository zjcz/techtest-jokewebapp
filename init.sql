
-- Create the database
CREATE DATABASE IF NOT EXISTS jokeDemo
    DEFAULT CHARACTER SET = 'utf8mb4';

-- Switch to the new database
USE jokeDemo;

-- Create a new table to store the joke data
CREATE TABLE IF NOT EXISTS jokes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(255) NOT NULL,
    setup VARCHAR(255),
    punchline VARCHAR(255)
);