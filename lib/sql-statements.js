//------------------------------------------------------including files required for the project to work
const connection = require('../activation/connect.js');
const mysql = require('mysql2');
const design = require('../display.js');

/**
 * This function connects to the database
 */
function connectToDB () {
    connection.connect((error) => {
        if (error) {
            throw error;
        }        
    });
}

//----------------------------------------wait - function for testing right sequence
/**
 * This function is for testing the sequence of operations
 * @param {*} ms the time to wait in milliseconds
 */
function wait(ms) {
  var start = new Date().getTime();
  var addedStart = start + ms;
  var end = start;
  while(end < addedStart) {
      end = new Date().getTime();
  }
}



/**
 * This function does everything needed in/at the database
 * @param {*} arrOfData the array of data that the user inputted
 * @param {*} sMenuSelection the menu selection
 * @returns nothing
 */
const doDBWork = (arrOfData, sMenuSelection) => {    
  return new Promise((resolve, reject) => {
    let stmt = ``;  
    let values = [];

    switch(sMenuSelection) {
      //View all departments
      case  'View all departments':  
        stmt = `SELECT * from department`;                     
        break;

        //View all roles
      case 'View all roles':
        stmt = `SELECT role.id,
                role.title,
                department.name,
                role.salary
            FROM role 
            INNER JOIN department ON department.id = role.department_id
            WHERE role.id > 0`;
        break;

        //View all employees
      case 'View all employees':
        stmt = `SELECT E.id, 
        E.first_name, 
        E.last_name, 
        department.name, 
        role.title, 
        role.salary, 
        E.manager_id AS manager_id,
        (SELECT CONCAT(employee.first_name, " ", employee.last_name) FROM employee WHERE id = E.manager_id LIMIT 1) AS manager
        FROM employee E
        JOIN role ON role.id = E.role_id
        JOIN department ON department.id = role.department_id
        WHERE  E.id > 0`;
        break;

        //Add a department
      case  'Add a department':
        stmt = `INSERT INTO 
                department(name)
                VALUES(?)`;
        values = [arrOfData[0].add_department];                                             
        break;

        //Add a role
      case  'Add a role':
        stmt = `INSERT INTO role (title, salary, department_id)
                VALUES(?,?, (SELECT id FROM department WHERE name = (?) LIMIT 1) )`;   
        values = [arrOfData[0].add_role_title, arrOfData[1].add_role_salary, arrOfData[2].add_role_department];    
        break;

        //Add an employee
      case 'Add an employee':    
        stmt = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                VALUES(?,?,(SELECT id FROM role WHERE title = (?) LIMIT 1),?)`;      
        values = [arrOfData[0].add_first_name, arrOfData[1].add_last_name, arrOfData[2].add_role, arrOfData[4].id];  
        break;

        
      case 'Get manager id by name': 
        var arrName = arrOfData[3].add_manager.split(" ");         

        stmt = `SELECT id FROM employee WHERE first_name = (?) AND last_name = (?) LIMIT 1`;        
        values = [arrName[0], arrName[1]]; 
        break;

      case 'Get an employee id by name': 
         var arrName = arrOfData[0].select_employee.split(" "); 
      
         stmt = `SELECT id FROM employee WHERE first_name = (?) AND last_name = (?) LIMIT 1`;        
         values = [arrName[0], arrName[1]]; 
      break;

      //Delete an employee
      case 'Delete an employee':
        stmt = `DELETE FROM employee WHERE id = (?)`;        
        values = [arrOfData[0].employee_id]; 
        break;

        //Update a role salary
      case  'Update a role salary':
        stmt = `UPDATE role SET salary = (?) WHERE id = (?)`;        
        values = [arrOfData[1].add_role_salary, arrOfData[0].role_id]; 
        break;

        //Update an employee role
      case 'Update an employee role':
        stmt = `UPDATE employee SET role_id = (SELECT id FROM role WHERE title = (?)) WHERE id = (?)`;        
        values = [arrOfData[1].new_role_for_employee, arrOfData[2].id]; 
        break;
        
      default: console.log(sMenuSelection);
    }  

    //Puts everything inside the query
    connection.query(stmt, values, (err, results, fields) => {
      if (err) {      
        console.log("Error executing SQL statemnt");
        reject(err.message);
      }                  
      resolve(results);  //done with everything, return to calling function   
    });
  });
};

//--------------------------------------- exports
module.exports = {connectToDB, doDBWork};