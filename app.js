const express = require('express');
const projectRouter = require('./routers/project');
const config = require('config');

var app = express();

if (!process.env.HOST_ON_IIS)
    process.env.PORT = config.get('port');

app.use(express.static(__dirname + '/publicUmpas/dist'));

app.use('/api/projects', projectRouter);

app.get('*', function(req, res, next) {
    res.sendfile('index.html');
});

app.listen(process.env.PORT, function() {
    console.log('start listening');
});
