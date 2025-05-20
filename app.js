// App.js
// some of this taken from cs 340 tutorial
/*
    SETUP
*/

var express = require('express');   // We are using the express library for the web server
var app = express();            // We need to instantiate an express object to interact with the server in our code
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
PORT = 2637;                 // Set a port number at the top so it's easy to change in the future
var db = require('./database/db-connector')

const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
const e = require('express');
const bcrypt = require('bcrypt');
const session = require('express-session');
app.engine('.hbs', engine({ extname: ".hbs" }));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

app.use(express.static('public'));
app.use(session({
    secret: 'larssupersecretVal', // Use an environment variable in production(Bad?)
    resave: false,
    saveUninitialized: false
}));
const fs = require('fs');
app.get('/', function (req, res) {
    res.render('index', {username: req.session.username});                    // Note the call to render() and not send(). Using render() ensures the templating engine
});

app.get('/index', function (req, res) {
    res.render('index', {username: req.session.username});                    // Note the call to render() and not send(). Using render() ensures the templating engine
});

app.get('/about', function (req, res) {
    res.render('about');                    // Note the call to render() and not send(). Using render() ensures the templating engine
});
app.get('/Restauraunts', function (req, res) {
    let query1 = "SELECT * FROM Restaurant;";               // Define our query
    let query2 = "SELECT * FROM Review;";               // Define our query

    db.pool.query(query1, function (error1, RestaurantRows, fields1) {

        if (error1) {
            console.log(error1);
            res.send("Error getting Restaraunts");
            return;
        }

        db.pool.query(query2, function (error2, reviewRows, fields2) {
            if (error2) {
                console.log(error2);
                res.send("Error getting Restaraunts");
                return;
            }

            let AVGRating = {};
            reviewRows.forEach(review => {
                const id = review.restaurant_Id;
                if (!AVGRating[id]) {

                    AVGRating[id] = []; // create a array out of it
                }
                AVGRating[id].push(review.rating);
            });

            console.log(AVGRating);
            RestaurantRows.forEach(restua => {
                //console.log(AVGRating[restua.restaurant_Id]);
                const ratings = AVGRating[restua.restaurant_Id] || [];  // get the reviews
                if (ratings.length > 0) {

                    const sum = ratings.reduce((acc, val) => acc + val, 0);
                    restua.avg_Rating = (sum / ratings.length).toFixed(1); // Compute the average.
                } else {
                    restua.avg_Rating = "No ratings yet";
                }
            })
            res.render('restauraunts', {
                data: RestaurantRows, review: reviewRows, username: req.session.username // technicall you dont need latter but i will use it
            });

        });
    });                  // Render the index.hbs file, and also send the renderer
    // an object where 'data' is equal to the 'rows' we
});




app.get('/reviewPage/:restaurantId', function (req, res) {
    // this will almost always be tied to a certain restaurant
    const restaurantId = req.params.restaurantId;

    console.log(restaurantId);

    let reviewQuery = `SELECT * FROM Review WHERE Review.restaurant_Id = ?`;
    db.pool.query(reviewQuery, [restaurantId], function (reviewError, foundReviews, fields2) {
        if (reviewError) {
            console.log(reviewError);
            res.send("Error getting reviews under that restaurant name");
            return;
        }
        console.log(foundReviews);
        let restaurantQuery = `SELECT * FROM Restaurant WHERE Restaurant.restaurant_Id = ?`;
        db.pool.query(restaurantQuery, [restaurantId], function (restaError, restaurant_Name, fields2) {
            if (restaError) {
                console.log(restaError);
                res.send("Error getting restaurant name");
                return;
            } else if (restaurant_Name.length > 0) {
                const selectedName = restaurant_Name[0];
                res.render('reviewPage', {
                    rName: selectedName, review: foundReviews, username: req.session.username  // technicall you dont need latter but i will use it
                });

            } else {
                res.send("Restaurant not found with that ID.");
                return;

            }

        });



    });
});
app.post('/register', async (req, res) => {
    let data = req.body;


    const user = data.username;
    const passkey = data.passkey;
    if(!user || !passkey){
        console.log("Error, no user/pass specified")
        return  res.sendStatus(400);
    }

    try{
        const hashifyPassword = await bcrypt.hash(passkey,7);
        const query = 'INSERT INTO Users (username, passHash) VALUES(?,?)'
        db.pool.query(query, [user,hashifyPassword], (error, result) => {
            if(error){
                console.log("Error, user is probably taken.")
                return  res.sendStatus(400).send("Error- user is taken!");
            } else{
                // successful registration

                //console.log("We did it");
                res.send(result); // this probably isnt the right way to do this

            }
        })
    } catch(error){

        res.sendStatus(500).send("Error- server not responding to command!");

    }

});

app.post('/login', async (req, res) => {
    let data = req.body;
    const user = data.username;
    const passkey = data.passkey;
    const query = 'SELECT * From Users WHERE username = ?';
    db.pool.query(query, [user], async (error, result) => { // this is super script kiddie 
        if(error || result.length === 0){
                console.log("User does not exist.")
                //documentLoginFailure(user, 'no user exists');

                return res.sendStatus(400);


        }
        const user = result[0];

        const possibleMatch = await bcrypt.compare(passkey,user.passHash);
        if(possibleMatch){
            req.session.user_ID = user.user_ID;
            req.session.username = user.username;
            res.send(result);                 // Note the call to render() and not send(). Using render() ensures the templating engine
            // let them in
        } else{
            console.log("bad password..");
            documentLoginFailure(data.username, 'bad password');
            res.sendStatus(400);

       
        }

    })

})

app.post('/logout', (req,res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});
app.post('/add-review-ajax', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;


    console.log(data);
    // Create the query and run it on the database
    query1 = `
    INSERT INTO Review (restaurant_Id, user_ID, rating, reviewer, comments, is_Verified)
    VALUES (?, (SELECT user_ID FROM Users WHERE username = ?), ?, ?, ?, 1)
    `;

    let datavals = [
        data.restaurant_Id,
        data.user,
        data.rating,
        data.reviewer,
        data.comments,



    ];

    db.pool.query(query1,datavals, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else {
            query2 = `SELECT * FROM Review;`;
            db.pool.query(query2, function (error, rows, fields) {

                // If there was an error on the second query, send a 400
                if (error) {

                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else {
                    res.send(rows);
                }
            })
        }
    })
});


app.delete("/delete-restaurant-ajax", function (req, res, next) {
    // Extract employee id from request body
    let data = req.body
    let restaurant_Id = data.restaurant_Id

    // Define SQL query for deletion
    let deleteQuery = `DELETE FROM Restaurant WHERE restaurant_Id = ?`

    // Execute query
    db.pool.query(deleteQuery, [restaurant_Id], function (error, rows, fields) {
        if (error) {
            // Log error and send 400 status
            console.log(error)
            res.sendStatus(400)
        } else {
            // Send 200 status to confirm operation was successful
            res.sendStatus(200)
        }
    })
})



app.post('/add-restaurant-ajax', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    console.log(data);
    // Create the query and run it on the database
    query1 = `INSERT INTO Restaurant (restaurant_Name, phone, foodType,openHour,closeHour,is_Open) VALUES ('${data.restaurant_Name}', '${data.phone}','${data.foodType}','${data.inputOpens}','${data.inputClosed}', '${data.is_Open}')`;
    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else {
            query2 = `SELECT * FROM Restaurant;`; // do this i guess
            db.pool.query(query2, function (error, rows, fields) {

                // If there was an error on the second query, send a 400
                if (error) {

                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else {
                    res.send(rows);
                }
            })
        }
    })

});
app.delete("/delete-review-ajax", function (req, res, next) {
    // Extract employee id from request body
    let data = req.body
    let review_Id = data.review_Id

    // Define SQL query for deletion
    let deleteQuery = `DELETE FROM Review WHERE review_Id = ?`

    // Execute query
    db.pool.query(deleteQuery, [review_Id], function (error, rows, fields) {
        if (error) {
            // Log error and send 400 status
            console.log(error)
            res.sendStatus(400)
        } else {
            // Send 200 status to confirm operation was successful
            res.sendStatus(200)
        }
    })
})
// API endpoints

app.get('/api/restaurant/timeframe/:value', function (req, res) { // get request 

    const openNum = parseInt(req.params.value);
    console.log("We got a request");
    console.log(req.params.value);
    if (isNaN(openNum)) {

        return res.status(400).json({ error: 'Not a number!' });
    }
    let query = `SELECT r.restaurant_Id, r.restaurant_Name, AVG(rate.rating) AS average_rating 
    FROM Restaurant r
    JOIN Review rate ON r.restaurant_Id = rate.restaurant_Id
    WHERE r.is_Open = 1 AND r.openHour < ? AND r.closeHour > ?
    GROUP BY r.restaurant_Id
    ORDER BY average_rating DESC
    LIMIT 1
    `; // do this i guess

    db.pool.query(query, [openNum, openNum - 1], function (error, RestaurantRows) {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "Error retrieving from database..." });
        } 

        if(RestaurantRows.length > 0){
                res.json(RestaurantRows[0]);
        } else{

                console.log(error);
            return res.status(500).json({ error: "There are no restaraunts that fit within your hours bruh" });

        }



        
    });

})

app.get('/api/restaurant/openOnes', function (req, res) { // get request 

   
    let query = `SELECT * FROM Restaurant WHERE is_Open = 1`; // do this i guess

    db.pool.query(query, function (error, RestaurantRows) {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "Error retrieving from database..." });
        } 

        if(RestaurantRows.length > 0){
                res.json(RestaurantRows);
        } else{

                console.log(error);
            return res.status(500).json({ error: "There are no open restauraunts for some reason"});

        }



        
    });

})

function documentLoginFailure(user,reas){
      const logFailure = `${new Date().toISOString()} - Failed Login Attempt: ${user} - Reason: ${reas}\n`;

    fs.appendFile('failedAccess.txt', logFailure, (err) => {
        if (err){
            console.error('login failure file does not exist:', err);
        } 
    });

}
/*
    LISTENER
*/
app.listen(PORT, function () {            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://classwork.engr.oregonstate.edu:' + PORT + '; press Ctrl-C to terminate. Were too poor for a SSL certificate...')
});