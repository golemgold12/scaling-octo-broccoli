// ./database/db-connector.js

// Get an instance of mysql we can use in the app
var mysql = require('mysql')

// Create a 'connection pool' using the provided credentials
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs361_freundl',
    password        : 'RmmhqCOkCSyy',
    database        : 'cs361_freundl'
})

// Export it for use in our applicaiton
// source ./database/OSUFoodData.sql;
// source ./database/OSUFoodReview.sql;
module.exports.pool = pool;

//mysql -u cs361_freundl -h classmysql.engr.oregonstate.edu -p cs361_freundl
