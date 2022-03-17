//This is the file with the prompts in it
const inquirer = require('inquirer');
const fs = require('fs');
// const generateTable = require('../../db/schema'); ????

// Questions for user input
const questions = () => {
    return inquirer.prompt([
        {
            type: 'checkbox',
            name: 'toDo',
            message: 'What would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee']
        }
    ])
}