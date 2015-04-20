/* global angular, _ */

(function() {

  'use strict';

  function formationselect(PlayerSelectionService) {

    var controller = function() {

      this.formations = [
        '442',
        '451',
        '352'
      ];      

      this.currentFormation = PlayerSelectionService.getFormation();
      var i = _.indexOf(this.formations, this.currentFormation);

      if(this.currentFormation === null) {
        this.currentFormation = '442'; // Default
        i = 0;
        PlayerSelectionService.setFormation(this.currentFormation);
      }

      this.changeFormation = function() {
        i++;
        i = (i > this.formations.length-1) ? 0 : i;
        this.currentFormation = this.formations[i];
        PlayerSelectionService.setFormation(this.currentFormation);
      };

    };

    return {
      restrict: 'E',
      templateUrl: 'app/formationselect/formationselect-view.html',
      controller: controller,
      controllerAs: 'formationCtrl',
      scope: {
        compactVersion: '@compact',
        btnLabel: '@'
      },
      bindToController: true
    };
  };


  angular.module('dreamteam.common').directive('formationselect', formationselect);

})();