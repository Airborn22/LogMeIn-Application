/*jslint node: true, indent: 2 */
'use strict';

/**
 * Manager for the available occupations
 *
 * @constructor
 */
var OccupationManager = function() {
  this.data = [
    'Application analyst',
    'Computer operator',
    'Computer repair technician',
    'Computer scientist',
    'Computer analyst',
    'Data entry clerk',
    'Database administrator',
    'Data analyst',
    'Data scientist',
    'Network analyst',
    'Network administrator',
    'Programmer',
    'Security engineer'
  ];
};

/**
 * Search this.data values starting with a specified text
 * Case insensitive
 *
 * @param text
 * @returns {Array}
 */
OccupationManager.prototype.find = function(text) {
  // Set default value of text to empty string
  text = text || '';

  var results = [];
  for (var i = 0; i < this.data.length; i++) {
    if (this.data[i].toString().toLowerCase().indexOf(text.toString().toLowerCase()) == 0) {
      results.push(this.data[i]);
    }
  }
  return results;
};

module.exports = OccupationManager;
