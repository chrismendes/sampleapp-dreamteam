/* global angular, $ */

(function() {

  'use strict';

  function dropArea() {

    var link = function(scope, element, attrs) {

      function dragEnter(e) {
        cancelDefault(e);
        $(this).addClass('is-droparea');
      }
      function dragLeave(e) {
        $(this).removeClass('is-droparea');
      }

      function drop(e) {
        if(e.preventDefault) {
          e.preventDefault();
        }
        if(e.stopPropagation) {
          e.stopPropagation();
        }
      }

      function cancelDefault(e) {
        if(e.preventDefault) {
          e.preventDefault();
        }
        return false;
      }

      $(element).on('dragenter', dragEnter);
      $(element).on('dragleave', dragLeave);
      $(element).on('dragover', cancelDefault);
      $(element).on('drop', drop);

    };

    return {
      restrict: 'A',
      link: link
    };

  };

  angular.module('dreamteam.common').directive('dropArea', dropArea);

})();