  var express = require("express")
  var bodyParser = require("body-parser")
  var mongoose = require("mongoose")
  const path = require('path');
  
  const app = express()
  const ejs = require('ejs')
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');
  //swap jade for ejs etc
  app.use(bodyParser.json())
  app.use(express.static('public'))
  app.use(bodyParser.urlencoded({
     extended:true
  }))

  mongoose.connect('mongodb://localhost:27017/mydb',{
     useNewUrlParser:true,
     useUnifiedTopology:true
  });
  var db=mongoose.connection;
  db.on('error',()=>console.log("error in connection"))
  db.once('open ',()=>console.log("connected"))
  app.post('/signup',(req,res)=>{
     var name = req.body.name;
     var query = req.body.query;
     var email= req.body.email;
     var data ={
          "name":name,
          "query":query,
          "email":email,
     }
     db.collection('details').insertOne(data,(err,collection)=>{
          if(err){
               throw err;
          }
          console.log("Record inserted");
     }
     );
     return res.redirect("home.html")
  })
  app.get("/",(req,res)=>{
       
       res.set
       ({

          "Allow-acces-allow-originn":'*'
       })
       return res.redirect("home.html");

  }).listen(3000);

  console.log("Listening from 3000");

const chSchema = {
     name: String,
     email: String,
     date: String,
     total: String
}
const mm=mongoose.model('mm',chSchema)
var db=mongoose.connection;
db.on('error',()=>console.log("error in connection"))
db.once('open ',()=>console.log("connected"))
app.post('/bookin', 


(req,res)=>{
   var name = req.body.name;
   var email= req.body.email;
   var d = req.body.date;
   const date = require('date-and-time')
  
  const value = date.format((new Date(d)),
  'MM/DD/YYYY');
    total = req.body.total;
   
   var data ={
        "name":name,
        "email":email,
        "date":value,
        "total":total,
   }
   

   db.collection('booking').insertOne(data,(err,collection)=>{
        if(err){
             throw err;
        }
        console.log("Record inserted");
   }
   );
  
   db.collection("booking").find({}).toArray(function(err, result){
     res.render('checkout',{temp : result});
 });    
     
    })
    
    app.post('/paye',(req,res)=>{
     var name = req.body.firstname;
     var numb = req.body.numb;
     var data ={
          "name":name,
          "number ":numb,
          
     }
   
     db.collection('payment').insertOne(data,(err,collection)=>{
          if(err){
               throw err;
          }
          console.log("Record inserted");
     }
     );
     return res.redirect("home.html")
  })   
     
    
    
    
    
    


