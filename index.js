//---------------------------------------------------requiring the files necessary for the app to work
const inquirer = require('inquirer');
const questions = require('./lib/questions.js');
const sqlwork = require('./lib/sql-statements.js');
const design = require('./display.js');
const connection = require('./activation/connect.js');

const departments = require('./lib/departments.js');
const roles = require('./lib/roles.js');
const employees = require('./lib/employees.js');

/**
 * This function displays the introduction, connects to the database, and shows the main menu
 * If the user hits exit, then the database connection is taken offline and the program ends
 * @param {*} sAction the user's choice
 */
function init (sAction) {
   //Start vs. Exit
    if(sAction == "Start") {        
        design.introduction();
        sqlwork.connectToDB();

    } else if(sAction == "Exit") {
        connection.end();
        console.log("Exiting Program...");
        console.log(" ");
        process.exit(0);
    }
   
    var arrOtherQuestions = [];

//displaying the main menu
    console.log(" ");
    console.log("--------------------MAIN MENU--------------------- ");
   
    //prompt the user to select an option
    inquirer.prompt(questions.find(x => x.name === `option_selection`))
        .then(function (answer) {   
            
            var sMenuSelection = answer.option_selection; 

            //based on Main menu selection, build an array of other questions to ask
            switch(sMenuSelection) {
                case  'Exit':   
                        init(sMenuSelection);                                  
                        break;
                case  'Add a department':
                        arrOtherQuestions = [`add_department`];                                                
                        break;
                case  'Add a role':
                        arrOtherQuestions = [`add_role_title`,`add_role_salary`, `add_role_department`];
                        break;
                case 'Add an employee':
                        arrOtherQuestions = [`add_first_name`, `add_last_name`, `add_role`, `add_manager`];
                        break;                        
                case 'Delete an employee':
                        arrOtherQuestions = [`employee_id`]; 
                        break;
                case 'Update a role salary':
                        arrOtherQuestions = [`role_id`, `add_role_salary`]; 
                        break;                     
                case 'Update an employee role':
                        arrOtherQuestions = [`select_employee`, `new_role_for_employee`]; 
                        break;
                default: console.log(answer);
                }   

            //---------------------------------callOtherQuestions
            if (sMenuSelection != "Exit") {
                var iLenArrOtherQuestions = arrOtherQuestions.length;
                if (iLenArrOtherQuestions > 0) {                
                    refreshListsAskQuestions(arrOtherQuestions, sMenuSelection);      
                } 
                else {
                    asyncWorkDbAndDisplay(arrOtherQuestions, sMenuSelection);
                }
            }
        })
        .catch((err) => { console.log(err);
        });
}

/**
 * This function is like a loop that shows the main menu after asking questions
 * @param {*} arrOtherQuestions Questions asked
 * @param {*} sMenuSelection Menu selection
 */
function refreshListsAskQuestions(arrOtherQuestions, sMenuSelection) {
    (async () => {
        await asyncWorkDb(sMenuSelection);
        callOtherQuestions(arrOtherQuestions, sMenuSelection);
    })();
}

/**
 * Calling the questions
 * @param {*} arrOtherQuestions @param {*} arrOtherQuestions Questions asked
 * @param {*} sMenuSelection Menu selection
 */
function callOtherQuestions(arrOtherQuestions, sMenuSelection) {
    var arrAnswers = [];
    var iArrLen = arrOtherQuestions.length;
    var iGotAnswers = 0;
    var sOption = arrOtherQuestions[0];

    (async () => {
        for (const sPrompt of arrOtherQuestions) {
            const answer = await inquirer.prompt(questions.find(x => x.name === sPrompt))
            .then(function (answer) {   

            arrAnswers.push(answer);
            iGotAnswers += 1;

            // check if got all answers:
            if (iGotAnswers == iArrLen) {                
                //call function to update SQL and display result    
                asyncWorkDbAndDisplay(arrAnswers, sMenuSelection);                
            }
        });   
            
        } 
    })();

}

/**
 * This function adds necessary updates to the program
 * @param {*} sMenuSelection the menu selection
 */
let asyncWorkDb = async (sMenuSelection) => {
    let resulDB;

    switch(sMenuSelection) {
        //add a role
        case 'Add a role':
            departments.splice(0, departments.length);
            resulDB = await sqlwork.doDBWork([], 'View all departments')
            for (let i = 0; i < resulDB.length; i++) {
                departments.push(resulDB[i].name);
            }
            break;

            //add an employee AND update employee role
        case 'Add an employee':
        case 'Update an employee role':
            roles.splice(0, roles.length);
            resulDB = await sqlwork.doDBWork([], 'View all roles')
            for (let i = 0; i < resulDB.length; i++) {
                roles.push(resulDB[i].title);
            }
            employees.splice(0, employees.length);
            resulDB = await sqlwork.doDBWork([], 'View all employees')
            for (let i = 0; i < resulDB.length; i++) {
                    var sFullName = resulDB[i].first_name + " " + resulDB[i].last_name
                    employees.push(sFullName);
            }
            employees.push("No Manager");

            
            break;
    }
};

/**
 * Works with db and displays the values
 * @param {*} arrOfData the array of values presented by the user
 * @param {*} sMenuSelection the menu selection
 */
let asyncWorkDbAndDisplay = async (arrOfData, sMenuSelection) => {
    let resulDB;

    //get needed employee ID by name
    if (sMenuSelection == 'Add an employee') {
        let resultSelect = await sqlwork.doDBWork(arrOfData, 'Get manager id by name');
        if (resultSelect[0] === undefined) {
            var id_zero = {id:0};
            resultSelect = [];
            resultSelect.push(id_zero);
        }
        arrOfData.push(resultSelect[0]);
    } 

        //get needed employee ID by name
    if (sMenuSelection == 'Update an employee role') {
        let resultSelect = await sqlwork.doDBWork(arrOfData, 'Get an employee id by name');
        if (resultSelect[0] === undefined) {
            var id_zero = {id:0};
            resultSelect = [];
            resultSelect.push(id_zero);
        }
        arrOfData.push(resultSelect[0]);
    } 

    //select or update work
    resulDB = await sqlwork.doDBWork(arrOfData, sMenuSelection);

    //display work
    let resultDisplay = await design.doDisplayWork(resulDB, sMenuSelection);

    //start over with main menu
    init(sMenuSelection);
};

//--------------------------------------------------------init
init("Start");