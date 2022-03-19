const express = require('express');
const db = require('./db/connection');
const inputCheck = require('./utils/inputCheck');
const apiRoutes = require('./routes/apiRoutes'); //which is to index.js (which is automatically understood in Node)

const PORT = process.env.PORT || 3001;
const app = express();

//Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Use apiRoutes
app.use('/api', apiRoutes);

// test route
app.get('/', (req, res) => {
    res.json({
        message: 'Hello world!'
    });
}); //it works!

// "Not Found" response for any other request
app.use((req, res) => {
    res.status(404).end();
});

//Start server after DB connection
db.connect(err => {
    if(err) throw err;
    console.log('Database connected.');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});