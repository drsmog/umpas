const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const projectRouter = require('./routers/project');
const userRouter = require('./routers/user');
const rolesRouter = require('./routers/role');

var app = express();

mongoose.connect(config.get('mongoDatabase'));

if (!process.env.HOST_ON_IIS)
    process.env.PORT = config.get('port');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(__dirname + '/publicUmpas/dist'));

app.use('/api/projects', projectRouter);
app.use(userRouter.baseUrl, userRouter.router);
app.use(rolesRouter.baseUrl, rolesRouter.router);

app.get('*', function(req, res, next) {
    res.sendFile('index.html', {root: './publicUmpas/dist'});
});

app.listen(process.env.PORT, function() {
  console.log('start listening');
});

module.exports = app;
