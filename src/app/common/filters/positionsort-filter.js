/* global angular */

(function() {

  'use strict';

  angular.module('dreamteam.common')

  .filter('sortByPosition', function() { // i.e. 'GK', 'DEF', 'MID', 'FWD'
    return function(players) {
      var sorted = [];
      var positions = ['gk', 'def', 'mid', 'fwd'];
      for(var i = 0; i < positions.length; i++) {
        sorted.push(_.filter(players, { position: positions[i] }));
      }
      return _.flatten(sorted);
    };
  });

})();