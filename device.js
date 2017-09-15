const os = require('os');
const _ = require('lodash');
const crypto = require('crypto');
const config = require('config');

const device = {
  cpus: os.cpus().map(function(cpu) {
    return _.pick(cpu, ['model', 'speed']);
  }),
  arch: os.arch(),
  hostname: os.hostname(),
  network: os.networkInterfaces().eth0,
  platform: os.platform(),
  osType: os.type()
};

const deviceToken = crypto.createHmac('sha256', config.get('deviceSecret'))
  .update(JSON.stringify(device))
  .digest('hex');

module.exports = {
  device: device,
  deviceToken: deviceToken
};
