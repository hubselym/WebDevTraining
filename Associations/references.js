var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo_2");


var Post = require("./models/post");
var User = require("./models/user");



// Creating a post and associating it by id to a user array
Post.create({
    title: "How to Cook the Best Burger Part 4",
    content: "Use your feet and hands and FACE and Soul"
}, function(err, post){
    User.findOne({email: "bob@gmail.com"}, function(err, foundUser){
        if(err){
            console.log(err)
            } else {
                foundUser.posts.push(post)
                foundUser.save(function(err, data){
                    if(err){
                        console.log(err);
                    } else {
                        console.log(data);
                    }
                })
            }
        });
    }
);


//Find User
//Chaining populate posts (which populates "posts" by looking at all info related to the id in posts)
// .exec starts the query
// User.findOne({email: "bob@gmail.com"}).populate("posts").exec(function(err, user){
//     if(err){
//         console.log(err);
//     } else{
//         console.log(user);
//     }
// });
// Find all posts for that user



// User.create({
//     email: "bob@gmail.com",
//     name: "Bob Belcher"
// });

