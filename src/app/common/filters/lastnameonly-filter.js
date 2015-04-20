/* global angular */

(function() {

  'use strict';

  angular.module('dreamteam.common')

  .filter('lastNameOnly', function() { // 'David Silva' -> 'Silva', 'David de Gea' -> 'de Gea'
    return function(str) {
      if(typeof str === 'undefined') {
        return;
      }
      var separated = str.split(' ');
      var lastName = '';
      if(separated.length > 1) {
        for(var i = 0; i < separated.length; i++) {
          if(i > 0) {
            lastName = lastName + ' ' + separated[i];
          }
        }
      } else {
        lastName = separated[0];
      }
      return lastName.trim();
    };
  });

})();