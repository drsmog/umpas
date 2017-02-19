const log4js = require('log4js');
const fs = require('fs');
const path = require('path');

let logDir = path.join( __dirname, '../logs');

if(!fs.existsSync(logDir)){
  fs.mkdirSync(logDir);
  console.log('file should now exist');
}



log4js.configure({
    appenders: [{
            type: 'console'
        },
        {
            type: 'file',
            filename: 'logs/app.log',
            category: 'app'
        }
    ],
    replaceConsole: true
});


module.exports = {
    getLogger: function(category) {
        return log4js.getLogger(category);

    }
};
