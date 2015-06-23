/*jslint node: true, indent: 2 */
'use strict';
var util = require('util');

var handler = function(req, res, next) {
  req.assert('name', 'Name field is required').notEmpty();

  var errors = req.validationErrors();
  if (errors) {
    res.send(500, {
      success: false,
      errors: errors
    });
    return next();
  }

  res.send({
    success: true,
    message: "Thank you for your submission!"
  });

  next();
};

module.exports = function(server) {
  server.post('/submission/', handler);
};
