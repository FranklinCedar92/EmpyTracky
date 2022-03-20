const inquirer = require('inquirer');
const fs = require('fs');
const mysql = require('mysql2');
const cTable = require('console.table');
//const seeds = require('../db/seeds');

//Connect to MySQL database
const db = mysql.createConnection(
    {
        host: 'localhost',
        //Your MySQL username,
        user: 'root',
        //Your MySQL password
        password: 'Lamppost00!',
        database: 'tracker'
    },
    console.log('Connected to the tracker database.')
);

db.connect((err) => {
    if (err) throw err;
    // console.log('Connected to the tracker database.')
    questions();
});

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
    db.query(sql, (err, results) => {
        if (err) throw err;
        console.table(results);
        questions();
    })
};

const viewRoles = () => {
    console.log('Viewing all roles');
    const sql = `SELECT * FROM roles`;
    db.query(sql, (err, results) => {
        if (err) throw err;
        console.table(results);
        questions();
    })
};

const viewEmps = () => {
    console.log('Viewing all employees');
    const sql = `SELECT * FROM employees`;
    db.query(sql, (err, results) => {
        if (err) throw err;
        console.table(results);
        questions();
    })
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
        const sql = `INSERT INTO departments (dept_name)
                VALUES (?)`;
        const params = [answers.newDept];

        db.query(sql, params, (err, results) => {
            if (err) throw err;
            console.table(results);
            questions();
        });
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
            type: 'number',
            name: 'salary',
            message: 'What is the salary for this position?'
        },
        {
            type: 'number',
            name: 'newRoleDept',
            message: 'Which department is this role in? Admissions -- 1, Administration -- 2, Teachers -- 3',
            choices: ['Admissions', 'Administration', 'Teachers']

        }
    ]).then((answers) => {
        const sql = `INSERT INTO roles (job_title, salary, department_id)
                VALUES (?,?,?)`;
        const params = [answers.newRoleName, answers.salary, answers.newRoleDept];

        db.query(sql, params, (err, results) => {
            if (err) throw err;
            console.table(results);
            questions();
        });
    });
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
            type: 'number',
            name: 'newEmpRoleID',
            message: `Please enter the employee's job id number`,
            validate: newDeptNameInput => {
                if (newDeptNameInput) {
                    return true
                } else {
                    console.log('Please enter a number!');
                    return false
                }
            }
        },
        {
            type: 'number',
            name: 'newEmpManager',
            message: `Please enter the employee's manager id number`,
            validate: newDeptNameInput => {
                if (newDeptNameInput) {
                    return true
                } else {
                    console.log('Please enter a number!');
                    return false
                }
            }
        }
    ]).then((answers) => {
        const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
                VALUES (?,?,?,?)`;
        const params = [answers.newEmpFirstName, answers.newEmpLastName, answers.newEmpRoleID, answers.newEmpManager];

        db.query(sql, params, (err, results) => {
            if (err) throw err;
            console.table(results);
            questions();
        });
    });
   
};

const updateEmp = () => {
    inquirer.prompt([
        {
            type: 'num',
            name: 'updateEmpID',
            message: `Please enter the employee's id number`,
            validate: newDeptNameInput => {
                if (newDeptNameInput) {
                    return true
                } else {
                    console.log('Please enter a number!');
                    return false
                }
            }
        },
        {
            type: 'num',
            name: 'updateEmpRole',
            message: `Please enter the employee's new job id number`,
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
        const sql = `UDPATE employees SET role_id = ? WHERE id = ?`;
        const params = [answers.updateEmpID, answers.updateEmpRole];

        db.query(sql, params, (err, results) => {
            if (err) throw err;
            console.table(results);
            questions();
        });
    });
};