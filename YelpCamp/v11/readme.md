###################### YelpCamp v1 #####################

* Add Landing Page
* Campgrounds Page that lists all campgrounds

Each Campground has:
* Name
* Image

it will be an array of object. each object will have a name and image url

[
    {name: "campground name", image: "image url"},
    {name: "campground name", image: "image url"},
    {name: "campground name", image: "image url"}
]

#Layout and Basic Styling
* Create our header and footer partials
* Add in Bootstrap

#Creating New Campgrounds

* Setup new campground POST route
* Add in body-parser
* Setup route to show form
* Add basic unstyled form


#More Styling
* Setup route to show form
* Add basic unstyled form

#Style the campgrounds page
* Add a better header/title
* Make campgrounds display in a grid


* Add in body-parser
* Set route to show formAdd basic unstyled form

#Style the campgrounds page
* Add a better header/title
* Make campgrounds display in a grid

#Style the Navbar and Form
* Add a navbar to all templates
* Style the new campground form

##################### YelpCamp v2 ##########################

#Style the campgrounds page
* Add a better header/title
* Make campgrounds display in a grid

#Style the Navbar and Form
* Add a navbar to all templates
* Style the new campground form

#Add Mongoose
* Install and configure mongoose
* Setup campground model
* Use campground model inside of our routes!

#Show Page
* Review the RESTful routes we've seen so far
* Add description to our campground model
* Show db.collection.drop()
* Add a show route/template
* 

RESTFUL Routes (7)

Name       url        Verb         Description
===================================================
INDEX    /dogs          GET    Display a list of all dogs
NEW      /dogs/new      GET    Display form to make a new dog
CREATE   /dogs          POST   Add new dog to DB
SHOW     /dogs/:id      GET    Shows info about one dog
EDIT     /dogs/:id/edit GET    Show edit form for one dog
UPDATE   /dogs/:id      PUT    Update a paritcular dog, then redirect somewhere
DESTROY  /dogs/:id      DELETE Delete a partuclar dog, then redirect somewhere


##################### YelpCamp v3 ##########################

#Refactor Mongoose Code
* Create a models directory
* Use module.exports
* Require everything correctly!


#Add Seeds File
* Add a seeds.js file
* Run the seeds file every time the server starts


#Add the Comment model!
* Make our errors go away!
* Display comments on campground show page


##################### YelpCamp v4 ##########################


#Comment New/Create
* Discuss nested routes
* Add the comment new and create routes
* Add the new comment form


##################### YelpCamp v5 ##########################

#Style Show Page
* Add sidebar to show page
* Display comments nicely

#Finish Styling Show Page
* Add public directory
* Add custom stylesheet

###################### YelpCamp v6 #####################
#Authentication Pt. 1 - Add User Model
* Install all packages needed for auth
* Define User model

#Authenication Pt. 2 - Register
* Configure Passport
* Add register routes 
* Add register template

#Authentication Pt. 3 - Login
* Add login routes
* Add login template

#Authenication Pt. 4 - Logout/Navbar
* Add Logout route
* Prevent user from adding a comment if not signed in 
* Add links to navbar

#Authenication Pt. 5 - Show/Hide Links
* Show/hide auth links in navbar correctly


###################### YelpCamp v7 #####################

#Refactor The Routes
* Use Express router to reorganize all routes


###################### YelpCamp v8 #####################

#Users + Comments
* Associate users and comments
* Save author's name to a comment automatically


###################### YelpCamp v9 #####################

#Users + Campgrounds
* Prevent an unauthenticated user from creating a campground
* Save username+id to newly created campground


###################### YelpCamp v10 #####################

#Editing Campgrounds
* Add Method-Override
* Add Edit Route for Campgrounds
* Add Link to Edit Page
* Add Update Route
* Fix $set Problem

#Deleting Campgrounds
* Add Destroy Route
* Add Delete button

#Authorization Part 1: Campgrounds
* User can only edit his/her campgrounds
* User can only delete his/her campgrounds
* Hide/Show edit and delete buttons

#Editing Comments
* Add Edit routes for comments
* Add Edit button
* Add Update Route

#Deleting Comments
* Add Destroy route
* Add Delete button

#Authorization Part 2: Comments
* User can only edit his/her comments
* User can only delete his/her comments
* Hide/Show edit and delete buttons
* Refactor Middleware


###################### YelpCamp v11 #####################

#Adding in Flash!
* Demo Working Version
* Install and configure connect-flash
* Add bootstrap alerts to header