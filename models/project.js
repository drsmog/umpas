const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Promise = require('bluebird');

Promise.config({warnings: false});

mongoose.Promise = Promise;

const ProjectSchema = new Schema({
  name: String,
  description: String,
  url: String
});



module.exports = mongoose.model('Project', ProjectSchema);
