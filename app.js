const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const app = express();
const port = 800;
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});

//define the mongoose schema 
const contactchema = new mongoose.Schema({
    name: String,
    email:String,
    phone:String,   
    Address:String, 
    more:String
  });

//here compile our schema into model
const Contact = mongoose.model('contact', contactchema);

//here for serving the static files 
app.use('/static' , express.static('static'))
app.use(express.urlencoded())


app.set('views',path.join(__dirname , 'views'))
app.set('view engine' , 'pug')

app.get('/', function(req , res){
    res.render('home.pug');
})
app.get('/contact',function(req , res){
    res.render('contact.pug');
})
// app.get('/about',function(req, res){
//     res.send('About page will display soon.');
// })


app.post('/contact' , function(req ,res){
    var myData = new  Contact(req.body);
    myData.save().then(() => {
        res.send('This items has been saved in database.');
    }).catch(() => {
        res.status(400).send('Item was not stored into the database.');
    });

    // res.status(200).render('contact.pug');
})
//here server is listening
app.listen(port , function(){
    console.log(`Your application is successfully running on ${port} number..`);
})