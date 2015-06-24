/*jslint node: true, indent: 2 */
'use strict';
var restify, bunyan, routes, namespace, validator, log, server;

restify   = require('restify');
bunyan    = require('bunyan');
routes    = require('./routes/');
namespace = require('restify-namespace');
validator = require('restify-validator');

log = bunyan.createLogger({
  name        : 'app',
  level       : process.env.LOG_LEVEL || 'info',
  stream      : process.stdout,
  serializers : bunyan.stdSerializers
});

server = restify.createServer({
  name : 'app',
  log  : log,
  formatters : {
    'application/json' : function (req, res, body) {
      res.setHeader('Cache-Control', 'must-revalidate');

      // Does the client *explicitly* accepts application/json?
      var acceptHeader = req.header('Accept');
      var sendPlainText = (typeof acceptHeader === 'undefined' || acceptHeader.split(/, */).indexOf('application/json') === -1);

      // Send as plain text
      if (sendPlainText) {
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      }

      // Send as JSON
      if (!sendPlainText) {
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
      }
      return JSON.stringify(body);
    }
  }
});

server.use(restify.bodyParser({ mapParams: true }));
server.use(restify.queryParser());
server.use(restify.gzipResponse());
server.pre(restify.pre.sanitizePath());
server.use(validator);
server.use(restify.CORS());
server.use(restify.fullResponse());

server.on('after', restify.auditLogger({ log: log }));

// Set /v1 prefix for the routes
namespace(server, '/v1', function() {
  routes(server);
});

console.log('Server started.');
server.listen(8888, function () {
  log.info('%s listening at %s', server.name, server.url);
});
