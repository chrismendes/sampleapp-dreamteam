/* global angular */

(function() {

  'use strict';

  angular.module('dreamteam.common')

  .filter('lowercaseHyphens', function() { // 'My picture file' -> 'my-picture-file'
    return function(str) {
      if(typeof str === 'undefined') {
        return;
      }
      return str.replace(/\s+/g, '-').toLowerCase();
    };
  });

})();