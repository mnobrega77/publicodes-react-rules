
///using express

// const express = require('express');
// const PORT = process.env.PORT || 3001;
// const app = express();

import Engine, {formatValue} from 'publicodes';
import { koaMiddleware as publicodesAPI } from '@publicodes/api'
import rules from 'modele-social';

const PORT = process.env.PORT || 3001;
///using koa

// const koa = require('koa');
import koa from "koa";
import pagination from "koa-pagination-v2"
// const Router = require("koa-router");
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
// const bodyParser = require('koa-bodyparser');


//Importing my routes
import apiRoutes from './routes/index.js';

// const rulesRoutes = require('./routes/index');

//Start app
const app = new koa();

//Using bodyParser
app.use(bodyParser());

//importing publicodes api routes

const router = new Router();
const newApiRoutes = publicodesAPI(new Engine(rules));
router.use('/api', newApiRoutes)


// keep this before all routes that will use pagination
app.use(pagination({defaultLimit: 20, maximumLimit: 50}));


//Registering the routes
app.use(router.routes()).use(router.allowedMethods());






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

