const express=require('express');

const app =express()
const User = require("./model/models")
const newUser = require("./model/applymodel")
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

const port = process.env.port ||3000;

app.get('/',(req,res)=>{
    res.send('welcome to snv solutions')
})
mongoose.connect('mongodb://localhost:27017/snv',{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    family: 4,

})
.then(db => console.log('DB is connected'))
.catch(err => console.log(err));
app.use(bodyParser.urlencoded({ extended: false }))


app.use(bodyParser.json());
app.listen(port,()=>{
    console.log ('just i created sever')
})

app.post('/snv',(req,res,next)=>{
const newuser = new User({
    name:req.body.name,
    email:req.body.email,
    subject:req.body.subject,
    message:req.body.message

})
newuser.save()
.then(()=>{
 res.json({success:true,message:'MESSAGE SUCCESSFULLY'})
})
.catch((err)=>{
   
    res.json({success:false,message:'MESSEGE SENDING FAILED'})
   })
})

app.post('/app',(req,res,next)=>{
   const applyuser= new newUser({
    position:req.body.position,
    first_Name:req.body.first_Name,
    last_Name:req.body.last_Name,
    contry:req.body.contry,
    teliphone:req.body.teliphone,
    email:req.body.email,
    gender:req.body.gender,
    address:req.body.address,
    education:req.body.education
   })
   applyuser.save()
.then(()=>{
 res.json({success:true,message:'APPLICATION FORM APPLY SUCCESSFULLY'})
})
.catch((err)=>{
   
    res.json({success:false,message:'APPLICATION FORM SENDING FAILED'})
    })
})








