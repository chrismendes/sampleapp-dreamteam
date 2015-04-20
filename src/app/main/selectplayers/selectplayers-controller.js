/* global angular */

(function() {

  'use strict';

  function SelectPlayersCtrl(PlayersModel, PlayerSelectionService) {

    // Fetch player data from JSON file
    var self = this;
    PlayersModel.fetch().then(function(data) {
      self.players = data;
    });

    // Provide user progress for all components (e.g. error/complete messages, continue button, etc.)
    this.selectionStatus = PlayerSelectionService.selectionStatus;

  };

  angular.module('dreamteam').controller('SelectPlayersCtrl', SelectPlayersCtrl);

})();