/* global angular */

(function() {

  'use strict';

  function AssignPositionsCtrl(PlayerSelectionService, PositionAssignmentService) {

    // Fetch user selected players
    this.userTeam = PlayerSelectionService.userTeam;

    // Prepare moderating service
    PositionAssignmentService.loadPlayers(this.userTeam.players);

    // Provide user progress for all components (e.g. error/complete messages, continue button, etc.)
    this.userTeam.status = PositionAssignmentService.status;

  };

  angular.module('dreamteam').controller('AssignPositionsCtrl', AssignPositionsCtrl);

})();