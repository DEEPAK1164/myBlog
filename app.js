//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const homeStartingContent = "Welcome to my personal blog! Here, I share my thoughts, experiences,Tech and non Tech Knowledge and ideas for personal and Nation's growth. Join me on a journey of self-discovery and creativity as we inspire and uplift each other. Thank you for visiting!";
const aboutContent = "Welcome to my personal blog! My name is DEEPAK MAURYA and I'm so glad you found your way here. I've always been interested in personal growth, wellness, and creativity. Over the years, I've learned a lot about what makes me happy, healthy, and fulfilled. And I've also faced my fair share of challenges and setbacks. This blog is my way of sharing my journey with others. It's a place where I can document my own experiences and hopefully inspire others along the way. My hope is that this blog will be a space for us to connect, learn, and grow together. A little more about me: I'm a WEB DEVELOPER and A PROGRAMMER by day, but outside of work, I'm passionate about Playing Badminton and Travelling. I live in BALRAMPUR UTTAR PRADESH, which is where I was born and raised. When I'm not working or blogging, you can usually find me with my FAMILY and  FRIENDS. I believe that life is all about growth and self-discovery. And I'm excited to share my journey with you through this blog. Thank you for taking the time to learn a little more about me. I hope you find something here that resonates with you.";
const contactContent = "Thank you for visiting my personal blog. If you have any questions, comments, or just want to say hi, I'd love to hear from you!. You can reach me by email at 2001dkmaurya@gmail.com. I try my best to respond to all emails within two hours, but please keep in mind that I may not be able to get back to you right away. You can also connect with me on my insta @DEEPAK_MAURYA1064, where I share updates on my latest blog posts, as well as other thoughts and musings. I value your feedback and appreciate any suggestions you may have for future blog posts. I also welcome any collaborations or partnerships that align with the values and mission of my blog. Thank you again for your interest in my blog. I look forward to hearing from you soon.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.set('strictQuery', false);
mongoose.connect("mongodb://localhost:27017/blogDB",{useNewUrlParser:true,
useUnifiedTopology:true})
.then(()=>console.log("connection successful.."))
.catch((err)=>console.log(err));

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res){

  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });


  post.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });
});

app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
