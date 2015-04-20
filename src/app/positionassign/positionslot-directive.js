/* global angular */

(function() {

  'use strict';

  function positionSlot(PositionAssignmentService) {

    var controller = function() {

      var ctrl = this;

      ctrl.playerDroppedIn = function(e) {
        var playerName = e.originalEvent.dataTransfer.getData('Text');
        var onPitchMove = (e.originalEvent.dataTransfer.effectAllowed === 'link') ? true : false;
        var swap = (ctrl.player && onPitchMove) ? true : false;
        if(playerName) {
          ctrl.player = PositionAssignmentService.assignPlayer(ctrl.positionId, playerName, onPitchMove);
          if(swap) {
            $(document).trigger('playerSwap');
          }
        }
      };
      ctrl.markSlotOccupied = function() {
        return PositionAssignmentService.positionIsOccupied(ctrl.positionId);
      };

      ctrl.update = function() {
        ctrl.player = PositionAssignmentService.getPlayerByPosition(ctrl.positionId);
      };

      var _init = function() {
        var occupant = PositionAssignmentService.getPlayerByPosition(ctrl.positionId);
        if(occupant) {
          ctrl.player = occupant;
        }
      };
      _init();

    };

    var link = function(scope, element, attrs, ctrl) {
      $(element).on('drop', function(e) {
        scope.$apply(ctrl.playerDroppedIn(e));
      });
      $(document).on('playerSwap', function() {
        scope.$apply(ctrl.update());
      });
    };

    return {
      restrict: 'E',
      controller: controller,
      controllerAs: 'positionslotCtrl',
      link: link,
      templateUrl: 'app/positionassign/positionslot-view.html',
      scope: {
        positionId: '@'
      },
      bindToController: true
    };

  }

  angular.module('dreamteam').directive('positionSlot', positionSlot);

})();