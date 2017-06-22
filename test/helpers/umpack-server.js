const express = require('express');
const config = require('config');
const bodyParser = require('body-parser');
const umpack = require('umpack-express')(config.get('umpackServer.umpack'));

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('/um', umpack.router);


app.listen(config.get('umpackServer.port'), function() {
    // console.log('umpack start listening');
});


module.exports = app;
