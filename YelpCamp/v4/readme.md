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
