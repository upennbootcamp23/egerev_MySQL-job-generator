--This is the file to view the names of the roles.

SELECT role.id,
	role.title,
       department.name,
       role.salary
FROM role 
INNER JOIN department ON department.id = role.department_id
WHERE role.id > 0