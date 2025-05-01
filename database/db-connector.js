// ./database/db-connector.js

// Get an instance of mysql we can use in the app
var mysql = require('mysql')
var db = require('./database/db-connector')

// Create a 'connection pool' using the provided credentials
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs361_freundl',
    password        : 'RmmhqCOkCSyy',
    database        : 'cs340_freundl'
})

// Export it for use in our applicaiton
module.exports.pool = pool;