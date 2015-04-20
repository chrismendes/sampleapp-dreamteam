/* global angular, _ */

(function() {

  'use strict';

  function PlayersModel($http) {
    var model = this,      
    url = 'data/players.json';

    model.fetch = function() {
      if(model.data) {
        return model.data;
      }
      return $http.get(url).then(extract).then(issueIDs).then(categorise);
    };

    var extract = function(result) {
      return result.data;
    };

    var issueIDs = function(players) {
      for(var i = 0; i < players.length; i++) {
        players[i].id = i+1;
      }
      return players;
    };

    var categorise = function(data) {
      var result = {};
      result.gk  = _.filter(data, { 'position': 'gk'  });
      result.def = _.filter(data, { 'position': 'def' });
      result.mid = _.filter(data, { 'position': 'mid' });
      result.fwd = _.filter(data, { 'position': 'fwd' });
      return result;
    };
  };


  angular.module('dreamteam.common').service('PlayersModel', PlayersModel);

})();