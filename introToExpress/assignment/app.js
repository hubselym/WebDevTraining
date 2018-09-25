var express = require("express");
var app = express();

// Visiting "/" should print "Hi there, welcome to my assignment!"
app.get("/", function(req, res){
    res.send("Hi there, welcome to my assignment!");
})
// ===================================================================
app.get("/speak/:animal", function(req, res){
    var call = "";
    //better way with objeect
    var sounds = {
        pig: "Oink",
        cow: "Moo",
        dog: "Woof Woof",
        cat: "I hate you human",
        goldfish: "...",
    };
    var ani = req.params.animal.toLowerCase();
    var sound = sounds[ani];
    
//     if(ani === "pig"){
// // Visiting "/speak/pig" should print "The pig says 'Oink'"
//         call = 'Oink';
//     }else if(ani === "cow"){
// // Visiting "/speak/cow" should print "The cow says 'Moo'"
//         call = 'Moo';
//     }else if(ani === "dog"){
// // Visiting "/speak/dog" should print "The dog says 'Woof Woof'"
//         call = 'Woof Woof';
//     } else{
//         res.send("Sorry, page not found...What are you doing with your life?");
//     }
    //refactored
    res.send("The " + ani + " says `" + sound + "'");
    // res.send("The " + ani + " says '" + call +"'");
});
// ===================================================================
// Visiting "/repeat/hello/3" should print "hello hello hello"
// Visiting "/repeat/hello/5" should print "hello hello hello hello hello"
// Visiting "/repeat/blah/2" should print "blah blah"
app.get("/repeat/:word/:times", function(req, res){
    var word = req.params.word;
    var num = Number(req.params.times);
    var allWords = [];
    for(var i = 0; i < num; i++){
        allWords+=word +" ";
    }
    res.send(allWords);
});
// If a user visits any other route, print:
// "Sorry, page not found...What are you doing with your life?"
app.get("*", function(req, res) {
    res.send("Sorry, page not found...What are you doing with your life?");
});
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server has started!!!");
});