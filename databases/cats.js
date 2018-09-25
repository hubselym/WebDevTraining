var mongoose = require("mongoose");
//connect to a database
mongoose.connect("mongodb://localhost/cat_app");


//define what a cat looks like
var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

//take Schema (pattern) and compiled it into a model called Cat. Cat can now be used to add remove etc.
var Cat = mongoose.model("Cat", catSchema);

//create a cat for the database
// var george = new Cat({
//     name: "Mrs. Norris",
//     age: 7,
//     temperament: "Evil"
// });
// //adding a new cat to the DB
// george.save(function(err, cat){
//     //given a function to make sure the data was saved to the DB
//     if(err){
//         console.log("Something went wrong!?");
//     } else {
//         console.log("We just saved a cat to the DB");
//         console.log(cat);
//     }
// });

//Create command is like New + .save all in one!
Cat.create({
   name: "Snow White",
   age: 15,
   temperament: "Bland"
}, function(err, cat){
    if(err){
        console.log(err);
    } else {
        console.log(cat);
    }
});

//Retrieve all cats from the DB and console.log each one

Cat.find({}, function(err, cats){
    if(err){
        console.log("OH NO, error...");
        console.log(err);
    } else {
        console.log("All the cats...");
        console.log(cats);
    }
});