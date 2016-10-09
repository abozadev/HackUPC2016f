var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reviewSchema = new Schema({
  id:  Schema.Types.ObjectId,
  idCity: Number,
  opinion: String,
  stars: Number,
  date: Date
});

module.exports = mongoose.model('Reviews', reviewSchema);
