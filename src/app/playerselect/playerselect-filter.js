/* global angular */

(function() {

  'use strict';

  function playerGroupUnabbreviated() { // 'def' => 'Defenders'
    return function(g) {
      switch(g) {
        case 'gk':  return 'Goalkeeper';
        case 'def': return 'Defender';
        case 'mid': return 'Midfielder';
        case 'fwd': return 'Forward';
      }
    };
  };

  angular.module('dreamteam.common').filter('playerGroupUnabbreviated', playerGroupUnabbreviated);

})();