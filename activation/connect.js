const mysql = require('mysql2');



const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'PB$K!D$Plu$!',
    database: 'job'
});

module.exports = (connection);