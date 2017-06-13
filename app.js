const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const projectRouter = require('./routers/project');

var app = express();

mongoose.connect(config.get('mongoDatabase'));

if (!process.env.HOST_ON_IIS)
    process.env.PORT = config.get('port');

app.use(express.static(__dirname + '/publicUmpas/dist'));

app.use('/api/projects', projectRouter);

app.get('*', function(req, res, next) {
    res.sendFile('index.html', {root: './publicUmpas/dist'});
});

app.listen(process.env.PORT, function() {
    console.log('start listening');
});
