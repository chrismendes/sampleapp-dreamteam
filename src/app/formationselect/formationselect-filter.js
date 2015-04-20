/* global angular */

(function() {

  'use strict';

  function formationHyphenated() { // '442' -> '4-4-2'
    return function(fm) {
      if(!fm) {
        return;
      }
      var c = fm.split('');
      var r = '';
      for(var i = 0; i < c.length; i++) {
        r = r + c[i] + '-';
      }
      return r.substr(0, r.length-1);
    };
  };

  angular.module('dreamteam.common').filter('formationHyphenated', formationHyphenated);

})();