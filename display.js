//------------------------------------------- Requiring files for the function to work
const colors = require('colors');
//const consTable = require('console.table');
const table = require('table');         
const figlet = require ('figlet');

/**
 * The introduction  - displays "Employee Tracker"
 */
function introduction() {   
    console.log(figlet.textSync('Employee Tracker').blue);     
}



/**
 * This function does the display for the requirements
 * @param {*} results the results
 * @param {*} sMenuSelection the menu selection
 * @returns new Promise
 */
const doDisplayWork = (results, sMenuSelection) => {    
    return new Promise((resolve, reject) => {

        //initializing the variable
        const data = [];
        var row = [];
        let config = {};

        console.log(" ");

        switch(sMenuSelection) {
            //View all departments
            case  'View all departments':  
                console.log(`----------------------DEPARTMENTS----------------------`.red);  
                row = [["id"], ["Name"]];
                data.push(row);
            
                for (let i = 0; i < results.length; i++) {
                    row = [
                        [results[i].id],
                        [results[i].name]
                    ];            
                data.push(row);
                }
                config = { 
                    columns: { 0: {width: 15}, 1: {width: 15} },
                    border: table.getBorderCharacters("ramac")
                };       
                break;

                //View all roles
            case 'View all roles':
                console.log(`----------------------ROLES----------------------`.red);            
                row = [["id"], ["Title"], ["Name"], ["Salary"]];
                data.push(row);            
                for (let i = 0; i < results.length; i++) {
                    row = [
                        [results[i].id],
                        [results[i].title],
                        [results[i].name],
                        [results[i].salary]
                        
                    ];
            
                    data.push(row);
                }
                config = { 
                    columns: { 0: {width: 10}, 1: {width: 25}, 2: {width: 18}, 3: {width: 16} },
                    border: table.getBorderCharacters("ramac")
                };
                break;

            //View all employees  
            case 'View all employees':
                console.log(`-----------------------EMPLOYEES---------------------------`.red);
                row = [["id"], ["First Name "], ["Last Name"], ["Title of Role"], ["Department"], ["Salary"],["Manager"] ];
                data.push(row);
                for (let i = 0; i < results.length; i++) {
                    row = [
                        [results[i].id],
                        [results[i].first_name],
                        [results[i].last_name],
                        [results[i].title],
                        [results[i].name],
                        [results[i].salary],
                        [results[i].manager]
                    ];
                    data.push(row);
                }
                
                config = { 
                    columns: {  0: {width: 2}, 1: {width: 15}, 2: {width: 15}, 3: {width: 20}, 4: {width: 15}, 5: {width: 14}, 6: {width: 18}, },
                    border: table.getBorderCharacters("ramac")
                };
                break;

            //Add a department
            case  'Add a department':
                row = [ ["Result: Department Added with ID " + results.insertId] ];                
                data.push(row);
                config = {  columns: { 0: {width: 50} },  border: table.getBorderCharacters("ramac")
                };
                break;

            //Add a role   
            case  'Add a role':
                row = [ ["Result: Role Added with ID " + results.insertId] ];                
                data.push(row);
                config = {  columns: { 0: {width: 50} }, border: table.getBorderCharacters("ramac")
                };     
                break;

            //Add an employee
            case 'Add an employee':
                row = [ ["Result: Employee Added with ID " + results.insertId] ];                
                data.push(row);
                config = {  columns: { 0: {width: 50} }, border: table.getBorderCharacters("ramac")
                };     
                break;

                //Delete an employee
            case 'Delete an employee':
                row = [ ["Result: Employee Deleted "] ];                
                data.push(row);
                config = {  columns: { 0: {width: 50} },  border: table.getBorderCharacters("ramac")
                };     
                break;  
                
                //update a role salary
            case  'Update a role salary':
                row = [ ["Result: Salary for role updated "] ];                
                data.push(row);
                config = {  columns: { 0: {width: 50} }, border: table.getBorderCharacters("ramac")
                };                    
            break;

            //update an employee role
            case 'Update an employee role':
                row = [ ["Result: Employee role updated "] ];                
                data.push(row);
                config = {  columns: { 0: {width: 50} }, border: table.getBorderCharacters("ramac")
                };     
            break;

            default: console.log(sMenuSelection);
        }  

        //creating the table
    let x = table.table(data, config);
    console.log(x);

    //done with everything  
    resolve("done in doDisplay with " + sMenuSelection);
    });  
  };


module.exports = {doDisplayWork, introduction}