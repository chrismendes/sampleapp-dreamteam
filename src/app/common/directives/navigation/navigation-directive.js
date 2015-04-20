/* global angular */

(function() {

  'use strict';

  function navigationTabs() {
    return {
      restrict: 'E',
      templateUrl: 'app/common/directives/navigation/navigation-view.html'
    };
  };


  angular.module('dreamteam.common').directive('navigationTabs', navigationTabs);

})();