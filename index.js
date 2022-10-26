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

// add role
function addRole() {
    let query =
    `SELECT
        department.id,
        department.name,
        role.salary
    FROM employee
    JOIN role
        ON employee.role_id = role.id
    JOIN department
        ON department.id = role.department_id`

    db.query(query, (err, res) => {
        if(err)throw err;
        const department = res.map(({ id, name })=> ({
            value: id,
            name: `${id} ${name}`
        }));
        console.table(res);
        addRoleTo(department);
    });
}

function addRoleTo(department) {
    inquirer
        .prompt([
            {
                type: "input",
                name: "title",
                message: "Role title: "
             },
             {
                type: "input",
                name: "salary",
                message: "Salary for role: "
             },
             {
                type: "list",
                name: "department",
                message: "Department: ",
                choices: department
             }
        ]).then((res) => {
            let query = 'INSERT INTO role SET ?';
            db.query(query, {
                title: res.title,
                salary: res.salary,
                department_id: res.department
            }, (err, res) => {
                if(err) throw err;
                initPrompt();
            });
        });
}

// add employee
// show the role table 
function addEmployee() {
    let query =
    `SELECT *
    FROM role`

    db.query(query, (err, res) => {
        if(err)throw err;
        const role = res.map(({ id, title, salary})=> ({
            value: id,
            title: `${title}`,
            salary: `${salary}`
        }));
        console.table(res);
        employeeRoles(role);
    });
}

function employeeRoles(role) {
    inquirer
        .prompt([
            {
                type: "input",
                name: "firstName",
                message: "Employee First Name: "
             },
             {
                type: "input",
                name: "lastName",
                message: "Employee Last Name: "
             },
             {
                type: "list",
                name: "roleId",
                message: "Employee Role: ",
                choices: role
             }
    ]).then((res) => {
        let query = `INSERT INTO employee SET ?`
        db.query(query, {
            first_name: res.firstName,
            last_name: res.lastName,
            role_id: res.roleId
        },(err, res)=>{
            if(err) throw err;
            initPrompt();
        });
    });
}