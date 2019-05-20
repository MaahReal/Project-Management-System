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

router.get('/projects',(req,res) =>{
    res.render("project");
});

module.exports = router;