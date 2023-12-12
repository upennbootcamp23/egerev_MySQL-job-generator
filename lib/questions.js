//Requred files for everything to work
const departments = require('../lib/departments.js');
const roles = require('../lib/roles.js');
const employees = require('../lib/employees.js');

//Questions to prompt the user to make a selection
const questions = [
    {   name: `option_selection`,
        message: `Select an option:`,
        type: `list`,
        choices: [
            
            'View all departments',
            'Add a department',
            'View all roles',
            'Add a role',
            'View all employees',
            'Add an employee',
            'Delete an employee',
            'Update a role salary',            
            'Update an employee role',    
            'Exit'            
        ]
    },
    
    //Question to add department
    {   name: `add_department`,
        message: `Department Name to add: `,
        type: `input`
    },

    //------------ add role
        //Question to add the role name
    {   name: `add_role_title`,
        message: `Add a role name: `,
        type: `input`
    },

        //Question to add the salary for the role
    {   name: `add_role_salary`,
        message: `Salary for the role: `,
        type: `input`
    },

    //Question to add the department for the role
    {   name: `add_role_department`,
        message: `Select the department for the role: `,
        type: `list`,
        choices: departments
    },

    //------------------------------------add_employee
        //Question to add the employee's first name
    {
        name: `add_first_name`,
        message: `Add the employee's first name`,
        type: `input`
    },

        //Question to add the employee's last name
    {
        name: `add_last_name`,
        message: `Add the employee's last name`,
        type: `input`
    },

        //Question to add the employee's role
    {
        name: `add_role`,
        message: `Add the employee's role`,
        type: `list`,
        choices: roles
    },

        //Question to add the employee's manager
    {
        name: `add_manager`,
        message: `Add the employee's manager`,
        type: `list`,
        choices: employees
    },

    //----------------------delete_employee
        //Question to delete the employee
    {
        name: `employee_id`,
        message: `Type Employee ID to delete`,
        type: `input`
    },

    //---------------------------------------update_employee_role
        //Question to select the role to update
    {
        name: `role_id`,
        message: `Type ID of the Role to update`,
        type: `input`
    },

        //Question to update the employee's role
    {
        name: `new_role_for_employee`,
        message: `Select new role for employee`,
        type: `list`,
        choices: roles
    },

        //Question to select the employee (to be the manager)
    {
        name: `select_employee`,
        message: `Select the employee`,
        type: `list`,
        choices: employees
    }
];

//------------------------------- exports
module.exports = (questions);