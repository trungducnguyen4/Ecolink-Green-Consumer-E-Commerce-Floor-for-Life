require('dotenv').config();
const express = require('express');
const session = require('express-session');
const sql = require('mssql');
const { use } = require('./routes/routes');
const app = express();
const PORT = process.env.PORT || 4000;


// set template engine
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use("", require('./routes/routes'));

// create connection to database 
const sqlConfig = {
    server: 'localhost',
    port: 1433, // Specify the port if not the default
    database: 'SPXanh',
    user: 'trungduc1407',
    password: '14072004az',
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};




sql.connect(sqlConfig).then(() => {
    console.log('Connected to SQL Server database:', process.env.SQL_DATABASE);
}).catch((err) => {
    console.error('SQL Server connection error:', err);
});

//route prefix
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});


