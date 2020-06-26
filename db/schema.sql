### Schema
DROP DATABASE IF EXISTS tasks_db;
CREATE DATABASE tasks_db;

USE tasks_db;




-- Create the table plans.
CREATE TABLE userInfo (
    id INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL,
    userPass VARCHAR(20) NOT NULL,
    taskID VARCHAR(20) NOT NULL,
    PRIMARY KEY (id)
);


-- not sure you need a primary key here
CREATE TABLE tasks(
    id INTEGER NOT NULL AUTO_INCREMENT,
    routeName VARCHAR(300) NOT NULL,
    taskName VARCHAR(20) NOT NULL,
    taskDescription VARCHAR(500) NOT NULL,
    taskDeadline VARCHAR (200) NOT NULL,
    PRIMARY KEY (id)
);

