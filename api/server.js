const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const apiRoute = require('./routes/api.route');
const cors = require('cors');

// Loading Configuration settings
const config = require('./config');

// Loading MongoDB URL
const dbURL = config.getDBURL();

// Port Configuration
const port = config.getPort();

// Front-end URL
const frontEndURL = config.getFrontEndURL();

// MongoDB connection
mongoose
  .connect(dbURL)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("Error connecting to MongoDB: ", err));

// Express app creation
const app = express();

// Parse requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS settings
const corsOptions = {
  origin: [ 
    // Front-end
    frontEndURL,
    "http://localhost" // For Unit testing (Jest)
  ]
};
app.use(cors(corsOptions));

app.use('/api', apiRoute);

app.listen(port, () =>{
    console.log(`API listening on port: ${port}`);
});

// Error Handling
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});


process.stdin.resume(); // make sure program doesn't close instantly

function exitHandler(options, exitCode) {
    mongoose.connection.close();
    if (options.cleanup) console.log('clean');
    if (exitCode || exitCode === 0) console.log(exitCode);
    if (options.exit) process.exit();
}

// When app closes
process.on('exit', exitHandler.bind(null,{cleanup:true}));

// Catch CTRL + C event
process.on('SIGINT', exitHandler.bind(null, {exit:true}));

// Catch Uncaught Exceptions
process.on('uncaughtException', exitHandler.bind(null, {exit:true}));

// Catch "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler.bind(null, {exit:true}));
process.on('SIGUSR2', exitHandler.bind(null, {exit:true}));