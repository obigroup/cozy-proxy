// Generated by CoffeeScript 1.7.1
var Device, americano, cache, logger;

americano = require('americano-cozy');

logger = require('printit')({
  date: false,
  prefix: 'models:device'
});

module.exports = Device = americano.getModel('Device', {
  login: String,
  password: String,
  configuration: Object
});

cache = {};

Device.update = function(callback) {
  return Device.request('all', function(err, devices) {
    var device, _i, _len;
    cache = {};
    if (err != null) {
      logger.error(err);
      return callback(err);
    } else {
      if (devices != null) {
        for (_i = 0, _len = devices.length; _i < _len; _i++) {
          device = devices[_i];
          cache[device.login] = device.password;
        }
      }
      if (callback != null) {
        return callback();
      }
    }
  });
};

Device.isAuthenticated = function(login, password, callback) {
  return (cache[login] != null) && cache[login] === password;
};
