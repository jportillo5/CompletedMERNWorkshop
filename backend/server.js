require('dotenv').config();

//where we register our express app
const express = require('express'); //express package we just installed with> npm install express
const mongoose = require('mongoose'); //an Object Data Modeling library, wraps MongoDB in an extra layer letting us use methods to read/write database documents and declare models and schemas to ensure a more stripped data structure
const songRoutes = require('./routes/songRoutes'); //extension not needed

//startup express app
const app = express();

// middleware -- what does this do again?
app.use(express.json()); //
app.use((req, res, next) => { //
    console.log(req.path, req.method); //log the request
    next();
});

//routes
app.use('/api/songRoutes', songRoutes); //gets all routes attached to the router in the songRoutes file, and specifies a path

//connect to the database
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //don't start listening for requests until you've connected to the database

        //listen for requests
        app.listen(process.env.PORT, () => {
            console.log('connected to db, listening on port', process.env.PORT);
        }); //run either "npm run dev" or "nodemon server.js" and you'll see this message
    })
    .catch((error) => {
        console.log(error)
    })
;