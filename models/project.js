const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Promise = require('bluebird');

Promise.config({warnings: false});

mongoose.Promise = Promise;

const ProjectSchema = new Schema({
  name: String,
  description: String,
  url: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
});

ProjectSchema.virtual('id')
  .get(function () {
    return this._id;
  })
  .set(function (value) {
    this._id = value;
  });

module.exports = mongoose.model('Project', ProjectSchema);
