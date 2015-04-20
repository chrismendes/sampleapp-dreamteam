/* global angular, _ */

(function() {

  'use strict';

  function CompareTeamsCtrl($sessionStorage, PlayerSelectionService, UsersModel) {

    // Fetch user players and sync with session
    this.userTeam = PlayerSelectionService.userTeam;
    $sessionStorage.dreamTeam = this.userTeam;

    // Retrieve data from Firebase
    this.remoteData = new UsersModel();
    this.teams = this.remoteData.users;

    this.selectedTeam = null;

    this.changeTeam = function(teamID) {
      var index = _.findIndex(this.teams, { id: teamID });
      if(index === this.selectedTeam) {
        this.selectedTeam = null;
        return;
      }
      if(this.teams[index]) {
        this.selectedTeam = index;
      }
    };

    this.saveUserTeam = function() {
      this.userTeam.id = this.teams.length + 1;
      this.remoteData.save(this.userTeam);
    };

  };

  angular.module('dreamteam').controller('CompareTeamsCtrl', CompareTeamsCtrl);

})();