const express = require('express');
const app = express();
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');


//connect to mongoDB
const dbURI = 'mongodb+srv://sonakshi:abcd1234@bloggingcluster.6s6vcvv.mongodb.net/bloggingSite?retryWrites=true&w=majority';
mongoose.connect(dbURI)
.then(() => {
    console.log('connected to database');
    app.listen(3000);
}).catch((err) => {
    console.log(err);
})

//register view engine

app.set('view engine','ejs'); //ejs - embedded javascript templates

app.use(express.static('public')); //middleware to serve static CSS files
app.use(express.urlencoded({extended: true}));

app.use(blogRoutes); //middleware

//404 error
app.use((req,res)=>{
    res.status(400).render('404.ejs',  {title:'404'});
})