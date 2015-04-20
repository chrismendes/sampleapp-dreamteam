/* global angular */

(function() {

  'use strict';

  function UsersModel($firebaseArray, config, DateService) {

    var service = function() {

      var model = this;
      var ref = new Firebase(config.databaseHostURL);

      model.users = [];

      model.fetch = function() {
        model.users = $firebaseArray(ref);
      };

      model.save = function(userTeam) {
        if(typeof userTeam === 'undefined') {
          return;
        }
        userTeam.date = DateService.getTodaysDate();
        model.users.$add(userTeam);
      };

      model.fetch();

    };

    return service;

  };


  angular.module('dreamteam.common').factory('UsersModel', UsersModel);

})();