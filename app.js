const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");

const app=express();

require("dotenv").config();

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

// const dbUrl= ;

mongoose .connect(process.env.mongoURL, { useNewUrlParser: true }) .then(() => console.log("MongoDB connected")) .catch((err) => console.log(err));

const signupSchema = {
  name: String,
  mobile: Number,
  email: String,
  passward: String
};

const Signup = mongoose.model("signup",signupSchema);


app.get("/",function(req,res){
  res.render("index");
});

app.get("/loginPage",function(req,res){
  res.render("loginPage");
});

app.get("/signup",function(req,res){
  res.render("signup");
})

app.get("/signupThanks",function(req,res){
  res.render("signupThanks");
})

app.get("/trust",function(req,res){
  res.render("trust");
})

app.get("/contact",function(req,res){
  res.render("contact");
})

app.get("/about",function(req,res){
  res.render("about");
})

app.get("/services",function(req,res){
  res.render("services");
})

app.get("/business",function(req,res){
  res.render("business");
})

// app.get("/loginPagePasswardAcces",function(req,res){
//   res.render("loginPagePasswardAcces");
// })


app.post("/loginPagePassward",function(req,res){
  const username=req.body.username;
  res.render("loginPagePassward",{valueofuser:username});
})

app.post("/loginPagePasswardAcces",function(req,res){
 const username=req.body.username;
 const passward=req.body.passward;
 var loginpersonn="Anonymous";

 Signup.find({mobile:username},function(err,data){

   data.forEach(function(ziya){
     if(ziya.passward==passward){
       loginpersonn=ziya.name;
      console.log("loginPagePasswardAcces"+ ziya.name);
     }

   })
   res.render("afterlogin",{ziya:"Welcome " + loginpersonn});

 })

})

app.post("/signup",function(req,res){

    const signup= new Signup({
    name: req.body.name,
    mobile: req.body.mobileNo,
    email: req.body.email,
    passward: req.body.passward
  });

  signup.save(function(err){
    if(!err){
      res.redirect("signupThanks");
    }
  });
});


app.post("/loginPage",function(req,res){

  const user= req.body.username;

  Signup.find({mobile : user},function(err,data){

    data.forEach(function(ziya){
      if(ziya.mobile==user)
      console.log("You Succes and NAme :" + ziya.name);
    })
  })
})


let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}



app.listen(port,function(){
  console.log("Server is Running");
})
