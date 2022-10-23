// bring in dependencies
const mysql    = require('mysql2');
const inquirer = require('inquirer');
require('console.table');

// connect to the database
const db = mysql.createConnection(
    {
        host: '127.0.0.1',
        user: 'root',
        password: 'JRbeckham16',
        database: 'employees_db',
        port: 3306,
    },
    console.log('connected to the employees_db')
);

db.connect(function (err) {
    if (err) throw err;
    // prompt the user after the connection is a great success
    initPrompt();
});

function initPrompt() {
    console.log('init prompty')
    inquirer.prompt([
        {
        type: 'list',
        name: 'userChoice',
        message: 'What would you like to accomplish?',
        choices: [
            'View all employees',
            'View Employees by department',
            'Add an employee',
            'Remove an employee',
            'Update an employee role',
            'Add a new role',
            'Add a new department',
            'Exit'
        ]
    }
    ]).then((res) => {
        console.log(res.userChoice);
    })
}