var mysql   = require("mysql");
var pool = mysql.createPool({  
    host     : '127.0.0.1',
    database : 'mars', 
    user     : 'root', 
    password : '' 
  });                     
module.exports = pool;