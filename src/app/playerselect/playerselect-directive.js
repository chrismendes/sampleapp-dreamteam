/* global angular */

(function() {

  'use strict';

  function players(PlayerSelectionService) {

    var controller = function() {

      this.togglePlayer = PlayerSelectionService.togglePlayer;
      this.markPlayerSelected = PlayerSelectionService.playerIsSelected;
      
      this.markPlayerUnselected = function(player) {
        var selected = PlayerSelectionService.playerIsSelected(player);
        if(selected) {
          return false;
        }
        var quotaMet = PlayerSelectionService.playerQuotaIsMet(player.position);
        var quotaExceeded = PlayerSelectionService.playerQuotaIsExceeded(player.position);

        return (quotaMet | quotaExceeded) ? true : false;
      };

      this.markPlayerSelectedFull = function(player) {
        var selected = PlayerSelectionService.playerIsSelected(player);
        if(!selected) {
          return false;
        }
        return PlayerSelectionService.playerQuotaIsMet(player.position);
      };

      this.markPlayerError = function(player) {
        var selected = PlayerSelectionService.playerIsSelected(player);
        if(!selected) {
          return false;
        }
        return PlayerSelectionService.playerQuotaIsExceeded(player.position);
      };

      this.getSelectedCount = function() {
        return PlayerSelectionService.getSelectedCount(this.position);
      };
      this.getPositionQuota = function() {
        return PlayerSelectionService.getPlayerQuota(this.position);
      };

      this.resetSelection = function(position) {
        PlayerSelectionService.resetSelection(position);
      };

      this.sortOrder = 'club'; // Default
      this.setSortOrder = function(order) {
        this.sortOrder = order;
      };

    };

    return {
      restrict: 'E',
      templateUrl: 'app/playerselect/playerselect-view.html',
      scope: {
        position: '@',
        players: '='
      },
      controller: controller,
      controllerAs: 'playersCtrl',
      bindToController: true
    };
  };


  angular.module('dreamteam.common').directive('players', players);

})();