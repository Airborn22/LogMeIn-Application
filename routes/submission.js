/*jslint node: true, indent: 2 */
'use strict';
var OccupationManager = require('../manager/occupation.js');

var handler = function(req, res, next) {
  req.assert('name', 'Name field is required').notEmpty();
  req.assert('email', 'Email field is required').notEmpty();
  req.assert('email', 'Email field is required').isEmail();

  // Check if occupation is valid if it's set
  if (typeof req.params.occupation !== 'undefined' && req.params.occupation.length > 0) {
    var occupationManager = new OccupationManager();
    req.assert('occupation', 'Occupation not valid').isIn(occupationManager.find(req.params.occupation));
  }

  // Check if age is over 18
  var eighteenYearsAgo = new Date();
  eighteenYearsAgo.setYear(eighteenYearsAgo.getYear()-18);
  req.assert('birthday', 'You must be over 18').isDate().isBefore(eighteenYearsAgo);

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
