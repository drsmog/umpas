const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  name: String,
  description: String,
  url: String
});



module.exports = mongoose.model('Project', ProjectSchema);
