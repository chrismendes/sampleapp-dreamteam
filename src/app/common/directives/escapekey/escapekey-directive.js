/* global angular */

(function() {

  'use strict';

  function escapeKey() {

    var ESCAPE_KEY = 27;

    return function(scope, elem, attrs) {
      elem.bind('keydown', function(event) {
        if(event.keyCode === ESCAPE_KEY) {
          scope.$apply(attrs.escapeKey);
        }
      });
    };

  };

  angular.module('dreamteam.common').directive('escapeKey', escapeKey);

})();