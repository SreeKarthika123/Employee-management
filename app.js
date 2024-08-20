const { urlencoded } = require("express");
const express=require("express");
const app=express();
const path=require('path'); //nodejs module used for file operations
const mongoose = require('mongoose');
const bodyparser=require('body-parser'); //takes req and gives response
const port=80;
const fs=require('fs');
const { stringify } = require("querystring"); //The stringify function specifically converts an object containing query parameters into a URL-encoded query string.
/*require('./auth/models/db');*/
const userrouter=require('./auth/models/routes/user');//you're importing the user router from a file
const employeerouter=require('./events/models/routes/user');
app.use('/static',express.static('static')); //'static' directory with some static files
app.use(urlencoded());
app.use(express.json());
app.use(userrouter);
app.use(employeerouter);

app.set('view-engine','pug'); //render a view, it will use the Pug templating engine
app.set('views',path.join(__dirname,'views')); // while using render it uses pug file view and add current directory name joins with views to the fike name

app.get('/',(req,res)=>{
    res.status(200).render('intro.pug');
})
app.get('/signup',(req,res)=>{
    const title='Employee Registration';
    const params={'title':title};
    res.status(200).render('signup.pug',params);
})
app.get('/signin',(req,res)=>{
    const title='Employee Signin';
    const params={'title':title};
    res.status(200).render('signin.pug',params);
})
app.get('/signin/create',(req,res)=>{
    const title="creating an event";
    const params={'title':title};
    res.status(200).render('createevent.pug',params);
})
app.get('/signin/read',(req,res)=>{
    const title="reading an event";
    const params={'title':title};
    res.status(200).render('readevent.pug',params);
})
app.get('/signin/update',(req,res)=>{
    const title="creating an event";
    const params={'title':title};
    res.status(200).render('updateevent1.pug',params);
})
app.get('/signin/delete',(req,res)=>{
    const title="deleting an event";
    const params={'title':title};
    res.status(200).render('deleteevent.pug',params);
})
app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})