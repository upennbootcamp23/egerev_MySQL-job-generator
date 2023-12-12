--Creating the database called "job" - if the database exists, we drop it.
CREATE DATABASE IF NOT EXISTS job;
USE job;

--Creating the table called "department" (we're dropping it if it exists).
--We have 2 variables:
    --id - an INT which AUTO INCREMENTS. It holds the ID.
    --name - a STRING (VARCHAR in MySQL) with 30 characters long. It stores the name of the department.
CREATE TABLE IF NOT EXISTS department (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL
);

--Creating the table called "role" (we're dropping it if it exists).
--We have the following variables:
    --id - an INT which AUTO INCREMENTS
    --title - a STRING (VARCHAR in MySQL) with 30 characters long. That is REQUIRED. It stores the title of the role.
    --salary - a DECIMAL. It is REQUIRED. It stores the salary of the role.
    --department_id - an INT. It is REQUIRED. It stores the ID of the department. 
        --It is a FOREIGN KEY, which references the id in the Department table.
CREATE TABLE IF NOT EXISTS role (
id INT PRIMARY KEY AUTO_INCREMENT,
title VARCHAR(30) NOT NULL,
salary DECIMAL NOT NULL,
department_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department(id) 
);

--Creating the table called "employee" (we're dropping it if it exists).
--We have the following variables:
    --id - an INT which AUTO INCREMENTS
    --first_name - a STRING (VARCHAR in MySQL) with 30 characters long. That is REQUIRED. It stores the employee's first name.
    --last_name - a TRING (VARCHAR in MySQL) with 30 characters long. That is REQUIRED. It stores the employee's last name.
    --role_id - an INT. It is REQUIRED. It stores the ID of the role.
        --It is a FOREIGN KEY, which references the id in the Roles table.
    --manager_id - an INT. It stores the ID of the managers (also known as the employees). 
        
CREATE TABLE IF NOT EXISTS employee (
id INT PRIMARY KEY AUTO_INCREMENT,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT NOT NULL,
manager_id INT,
	FOREIGN KEY (role_id) REFERENCES role(id)
);

