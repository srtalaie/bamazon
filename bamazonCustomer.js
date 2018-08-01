const inquirer = require('inquirer');
const mysql = require('mysql');

const myPass = require('./password.js');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: myPass.password,
    database: 'top_songsdb'
});