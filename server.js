//Node modules, setup

const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = 8080;


//Routing

const routes = require('./routes/index.js');
app.use('/api', routes);


//Start server

app.listen(port);
console.log("Express server listening on port " + port);