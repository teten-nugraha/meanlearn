var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var morgan = require('morgan'); //HTTP request logger middleware
var mongoose = require('mongoose'); //object modeling tool designed to work in an asynchronous environment
var User = require('./app/models/user');
var bodyParser = require('body-parser'); // untuk membaca inputan json

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

mongoose.connect('mongodb://localhost:27017/meantutorial2',function(err) {
    if(err) {
        console.log('Not connected to the database : '+err);
    }else{
        console.log('Successfully connected to MongoDB');
    } 
});

app.post('/users',function(req,res) {

    var user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    user.email    = req.body.email;

    if(req.body.username == null || req.body.username == '' || req.body.password == null || req.body.password == '' || req.body.email == null || req.body.email == ''){
        res.json({ success:false,message:'Ensure username, email and password were provided' });
    }else{
        user.save(function(err){
            if (err) {
                res.json({ success:false,message:'Username or Email already exist' });
            }else{
                res.json({ success:true,message:'user created' });
            }
        });
    }
});

app.listen(8080,function() {
    console.log("Running the server on port "+port);
});