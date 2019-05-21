const express = require('express');

const router = express.Router();

//MANAGER
router.get('/manager', (req, res) =>{
    res.render("manager");
});

router.get('/manage', (req, res) =>{
    res.render("manage")
});

router.get('/project',(req,res) =>{
    res.render("projects");
});

//SECRETARY

// router.get('/projects&clients',(req,res) =>{
//     res.render("projects");
// });

router.get('/secSpec',(req,res) =>{
    res.render("secSpec");
});



module.exports = router;