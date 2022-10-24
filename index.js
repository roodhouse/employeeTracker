// bring in dependencies
const mysql    = require('mysql2');
const inquirer = require('inquirer');
// const allEmployees = require('./functions');
require('console.table');

// connect to the database
const db = mysql.createConnection(
    {
        host: '127.0.0.1',
        user: 'root',
        password: '',
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
        switch(res.userChoice) {
            case 'View All Employees':
                allEmployees();
                break;
            case 'View Employees by department':
                employeesByDepartment();
                break;
            case 'Add an employee':
                addNewEmployee();
                break;
            case 'Remove an employee':
                removeEmployee();
                break;
            case 'Update an employee role':
                updateRole();
                break;
            case 'Add a new role':
                newRole();
                break;
            case 'Add a new department':
                newDepartment();
                break;
            case 'Exit':
                db.end();
                break;
        }
    }).catch((err) => {
        if(err)throw err;
    });
}

function allEmployees() {
    let query = 
    `SELECT 
        employee.id,
        employee.first_name,
        emplyoee.last_name,
        role.title,
        department.name as Department,
        role.salary,
    FROM employee
    LEFT JOIN role
        ON employee.role_id = role.id
    LEFT JOIN department
        ON department.id = role.department_id`
    // console.log('all employees here');

    db.query(query, (err, res) =>{
        if(err) throw err;
        console.table(res);
        initPrompt();
    });
}