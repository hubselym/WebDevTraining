 //Standard Setup Lines

 //App Config
 var bodyParser      = require("body-parser"),
    expressSanitizer = require("express-sanitizer"),
    methodOverride   = require("method-override"),
    mongoose         = require("mongoose"),
    express          = require("express"),
    app              = express();

 mongoose.connect("mongodb://localhost/restful_blog_app");
 app.set("view engine", "ejs");
 app.use(express.static("public"));
 app.use(bodyParser.urlencoded({extended: true}));
 app.use(expressSanitizer()); //Must go after bodyParser
 app.use(methodOverride("_method"));
 
 //Mongoose/Model Config
 var blogSchema = new mongoose.Schema({
     title: String,
     image: String,
     body: String,
     //default value for the date type
     created: {type: Date, default: Date.now}
 });
 var Blog = mongoose.model("Blog", blogSchema);
 //End standard Setup Lines
 
//  Blog.create({
//      title: "Test Blog",
//      image: "https://images.unsplash.com/photo-1536557365707-379e0a3083f8?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=31ab31521f4e5d3d3cc4e05c56562474&auto=format&fit=crop&w=701&q=80",
//      body: "Hello this is a BLOG POST"
//  });
 
 
 //RESTful Routes--------------
 app.get("/", function(req, res){
     res.redirect("/blogs");
 });
 
 //Index Route
 app.get("/blogs", function(req, res){
     Blog.find({}, function(err, blogs){
         if(err){
             console.log("ERROR");
         } else {
             res.render("index", {blogs: blogs});
         }
     });
 });

//NEW Route
app.get("/blogs/new", function(req, res){
    res.render("new");
});

//CREATE Route
app.post("/blogs", function(req, res){
    //Create blog
    console.log(req.body);
    req.body.blog.body = req.sanitize(req.body.blog.body)
    console.log("================");
    console.log(req.body);
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            res.render("new");
        } else {
            //then redirect to the index
            res.redirect("/blogs");
        }
    });
});
//SHOW Route
app.get("/blogs/:id", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        } else {
            res.render("show", {blog: foundBlog});
        }
    })
});
//EDIT Route
app.get("/blogs/:id/edit", function(req, res) {
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/edit");
        } else {
            res.render("edit", {blog: foundBlog});
        }
    })
})
//UPDATE Route
app.put("/blogs/:id", function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body)
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs/" + req.params.id);
        }
    });
});
//DELETE Route
app.delete("/blogs/:id", function(req, res){
    //destroy Blog
    Blog.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/blogs")
        } else {
            //Redirect somewhere
            res.redirect("/blogs")
        }
    })
    
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is running!");
})