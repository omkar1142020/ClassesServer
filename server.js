const express = require('express');
const bodyparser= require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controller/register.js');
const signin = require('./controller/signin.js');

const database = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'test',
    database : 'test'
  }
});

// database.select('*').from('users').then(data =>{
// 	console.log(data);
// });

const app= express();

app.use(bodyparser.json());
app.use(cors());

// const database = {
// 	users: [
// 	{
// 		id: '123',
// 		name: 'john',
// 		email: 'john@gmail.com',
// 		entries: 0,
// 		password:'cookies',
// 		joined: new Date()
// 	},
// 	{
// 		id: '124',
// 		name: 'neha',
// 		email: 'naha@gmail.com',
// 		entries: 0,
// 		password:'bananas',
// 		joined: new Date()
// 	}
// 	]
// }

app.get('/',(req,res) =>{
	res.json(database.users);
})

app.post('/signin',(req,res) =>{ signin.handlesignin(req,res,database,bcrypt) })

app.post('/register',(req,res) =>{ register.handleregister(req,res,database,bcrypt) })

// app.get('/profile/:id', (req,res)  =>{
// 	const { id } = req.params;
// 	let found= false;
// 	database.users.forEach(user =>{
// 		if(user.id === id){
// 			found= true;
// 			return res.json(user);
// 		}
// 	})
// 	if(!found){
// 		res.json('not found')
// 	}
// })

// app.post('/image',(req,res) =>{
// 	const { id } = req.body;
// 	let found= false;
// 	database.users.forEach(user =>{
// 		if(user.id === id){
// 			found= true;
// 			user.entries++;
// 			return res.json(user.entries);
// 		}
// 	})
// 	if(!found){
// 		res.json('not found')
// 	}
// })

app.listen(3001);