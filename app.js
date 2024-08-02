const mysql = require("mysql2");

//create object connection
const connec =  mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '12345',
    database: 'cruddata' 
});

connec.connect((error) => {
    if(!error) {
        console.log('Connected to MySQL');
    } else {
        console.log(error.message);
    }
})
   
module.exports = connec ;