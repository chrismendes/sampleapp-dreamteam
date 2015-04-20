/* global angular */

(function() {

  'use strict';

  function playerListItem(PositionAssignmentService) {

    var controller = function() {

      this.markPlayerAssigned = function() {
        var positionID = PositionAssignmentService.playerIsOnPitch(this.player.name);
        return (positionID !== false) ? true : false;
      };

    };

    return {
      restrict: 'E',
      controller: controller,
      controllerAs: 'playerListItemCtrl',
      templateUrl: 'app/positionassign/playerlistitem-view.html',
      scope: {
        player: '='
      },
      bindToController: true
    };

  }

  angular.module('dreamteam').directive('playerListItem', playerListItem);

})();