const Project = require('../models/project');

const Repository = require('./reposiotry');

const repo = new Repository(Project, []);

return repo;
