const express = require('express');
const { json } = require('express/lib/response');
const db = require('./db/connection');

const apiRoutes = require('./routes/apiRoutes'); //which is to index.js (which is automatically understood in Node)

const PORT = process.env.PORT || 3001;
const app = express();

//Express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', apiRoutes);

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