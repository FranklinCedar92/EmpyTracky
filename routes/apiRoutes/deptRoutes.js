const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

// GET list of all departments
router.get('/departments', (req, res) => {
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

// Create new department
router.post('/department', (req, res) => {
    const errors = inputCheck(body, 'dept_name');
    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }
    const sql = `INSERT INTO departments (dept_name)
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