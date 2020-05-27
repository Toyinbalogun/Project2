### Schema
DROP DATABASE IF EXISTS tasks_db;
CREATE DATABASE tasks_db;
USE task_db;

-- Create the table plans.
CREATE TABLE userInfo (
    id INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL,
    userPass VARCHAR(20) NOT NULL,
    taskID VARCHAR(20) NOT NULL,
    PRIMARY KEY (id)
);


CREATE TABLE tasks(
    
);

