var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PetSchema = new Schema({
	name: String,
	type: String,
	friendly: Boolean

});

var Pet = mongoose.model('Pet',PetSchema);

module.exports = Pet;