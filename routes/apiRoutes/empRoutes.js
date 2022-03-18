const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

// GET list of all roles
router.get('/employees', (req, res) => {
    const sql = // 'this is where the table info goes';
    db.query(sql, (err, rows => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    }));
});

// Create new role
router.post('/employee', (req, res) => {
    const errors = inputCheck(body, 'first_name', 'last_name', 'job_title', 'manager');
    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }
    const sql = `INSERT INTO employees (first_name, last_name, job_title, manager)
                VALUES (?)`;
    const params = [body.dept_name];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: body
        });
    });
});

// Update an employee's job title
router.put('/employee/:id', (req, res) => {
    const errors = inputCheck(req.body, 'job_title');

    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }
    
    const sql = `UPDATE employees SET job_title = ?
                WHERE id = ?`;
    const params = [req.body.party_id, req.params.id];
    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            // check if a record was found
        } else if (!result.affectedRows) {
            res.json({
                message: 'Employee not found'
            });
        } else {
            res.json({
                message: 'success',
                data: req.body,
                changes: result.affectedRows
            });
        }
    });
});

module.exports = router;