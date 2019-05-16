const express = require('express');

const router = express.Router();

router.get('/secSpec',(req,res) =>{
    res.render("secSpec");
});

router.get('/pendingProj',(req,res) =>{
    res.render("pendingProj");
});

module.exports = router;