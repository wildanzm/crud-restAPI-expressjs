const mysql = require('mysql2')

const connect = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: ''
})


module.exports = connect