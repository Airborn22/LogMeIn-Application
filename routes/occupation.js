/*jslint node: true, indent: 2 */
'use strict';
var OccupationManager = require('../manager/occupation.js');

var handler = function(req, res, next) {
  var occupationManager = new OccupationManager();
  res.send(occupationManager.find(req.params.text));
  next();
};

module.exports = function(server) {
  server.get('/occupation/', handler);
  server.get('/occupation/:text', handler);
};
