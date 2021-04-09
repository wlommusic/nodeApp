const http = require('http');
const fs = require("fs");
const _ = require("lodash");
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const { render } = require('ejs');
const blogRoutes =  require('./routes/blogRoutes')

//express app
const app = express();

//mongo connection
const MONGODB_URI =
  "mongodb+srv://dipta:panda123@nodeapp.p3coa.mongodb.net/nodeApp?retryWrites=true&w=majority";
mongoose.connect(MONGODB_URI,{useNewUrlParser:true,useUnifiedTopology:true,})
  .then(result=> app.listen(3000))
  .catch(err=> console.log(err));

//view engine
app.set('view engine', 'ejs');
app.set('views','ejs');

//middleware static file
app.use(express.static('public'))
//middleware
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));
app.use((req, res, next)=>{
  res.locals.path = req.path;
  next();
});

//mongoose
// app.get("/add-blog", (req, res) => {
//   const blog = new Blog({
//     title: "new blog 1",
//     snippet: "about my new blog",
//     body: "more about my new blog",
//   });

//   blog
//     .save()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });


//routes

app.get('/', (req, res)=>{
// res.sendFile('./ejs/index.html',{root:__dirname});
res.render('index',{title:'HOME'} );
});

app.get("/about", (req, res) => {
  res.render('about',{title:'ABOUT'})
});

//blog routrs
app.use('/blogs',blogRoutes)
///

app.get("/create", (req, res) => {
  res.render("create", { title: "CREATE" });
});


// any redirects
// app.get( '/url',(req,res)=>{
//     res.redirect('/url');
// })

// 404 page
app.use((req,res)=>{
    res.status(404).render('404.ejs',{title:'404'});

});
 