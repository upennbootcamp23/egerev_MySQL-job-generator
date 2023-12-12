--This is the file to view the names of the employees, including the managers.
SELECT employee.id, 
	employee.first_name, 
       employee.last_name, 
       role.title, 
       department.name, 
       role.salary, 
(SELECT CONCAT(employee.first_name, " ", employee.last_name) FROM employee WHERE id = employee.manager_id LIMIT 1) AS manager
FROM employee
INNER JOIN role ON role.id = employee.role_id
INNER JOIN department ON department.id = role.department_id
WHERE  employee.id > 0;
