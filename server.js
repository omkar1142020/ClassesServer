const express = require('express');
const bodyparser= require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controller/register.js');
const signin = require('./controller/signin.js');

const app= express();

const database = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'test',
    database : 'test'
  }
});

app.use(bodyparser.json());
app.use(cors());

app.get('/',(req,res) =>{
	res.json('It is working');
})

app.post('/signin',(req,res) =>{ signin.handlesignin(req,res,database,bcrypt) })

app.post('/register',(req,res) =>{ register.handleregister(req,res,database,bcrypt) })

app.listen(process.env.PORT || 3001);