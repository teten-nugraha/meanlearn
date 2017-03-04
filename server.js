var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var morgan = require('morgan'); //HTTP request logger middleware
var mongoose = require('mongoose'); //object modeling tool designed to work in an asynchronous environment

app.use(morgan('dev'));

mongoose.connect('mongodb://localhost:27017/meantutorial2',function(err) {
    if(err) {
        console.log('Not connected to the database : '+err);
    }else{
        console.log('Successfully connected to MongoDB');
    }
});

app.listen(8080,function() {
    console.log("Running the server");
});