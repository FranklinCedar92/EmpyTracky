const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

// GET list of all roles
router.get('/roles', (req, res) => {
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
router.post('/role', (req, res) => {
    const errors = inputCheck(body, 'job_title', 'dept', 'salary');
    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }
    const sql = `INSERT INTO roles (job_title, dept, salary)
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

module.exports = router;