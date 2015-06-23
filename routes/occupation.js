/*jslint node: true, indent: 2 */
'use strict';

module.exports = function(server) {
  server.get('/occupation/', function (req, res, next) {
    res.send({a:'b'});
    next();
  });

  server.get('/occupation/:param', function (req, res, next) {
    res.send({a:'b'});
    next();
  });
};
