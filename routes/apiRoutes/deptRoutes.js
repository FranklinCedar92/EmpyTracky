const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

// GET list of all departments
router.get('/departments', (req, res) => {
    const sql = 'this is where the table info goes'
})