// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/************
 * DATABASE *
 ************/

var db = require('./models');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', function api_index(req, res) {
  // TODO: Document all your api endpoints below
  res.json({
    woops_i_has_forgot_to_document_all_my_endpoints: true, // CHANGE ME ;)
    message: "Welcome to my personal api! Here's what you need to know!",
    documentation_url: "https://github.com/MarkKleinfelder/express-personal-api/README.md", // CHANGE ME
    base_url: "https://enigmatic-dawn-10699.herokuapp.com/", // CHANGE ME
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Data about me"}, // CHANGE ME
      {method: "GET", path: "/api/pets/", description: "Find just one pet by NAME!"},
      {method: "POST", path: "/api/pets", description: "Add more pets!"}, // CHANGE ME
      {method: "PUT", path: "/api/pets", description: "Update pets here!"},
      {method: "DELETE", path: "/api/pets", description: "That's not my pet, DELETE (by name)!"}
    ]
  })
});

//INDEX
app.get('/api/profile', function (req,res){
  res.json({
    name: "Mark",
    human: true,
    github: "https://github.com/MarkKleinfelder",
    profile_image:"https://avatars3.githubusercontent.com/u/27730336?v=4&u=114faacadfb0312481daa040892580aa1eb7cabc&s=400",
    current_city: "Denver",
    family: [{name: "David", relationship:"Brother", occupation: 'Police Officer'}, {name: "Steven", relationship: "Brother", occupation: "USMC"}]
  })
})

//THIS IS GET (SHOW)!
app.get('/api/pets', function(req,res){
  db.Pet.find(function(err, pets){
    if (err) { return console.log("index error: " + err); }
    res.json(pets);
  });
});

//THIS IS GET BY NAME!
app.get('/api/pets/:name', function(req,res){
  db.Pet.findOne({name: req.params.name}, function(err, pet){
    if(err){
      return console.log('No pets by that name!')
    }
    res.json(pet);
  })
});



//THIS IS POST (CREATE)!
app.post('/api/pets', function (req, res) {
  var newPet = db.Pet({
    name: req.body.name,
    type: req.body.type,
    friendly: req.body.friendly
})
  newPet.save(function (err,pet){
    if (err){
      return console.log("creation error: " + err);
    }
    res.json(newPet);
  })
});


//THIS IS PUT!
app.put('/api/pets/:name', function(req,res){
    db.Pet.update({name:req.params.name}, req.body, function(err,updates){
      if(err){
        console.log("PUT error : " + err);
      }else{
        res.json(updates);
      }
   });
});


//THIS IS DELETE
app.delete('/api/pets/:name',function(req,res){
  db.Pet.findOneAndRemove({name:req.params.name}, function(err,deleted){
    if (err){
      console.log("Delete error : " + err)
    }else{
      res.json(deleted);
    };
  });
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
