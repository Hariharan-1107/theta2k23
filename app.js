import express from 'express';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import mongoose from 'mongoose';
import User from './model/account.js';
import { Console, log } from 'console';

//Db section
      mongoose.connect("mongodb+srv://hariharan:hariharan11@cluster0.yctk4yu.mongodb.net/?retryWrites=true&w=majority");


const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.set('view engine', 'ejs');

app.get("/sign",function(req,res)
{
  res.sendFile(__dirname+ "/signin.html");
})
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/login.html");
});

app.get("/home", (req, res) => {
  res.render('main');
});

app.get("/about", (req, res) => {
  res.render('about');
});

app.get("/clusters", (req, res) => {
  res.render('clusters');
});

app.get("/contact", (req, res) => {
  res.render('contact');
});

app.get("/Robotics", (req, res) => {
  res.sendFile(__dirname + "/Robotics/Robotics.html");
});

app.post("/login", async (req, res) => {
    const p=req.body.password;
    const cp=req.body.cpassword;
    const u=req.body.username;
    const user = await User.create({
      username:u,
      password:p,
    });
    res.redirect("/")
});
app.post("/home",async(req,res) =>
{
    const u=req.body.username;
    const p=req.body.password;
    const user=await User.exists({username:u},{password:p});
    if(user)
    {
      res.redirect("/home");
    }
    else
    {
      res.redirect("/")
    }
})
app.listen(process.env.PORT || 8080, () => { 
    console.log("Server Started");
});
