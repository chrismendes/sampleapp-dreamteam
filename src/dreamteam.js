/* global angular */

(function() {

  'use strict';

  angular.module('dreamteam', [
    'dreamteam.common',
    'ui.router',
    'ngStorage',
    'firebase',
    'mgcrea.ngStrap.tab' // AngularStrap Tabs
  ])

  .config(function($stateProvider, $urlRouterProvider, $tabProvider) {
    $stateProvider
      .state('intro', {
        url:          '/',
        templateUrl:  'app/main/intro/intro-view.html'
      })
      .state('selectPlayers', {
        url:          '/players',
        controller:   'SelectPlayersCtrl',
        controllerAs: 'ctrl',
        templateUrl:  'app/main/selectplayers/selectplayers-view.html'
      })
      .state('playerPositions', {
        url:          '/lineup',
        controller:   'AssignPositionsCtrl',
        controllerAs: 'ctrl',
        templateUrl:  'app/main/assignpositions/assignpositions-view.html'
      })
      .state('compareTeams', {
        url:          '/compare',
        controller:   'CompareTeamsCtrl',
        controllerAs: 'ctrl',
        templateUrl:  'app/main/compareteams/compareteams-view.html'
      })
    ;
    $urlRouterProvider.otherwise('/');

    $tabProvider.defaults.template = 'app/common/directives/tabs/tabs-view.html'; // Set view for AngularStrap Tabs
  })

  .run(function($rootScope, $sessionStorage, $state) {
    $rootScope.$on('$stateChangeStart', function(event, toState) {

      var redirect = null;
      switch(toState.name) {
        case 'playerPositions': {
          if(typeof $sessionStorage.dreamTeam === 'undefined' || $sessionStorage.dreamTeam.players.length < 11) {
            redirect = 'selectPlayers';
          }
          break;
        }
      }
      if(redirect !== null) {
        event.preventDefault();
        $state.go(redirect);
      }

    });
  });

})();