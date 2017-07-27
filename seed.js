//This file allows us to seed our application with data
//simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

// var new_campsite = {description: "Sharp rocks. Middle of nowhere."}

// db.Campsite.create(new_campsite, function(err, campsite){
//   if (err){
//     return console.log("Error:", err);
//   }

//   console.log("Created new campsite", campsite._id)
var pet_list = [
  {
  name: "Tock",
  type: "Dog",
  friendly: false
  },
  {
  name: "Trudie",
  type: "Dog",
  friendly: true
  }
];

db.Pet.remove({}, function(err, pets){
  if(err) {
    console.log('Error occurred in remove', err);
  } else {
    console.log('removed all pets');

    // create new records based on the array books_list
    db.Pet.create(pet_list, function(err, pets){
      if (err) { return console.log('err', err); }
      console.log("created", pets.length, "pets");
      process.exit();
    });
  }
});

  //process.exit(); // we're all done! Exit the program.
//})
