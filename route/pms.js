const express = require('express');

const router = express.Router();

router.get('/manager', (req, res) =>{
    res.render("manager");
});

router.get('/projects&clients',(req,res) =>{
    res.render("projects");
});

router.get('/secSpec',(req,res) =>{
    res.render("secSpec");
});

router.get('/pendingProj',(req,res) =>{
    res.render("pendingProj");
});

module.exports = router;