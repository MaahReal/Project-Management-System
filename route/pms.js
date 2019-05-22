const express = require('express');

const router = express.Router();

//MANAGER
router.get('/manager', (req, res) =>{
    res.render("manager");
});

router.get('/manage', (req, res) =>{
    const MongoConnection = require('../database.js');
    var con = MongoConnection.getDb();
    con.collection('User').find({"usertype":'2'}).toArray(function(err,result){
        console.log(result)
        res.render("manage",{Clients:result});
    })
    
});

router.get('/project', (req,res)=>{
    const MongoConnection = require('../database.js');
    var con = MongoConnection.getDb();
    con.collection('Project').find({}).toArray(function(err,result){
        res.render("project",{Projects:result});
    })
});

//SECRETARY

// router.get('/projects&clients',(req,res) =>{
//     res.render("projects");
// });

router.get('/secSpec',(req,res) =>{
    res.render("secSpec");
});
//pending project
router.get('/pendingProj', (req,res)=>{
    const MongoConnection = require('../database.js');
    var con = MongoConnection.getDb();
    con.collection('Project').find({}).toArray(function(err,result){
        res.render("pendingProj",{Projects:result});
    })
});

//HISTORY
router.get('/history', (req,res)=>{
    const MongoConnection = require('../database.js');
    var con = MongoConnection.getDb();
    con.collection('Project').find({}).toArray(function(err,result){
        res.render("sec_History",{Projects:result});
    })
});

//client

router.get('/client', (req,res) =>{
    const MongoConnection = require('../database.js');
    var con = MongoConnection.getDb();
    con.collection('Project').find({}).toArray(function(err,result){
        res.render("client",{Projects:result});
    })
});



// router.get('/history',(req, res) =>{
//     res.render("sec_History");
// });

module.exports=router;