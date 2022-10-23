// bring in dependencies
const mysql    = require('mysql2');
const inquirer = require('inquirer');
require('console.table');

// connect to the database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'employees_db'
    },
    console.log('connected to the employees_db')
);

db.connect(function (err) {
    if (err) throw err;
    // prompt the user after the connection is a great success
    initPrompt();
});

function initPrompt() {
    console.log('init prompty');
}