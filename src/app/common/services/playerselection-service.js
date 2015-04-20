/* global angular, _ */

(function() {

  'use strict';

  function PlayerSelectionService($sessionStorage) {

    var service = this;

    service.userTeam = {
      formation: null,
      players: []
    };
    service.playerQuota = {
      gk:  1,
      def: null,
      mid: null,
      fwd: null
    };
    service.selectionStatus = {
      complete: false,
      error: null,
      quota: null
    };


    // ---
    // Formation
    // ---
    service.getFormation = function() {
      return service.userTeam.formation;
    };
    service.setFormation = function(f) {
      service.userTeam.formation = f;

      _updatePlayerQuota();
      service.checkSelectionStatus();
    };


    // ---
    // Player Quota
    // ---
    service.getPlayerQuota = function(position) {
      return service.playerQuota[position];
    };
    service.playerQuotaIsMet = function(position) {
      return (service.getSelectedCount(position) === service.getPlayerQuota(position));
    };
    service.playerQuotaIsExceeded = function(position) {
      return (service.getSelectedCount(position) > service.getPlayerQuota(position));
    };


    // ---
    // Selecting Players
    // ---
    service.togglePlayer = function(player) {
      var deselect = service.playerIsSelected(player);
      if(deselect) {
        _removePlayer(player);
      } else {
        if(!service.playerQuotaIsMet(player.position) && !service.playerQuotaIsExceeded(player.position)) {
          _addPlayer(player);
        }
      }
      service.checkSelectionStatus();
    };
    service.playerIsSelected = function(player) {
      var found = _.filter(service.userTeam.players, { name: player.name });
      return (found.length > 0) ? true : false;
    };
    service.getSelectedCount = function(position) {
      return _.filter(service.userTeam.players, { position: position }).length;
    };
    service.checkSelectionStatus = function() {
      var complete = true;
      var error = null;
      for(var position in service.playerQuota) {
        if(service.playerQuotaIsExceeded(position)) {
          error = position;
        }
        if(service.getSelectedCount(position) !== service.getPlayerQuota(position)) {
          complete = false;
        }
      };
      service.selectionStatus.complete = complete;
      service.selectionStatus.error = error;
      service.selectionStatus.quota = (11 - service.userTeam.players.length);
    };
    service.resetSelection = function(position) {
      service.userTeam.players = _.reject(service.userTeam.players, { position: position });
      service.checkSelectionStatus();
    };


    // ---
    // Private Helpers
    // ---
    var _addPlayer = function(player) {
      service.userTeam.players.push(player);
    };
    var _removePlayer = function(player) {
      _.remove(service.userTeam.players, { name: player.name });
    };
    var _updatePlayerQuota = function() {
      if(service.userTeam.formation === null) {
        return;
      }
      var q = service.userTeam.formation.split('');
      service.playerQuota.def = parseInt(q[0]);
      service.playerQuota.mid = parseInt(q[1]);
      service.playerQuota.fwd = parseInt(q[2]);
    };


    // ---
    // Initialisation
    // ---
    var _init = function() {

      // Retrieve from session storage
      if(service.userTeam.formation === null) {
        if($sessionStorage.dreamTeam) {
          service.userTeam = $sessionStorage.dreamTeam;
          _updatePlayerQuota();
        }
      }
      service.checkSelectionStatus();

      // Bind user input to session storage
      $sessionStorage.dreamTeam = service.userTeam;

    };
    _init();

  };


  angular.module('dreamteam.common').service('PlayerSelectionService', PlayerSelectionService);

})();