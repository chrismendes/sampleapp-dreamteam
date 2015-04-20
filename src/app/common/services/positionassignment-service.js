/* global angular, _ */

(function() {

  'use strict';

  function PositionAssignmentService() {

    var service = this;

    service.userTeam = {
      formation: null,
      players: []
    };
    service.status = {
      complete: false
    };

    service.assignPlayer = function(positionID, playerName, onPitchMove) {
      positionID = parseInt(positionID);
      if(!onPitchMove) {
        onPitchMove = false;
      }

      var previousPosition = service.playerIsOnPitch(playerName);
      if(previousPosition !== false) {
        service.unassignPlayer(previousPosition);
      }
      var currentOccupant = _findPlayerByPosition(positionID);
      if(currentOccupant !== false) {
        service.unassignPlayer(positionID);

        if(onPitchMove) {
          service.userTeam.players[currentOccupant].assignedPosition = previousPosition;
        }
      }

      var index = _findPlayerByName(playerName);
      if(index !== false) {
        service.userTeam.players[index].assignedPosition = positionID;
      }
      _checkSelectionStatus();

      return service.userTeam.players[index];
    };
    service.unassignPlayer = function(positionID) {
      positionID = parseInt(positionID);
      var index = _findPlayerByPosition(positionID);
      if(index !== false) {
        service.userTeam.players[index].assignedPosition = null;
      }
      _checkSelectionStatus();
    };

    service.playerIsOnPitch = function(playerName) {
      var index = _findPlayerByName(playerName);
      if(index !== false) {
        var position = service.userTeam.players[index].assignedPosition;
        if(position !== null) {
          return position;
        }
      }
      return false;
    };

    service.positionIsOccupied = function(positionID) {
      positionID = parseInt(positionID);
      var index = _findPlayerByPosition(positionID);
      return (index !== false) ? true : false;
    };

    service.getPlayerByPosition = function(positionID) {
      positionID = parseInt(positionID);
      var index = _findPlayerByPosition(positionID);
      return (index !== false) ? service.userTeam.players[index] : false;
    };

    service.loadPlayers = function(players) {
      if(_.has(players[0], 'assignedPosition')) {
        service.userTeam.players = players;
      } else {
        service.userTeam.players = _setPlayerPositionsBlank(players);
      }
      _checkSelectionStatus();
    };

    var _setPlayerPositionsBlank = function(players) {
      for(var i = 0; i < players.length; i++) {
        players[i].assignedPosition = null;
      }
      return players;
    };
    var _extractPlayerPositions = function(players) {
      var assignedPositions = {};
      for(var i = 0; i < 11; i++) {
        var occupant = _.findIndex(players, { assignedPosition: i });
        if(occupant > -1) {
          assignedPositions[i] = players[occupant];
        } else {
          assignedPositions[i] = null;
        }
      }
      return assignedPositions;
    };


    // ---
    // Private Helpers
    // ---
    var _findPlayerByName = function(playerName) {
      var index = _.findIndex(service.userTeam.players, { name: playerName });
      return (index > -1) ? index : false;
    };
    var _findPlayerByPosition = function(positionID) {
      var index = _.findIndex(service.userTeam.players, { assignedPosition: positionID });
      return (index > -1) ? index : false;
    };
    var _checkSelectionStatus = function() {
      service.status.complete = true;
      for(var i = 0; i < service.userTeam.players.length; i++) {
        if(service.userTeam.players[i].assignedPosition === null) {
          service.status.complete = false;
          return;
        }
      };
    };
    var _logPositions = function() {
      for(var i = 0; i < 11; i++) {
        var index = _findPlayerByPosition(i);
        var player = service.userTeam.players[index];
        if(player) {
          console.log(i + ': ' + player.name);
        } else {
          console.log(i + ': ' + 'null');
        }
      }
      console.log(service.userTeam.players);
      console.log('');
    };

  }


  angular.module('dreamteam').service('PositionAssignmentService', PositionAssignmentService);

})();