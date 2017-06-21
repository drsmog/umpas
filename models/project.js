const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Promise = require('bluebird');

Promise.config({
  warnings: false
});

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
  },
  umBaseUrl: {
    type: String,
    default: '/um'
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
  .get(function() {
    return this._id;
  })
  .set(function(value) {
    this._id = value;
  });

ProjectSchema.virtual('umFullUrl')
  .get(function() {
    return this.url + formatBaseUrl(this.umBaseUrl);
  });

function formatBaseUrl(baseUrl) {
  let result = baseUrl;

  if (result[0] !== '/') result = '/' + result;

  if (result[result.length - 1] === '/') result = result.slice(0, result.length -
    1);

  return result;
}

module.exports = mongoose.model('Project', ProjectSchema);
