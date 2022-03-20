const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

//Connect to MySQL database
const db = mysql.createConnection(
    {
        host: 'localhost',
        //MySQL username,
        user: 'root',
        //MySQL password
        password: 'Lamppost00!',
        database: 'tracker'
    },
    console.log('Connected to the tracker database.')
);

db.connect((err) => {
    if (err) throw err;
    // starts the inquirer prompts
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
        // leads to other prompts
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

// view departments
const viewDepts = () => {
    console.log('Viewing all departments');
    const sql = `SELECT * FROM departments`;
    db.query(sql, (err, results) => {
        if (err) throw err;
        console.table(results);
        questions();
    })
};

// view roles
const viewRoles = () => {
    console.log('Viewing all roles');
    const sql = `SELECT * FROM roles`;
    db.query(sql, (err, results) => {
        if (err) throw err;
        console.table(results);
        questions();
    })
};

// view employees
const viewEmps = () => {
    console.log('Viewing all employees');
    //merges information from Roles table into Employees table
    const sql = `SELECT * FROM employees
                LEFT JOIN roles
                ON employees.role_id = roles.id`;
    db.query(sql, (err, results) => {
        if (err) throw err;
        console.table(results);
        questions();
    })
};

//add a department
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
            console.log('Departments updated!');
            questions();
        });
    })
    
};

// add a role
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
            console.log('Roles updated!');
            questions();
        });
    });
};

//add an employee
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
            ('Employees updated!');
            questions();
        });
    });
   
};

// update an employee's position by id numbers
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
        const sql = `UPDATE employees SET role_id = ? WHERE id = ?`;
        const params = [answers.updateEmpID, answers.updateEmpRole];

        db.query(sql, params, (err, results) => {
            if (err) throw err;
            console.table(results);
            ('Employee role updated!');
            questions();
        });
    });
};
