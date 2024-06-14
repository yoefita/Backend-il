require('dotenv').config()
let mysql = require('mysql');

let connection = mysql.createConnection({
    host: `${process.env.HOST}`,
    user: `${process.env.USER}`,
    password: `${process.env.PASSWORD}`,
    database: `${process.env.DATABASE}`
});

connection.connect(function (error) {
    if (!!error) {
        console.log(error);
    } else {
        console.log('Successfully connected!');
    }
})

module.exports = connection;