/* global angular, _ */

(function() {

  'use strict';

  function DateService() {

    var service = this;

    service.getTodaysDate = function() {
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1;
      var yyyy = today.getFullYear();

      if(dd < 10) {
        dd = '0' + dd;
      }

      if(mm < 10) {
        mm = '0' + mm;
      }

      today = dd + '/' + mm + '/' + yyyy;
      return today;
    };

  };


  angular.module('dreamteam.common').service('DateService', DateService);

})();