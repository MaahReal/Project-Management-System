const express = require('express');

const app = express();

const path = require('path');

const bodyParser = require('body-parser');

// const mongoose = require('mongoose');

const session = require('express-session');

const port = process.env.PORT || 1997;

const MongoConnection = require('./database.js');

// const User = ("User",{
//     lastname: String,
//     firstname: String
// });

app.use('/assets',express.static('assets'));

//EXPRESS-SESSION
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  }))


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.get('/', (req,res) =>{
    res.render('home');
});

app.post('/manage',function(req,res){
    req.body;
    console.log(req.body);
    
    res.render('manage',{name: req.body.firstname});
});

app.post('/', (req,res) =>{
    var username = req.body.user;
    var password = req.body.pass;



   var  Mongo = require('./database.js');
   var con = Mongo.getDb();
   con.collection('User').findOne({"username":username,"password":password},function(err,result){
            if(!err && result){
                req.session.loggedin = true;
                if(result.usertype === "1"){

                    res.render('manager', {name: result.username});
                }else if(result.usertype === "2"){
                    res.render('client', {name: result.username});
                }else if(result.usertype === "3"){
                    res.render('secSpec',{name: result.username});
                }
            }else{
                console.log(err);
            }
   })

});

app.post('/manage', (req, res) =>{
    
});

//clientside
app.post('/addclient', (req,res) =>{
   var  Mongo = require('./database.js');
   var con = Mongo.getDb();
   console.log(req.body)
   var toAdd = {
       fullname:req.body.firstname+" "+req.body.lastname,
       username:req.body.lastname,
       password:'client',
       usertype:'2'
   }
   con.collection('User').insertOne(toAdd);
});

//Secretary side
app.post('/', (req,res) =>{
    var  Mongo = require('./database.js');
    var con = Mongo.getDb();
    console.log(req.body)
    var toAdd = {
        username:req.body.username,
        password:'mayiie19',
        usertype:'3'
    }
    con.collection('User').insertOne(toAdd);
 });

let pms = require('./route/pms.js');
app.use('/pms', pms);

MongoConnection.connectToServer(function(err,client){
    app.listen(port);
    console.log(`Server ready at port ${port}`);
})

app.post('/project-input', (req, res) => {
    var  Mongo = require('./database.js');
    var con = Mongo.getDb();
    var toAddproject = {
        projectname: req.body.projectname,
        clientname:req.body.clientname
    }
    con.collection('Project').insertOne(toAddproject);
    res.render("/project");

});
