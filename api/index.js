
///using express

// const express = require('express');
// const PORT = process.env.PORT || 3001;
// const app = express();


const PORT = process.env.PORT || 3001;
///using koa

// const koa = require('koa');
import koa from "koa";
// const Router = require("koa-router");
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
// const bodyParser = require('koa-bodyparser');


//Importing the routes
import apiRoutes from './routes/index.js';
// const rulesRoutes = require('./routes/index');

//Start app
const app = new koa();

//Using bodyParser
app.use(bodyParser());


//Registering the routes
app.use(apiRoutes.routes()).use(apiRoutes.allowedMethods());




///middleware registration in express

// app.get('/api', (req, res) => {
//     var rules = []
//     console.log('API Publicodes')
//     res.json({message: "API Publicodes"});
// });
//
// app.get('/api/rules', (req, res) => {
//     console.log('API Publicodes')
//     res.json({message: "API Publicodes"});
// });
//
//
// app.get('/', (req, res) => {
//     res.send('App Works!');
// })



// app.listen(PORT, () => {
//     console.log(`Server listening on ${PORT}`)
// });

//koa
//Setup the port
const server = app.listen(PORT, () => {
    console.log(`Koa is listening to http://localhost:${PORT}`);
});

