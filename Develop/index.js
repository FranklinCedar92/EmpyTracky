const inquirer = require('inquirer');
const fs = require('fs');
const cTable = require('console.table');
const seeds = require('../db/seeds');

// Questions for user input
const questions = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'toDo',
            message: 'What would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee']
        }
    ]).then((answers) => {
        // console.log(answers.toDo);
        switch (answers.toDo) {
            case "View all departments":
                viewDepts();
                break;
            case 'View all roles':
                viewRoles();
                break;
            case 'View all employees':
                viewEmps();
                break;
            case 'Add a department':
                addDept();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Add an employee':
                addEmp();
                break;
            case 'Update an employee':
                updateEmp();
                break;
        };   
    });
};

const viewDepts = () => {
    console.log('Viewing all departments');
    const sql = `SELECT * FROM departments`;
};

const viewRoles = () => {

};

const viewEmps = () => {

};

const addDept = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'newDept',
            message: 'Please enter the department name',
            validate: newDeptNameInput => {
                if (newDeptNameInput) {
                    return true
                } else {
                    console.log('Please enter a name!');
                    return false
                }
            }
        }
    ]).then((answers) => {
        console.log(answers.newDept);
    })
    
};

const addRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'newRoleName',
            message: 'Please enter the job title',
            validate: newDeptNameInput => {
                if (newDeptNameInput) {
                    return true
                } else {
                    console.log('Please enter a title!');
                    return false
                }
            }
        },
        {
            type: 'list',
            name: 'newRoleDept',
            message: 'Which department is this role in?',
            choices: ['Admissions', 'Administration', 'Teachers']

        }
    ]).then((answers) => {
        console.log(answers.newRoleName);
        console.log(answers.newRoleDept);
        console.log('Role added!');
    })
    
};

const addEmp = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'newEmpFirstName',
            message: `Please enter the employee's first name`,
            validate: newDeptNameInput => {
                if (newDeptNameInput) {
                    return true
                } else {
                    console.log('Please enter a name!');
                    return false
                }
            }
        },
        {
            type: 'input',
            name: 'newEmpLastName',
            message: `Please enter the employee's last name`,
            validate: newDeptNameInput => {
                if (newDeptNameInput) {
                    return true
                } else {
                    console.log('Please enter a name!');
                    return false
                }
            }
        },
        {
            type: 'input',
            name: 'newEmpRole',
            message: `Please enter the employee's job title`,
            validate: newDeptNameInput => {
                if (newDeptNameInput) {
                    return true
                } else {
                    console.log('Please enter a title!');
                    return false
                }
            }
        },
        {
            type: 'input',
            name: 'newEmpManager',
            message: `Please enter the employee's manager`,
            validate: newDeptNameInput => {
                if (newDeptNameInput) {
                    return true
                } else {
                    console.log('Please enter a name!');
                    return false
                }
            }
        }
    ]).then((answers) => {
        console.log(answers.newEmpFirstName);
        console.log(answers.newEmpLastName);
        console.log(answers.newEmpRole);
        console.log(answers.newEmpManager);
        console.log('Employee added!');
    })
   
};

const updateEmp = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'updateEmpRoleFirstName',
            message: `Please enter the employee's first name`,
            validate: newDeptNameInput => {
                if (newDeptNameInput) {
                    return true
                } else {
                    console.log('Please enter a name!');
                    return false
                }
            }
        },
        {
            type: 'input',
            name: 'updateEmpRoleLastName',
            message: `Please enter the employee's last name`,
            validate: newDeptNameInput => {
                if (newDeptNameInput) {
                    return true
                } else {
                    console.log('Please enter a name!');
                    return false
                }
            }
        },
        {
            type: 'input',
            name: 'updateEmpRole',
            message: `Please enter the employee's new job title`,
            validate: newDeptNameInput => {
                if (newDeptNameInput) {
                    return true
                } else {
                    console.log('Please enter a title!');
                    return false
                }
            }
        }
    ]).then((answers) => {
        console.log(answers.updateEmpRole);
        console.log('Employee updated!')
    })
};



questions();




/*
questions() 
    .then(userData => {
        console.log(userData);
        const pageXML = generatePage(userData);

        fs.writeFile('./README.md', pageXML, err => {
            if (err) throw new Error(err);

            console.log('Page created!');
        });
    }); 
    */