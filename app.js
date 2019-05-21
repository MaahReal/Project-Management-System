const express = require('express');

const app = express();

const path = require('path');

const bodyParser = require('body-parser');

// const mongoose = require('mongoose');

const session = require('express-session');

const port = process.env.PORT || 1997;

const MongoConnection = require('./database.js');

app.use('/assets',express.static('assets'));

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  }))

// var personSchema  = new mongoose.Schema({
//     name: String,
// })
// var projectSchema  = new mongoose.Schema({	
//     // name: String,
//     projectname: String,
//     task1: String,
//     task2: String,
//     task3: String,
//     // status: String
// })
// var loggSchema = new mongoose.Schema({
//     username: String,
//     password: String,
//     usertype: String
// })

// var person = mongoose.model("crudficollections",personSchema);
// var project = mongoose.model("proficollections",projectSchema);
// var logg = mongoose.model("signficollections",loggSchema);/* this db is for the log in side */



// mongoose.connect("mongodb://localhost:27017/dbfinal",{useNewUrlParser: true});
// mongoose.connection.on("error",console.error.bind(console,"connection error:"));

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
