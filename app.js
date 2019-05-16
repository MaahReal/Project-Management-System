const express = require('express');

const app = express();

const path = require('path');

const bodyParser = require('body-parser');

const port = process.env.PORT || 1997;

app.use('/assets',express.static('assets'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.get('/', (req,res) =>{
    res.render('home');
});

let pms = require('./route/pms.js');
app.use('/pms', pms);

app.listen(port);
console.log(`Server ready at port ${port}`);