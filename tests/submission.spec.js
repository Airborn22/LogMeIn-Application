/*jslint node: true, indent: 2 */
/*global describe, it, before, beforeEach, after, afterEach, fail */
'use strict';
var superagent = require('superagent');
var expect = require('expect.js');

/**
 * Test for the form submission
 */
describe('Form Submission Test', function(){
  // Test the form submission with valid data
  it('Valid form submission', function(done){
    superagent.post('http://localhost:8888/v1/submission/').accept('application/json').type('form')
      .send({
        name: 'Sandor Major',
        email: 'airborn22@gmail.com',
        occupation: 'Programmer',
        birthday: '1989-03-22'
      })
      .end(function(error, response) {
        expect(error).to.eql(null);
        expect(response.body).to.be.an('object');
        expect(response.body.success).to.eql(true);

        done();
      });
  });

  // Test the form submission without name
  it('No name', function(done){
    superagent.post('http://localhost:8888/v1/submission/').accept('application/json').type('form')
      .send({
        email: 'airborn22@gmail.com',
        occupation: 'Programmer',
        birthday: '1989-03-22'
      })
      .end(function(error, response) {
        expect(error).not.to.eql(null);
        expect(error.status).to.eql(500);
        expect(response.body.success).to.eql(false);

        // Check if "name" field is in the errors array
        var errorLength = response.body.errors.length;
        var errorFields = [];
        for (var i = 0; i < errorLength; i++) {
          errorFields.push(response.body.errors[i].param);
        }
        if (errorFields.indexOf('name') === -1) fail("Name param should be in the error array");

        done();
      });
  });

  // Test the form submission with empty name
  it('Empty name', function(done){
    superagent.post('http://localhost:8888/v1/submission/').accept('application/json').type('form')
      .send({
        name: '',
        email: 'airborn22@gmail.com',
        occupation: 'Programmer',
        birthday: '1989-03-22'
      })
      .end(function(error, response) {
        expect(error).not.to.eql(null);
        expect(error.status).to.eql(500);
        expect(response.body.success).to.eql(false);

        // Check if "name" field is in the errors array
        var errorLength = response.body.errors.length;
        var errorFields = [];
        for (var i = 0; i < errorLength; i++) {
          errorFields.push(response.body.errors[i].param);
        }
        if (errorFields.indexOf('name') === -1) fail("Name param should be in the error array");

        done();
      });
  });

  // Test the form submission without email
  it('No email', function(done){
    superagent.post('http://localhost:8888/v1/submission/').accept('application/json').type('form')
      .send({
        name: 'Sandor Major',
        occupation: 'Programmer',
        birthday: '1989-03-22'
      })
      .end(function(error, response) {
        expect(error).not.to.eql(null);
        expect(error.status).to.eql(500);
        expect(response.body.success).to.eql(false);

        // Check if "email" field is in the errors array
        var errorLength = response.body.errors.length;
        var errorFields = [];
        for (var i = 0; i < errorLength; i++) {
          errorFields.push(response.body.errors[i].param);
        }
        if (errorFields.indexOf('email') === -1) fail("Email param should be in the error array");

        done();
      });
  });

  // Test the form submission with empty email
  it('Empty email', function(done){
    superagent.post('http://localhost:8888/v1/submission/').accept('application/json').type('form')
      .send({
        name: 'Sandor Major',
        email: '',
        occupation: 'Programmer',
        birthday: '1989-03-22'
      })
      .end(function(error, response) {
        expect(error).not.to.eql(null);
        expect(error.status).to.eql(500);
        expect(response.body.success).to.eql(false);

        // Check if "email" field is in the errors array
        var errorLength = response.body.errors.length;
        var errorFields = [];
        for (var i = 0; i < errorLength; i++) {
          errorFields.push(response.body.errors[i].param);
        }
        if (errorFields.indexOf('email') === -1) fail("Email param should be in the error array");

        done();
      });
  });
});
