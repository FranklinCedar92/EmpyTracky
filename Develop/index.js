//This is the file with the prompts in it
const inquirer = require('inquirer');
const fs = require('fs');
// const generateTable = require('../../db/schema');

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
    console.log('look, a department');
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

};

const addEmp = () => {

};

const updateEmp = () => {

};



questions();
/*        {
            type: 'text',
            name: 'newDept',
            message: 'Please enter the department name',
            validate: newDeptNameInput => {
                if (newDeptNameInput) {
                    return true
                } else {
                    console.log('Please enter a name!');
                    return false
                }
            },
            when(answers) {
                return answers.toDo === 'Add a department'
            }
        },
        {
            type: 'text',
            name: 'newRoleName',
            message: 'Please enter the new role name',
            validate: newRoleNameInput => {
                if (newRoleNameInput) {
                    return true
                } else {
                    console.log('Please enter a name!');
                    return false
                }
            },
            when(answers) {
                return answers.toDo === 'Add a role'
            }
        },
        {
            type: 'text',
            name: 'newRoleDept',
            message: 'Please enter the department name',
            validate: newRoleDeptInput => {
                if (newRoleDeptInput) {
                    return true
                } else {
                    console.log('Please enter a name!');
                    return false
                }
            },
            when(answers) {
                return answers.toDo === 'Add a role'
            }
        },
        {
            type: 'text',
            name: 'newRoleSalary',
            message: 'Please enter a salary',
            validate: newRoleSalaryInput => {
                if (newRoleSalaryInput) {
                    return true
                } else {
                    console.log('Please enter a salary!');
                    return false
                }
            },
            when(answers) {
                return answers.toDo === 'Add a role'
            }
        },
        {
            type: 'text',
            name: 'newEmpFirstName',
            message: `Please enter the new employee's first name`,
            validate: newEmpFirstNameInput => {
                if (newEmpFirstNameInput) {
                    return true
                } else {
                    console.log('Please enter a name!');
                    return false
                }
            },
            when(answers) {
                return answers.toDo === 'Add an employee'
            }
        },
        {
            type: 'text',
            name: 'newEmpLastName',
            message: `Please enter the new employee's last name`,
            validate: newEmpLastNameInput => {
                if (newEmpLastNameInput) {
                    return true
                } else {
                    console.log('Please enter a name!');
                    return false
                }
            },
            when(answers) {
                return answers.toDo === 'Add an employee'
            }
        },
        {
            type: 'text',
            name: 'newEmpRole',
            message: `Please enter the new employee's role`,
            validate: newEmpRoleInput => {
                if (newEmpRoleInput) {
                    return true
                } else {
                    console.log('Please enter a salary!');
                    return false
                }
            },
            when(answers) {
                return answers.toDo === 'Add an employee'
            }
        },
        {
            type: 'text',
            name: 'newEmpMan',
            message: `Please enter the new employee's manager`,
            validate: newEmpManInput => {
                if (newEmpManInput) {
                    return true
                } else {
                    console.log('Please enter a manager!');
                    return false
                }
            },
            when(answers) {
                return answers.toDo === 'Add an employee'
            }
        },
    ])
};

/*
With all of these, I want to SELECT the choices from the 
database, so that if a new dept/emp/role is added, it will
appear as a choice in the inquirer prompt
*/
/*const newDeptQuestions = () => {
    return inquirer.prompt([
        {
            type: 'text',
            name: 'newDept',
            message: 'Please enter the department name',
            validate: newDeptNameInput => {
                if (newDeptNameInput) {
                    return true
                } else {
                    console.log('Please enter a name!');
                    return false
                }
            },
            when: (answers) => answers.toDo === 'Add a department'
        }
    ])
} */

/*const newRoleQuestions = () => {
    return inquirer.prompt([
        {
            type: 'text',
            name: 'newRoleName',
            message: 'Please enter the new role name',
            validate: newRoleNameInput => {
                if (newRoleNameInput) {
                    return true
                } else {
                    console.log('Please enter a name!');
                    return false
                }
            }
        }, 
        {
            type: 'text',
            name: 'newRoleDept',
            message: 'Please enter the department name',
            validate: newRoleDeptInput => {
                if (newRoleDeptInput) {
                    return true
                } else {
                    console.log('Please enter a name!');
                    return false
                }
            }
        },
        {
            type: 'text',
            name: 'newRoleSalary',
            message: 'Please enter a salary',
            validate: newRoleSalaryInput => {
                if (newRoleSalaryInput) {
                    return true
                } else {
                    console.log('Please enter a salary!');
                    return false
                }
            }
        },
    ])
}

const newEmpQuestions = () => {
    return inquirer.prompt([
        {
            type: 'text',
            name: 'newEmpFirstName',
            message: `Please enter the new employee's first name`,
            validate: newEmpFirstNameInput => {
                if (newEmpFirstNameInput) {
                    return true
                } else {
                    console.log('Please enter a name!');
                    return false
                }
            }
        },
        {
            type: 'text',
            name: 'newEmpLastName',
            message: `Please enter the new employee's last name`,
            validate: newEmpLastNameInput => {
                if (newEmpLastNameInput) {
                    return true
                } else {
                    console.log('Please enter a name!');
                    return false
                }
            }
        },
        {
            type: 'text',
            name: 'newEmpRole',
            message: `Please enter the new employee's role`,
            validate: newEmpRoleInput => {
                if (newEmpRoleInput) {
                    return true
                } else {
                    console.log('Please enter a salary!');
                    return false
                }
            }
        },
        {
            type: 'text',
            name: 'newEmpMan',
            message: `Please enter the new employee's manager`,
            validate: newEmpManInput => {
                if (newEmpManInput) {
                    return true
                } else {
                    console.log('Please enter a manager!');
                    return false
                }
            }
        },
    ])
}*/



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