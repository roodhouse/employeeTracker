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
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update employee role',
            'Exit'
        ]
    }
    ]).then((res) => {
        console.log(res.userChoice);
        switch(res.userChoice) {
            case 'View all departments':
                viewDepartments();
                break;
            case 'View all roles':
                viewRoles();
                break;
            case 'View all employees':
                viewEmployees();
                break;
            case 'Add a department':
                addDepartment();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Add an employee':
                addEmployee();
                break;
            case 'Update employee role':
                updateEmployee();
                break;
            case 'Exit':
                db.end();
                break;
        }
    }).catch((err) => {
        if(err)throw err;
    });
}

// viewDepartments
function viewDepartments() {
    let query = `SELECT * FROM department`;

    db.query(query, (err, res) =>{
        if(err) throw err;
        console.table(res);
        initPrompt();
    });
}

// view roles
function viewRoles() {
    let query = `SELECT * FROM role`;

    db.query(query, (err, res) =>{
        if(err) throw err;
        console.table(res);
        initPrompt();
    });
}

// view employees
function viewEmployees() {
    let query = `SELECT * FROM employee`;

    db.query(query, (err, res) =>{
        if(err) throw err;
        console.table(res);
        initPrompt();
    });
}

// add department
function addDepartment() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "Department Name: "
             }
        ]).then((res) => {
            let query = 'INSERT INTO department SET ?';
            db.query(query, {name: res.name}, (err, res) => {
                if(err) throw err;
                initPrompt();
            });
        });
}