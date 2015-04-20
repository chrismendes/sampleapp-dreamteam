/* global angular, $ */

(function() {

  'use strict';

  function draggableItem() {

    var link = function(scope, element, attrs) {

      var allItems;
      var ui = {
        item: '[draggable=true]'
      };

      if(attrs.itemDragImage) {
        var dragIcon = document.createElement('img');
        dragIcon.src = attrs.itemDragImage;
      }

      function mouseDown() {
        allItems = $(this).parent().parent().find(ui.item);
        allItems.addClass('is-inactive');
        $(this).removeClass('is-inactive').addClass('is-active');
      }
      function mouseUp() {
        allItems = $(this).parent().parent().find(ui.item);
        allItems.removeClass('is-inactive');
        $(this).removeClass('is-active');
      }
      function dragStart(e) {
        e.originalEvent.dataTransfer.setData('Text', attrs.itemData);
        e.originalEvent.dataTransfer.effectAllowed = (scope.draggableItemMode) ? scope.draggableItemMode : 'copy';
        if(attrs.itemDragImage) {
          e.originalEvent.dataTransfer.setDragImage(dragIcon, 60, 60);
        }
      }
      function dragEnd() {
        allItems = $(this).parent().parent().find(ui.item);
        allItems.removeClass('is-inactive');
        $(this).removeClass('is-active');
      }

      $(element).on('mousedown', mouseDown);
      $(element).on('mouseup', mouseUp);
      $(element).on('dragstart', dragStart);
      $(element).on('dragend', dragEnd);
      
    };

    return {
      restrict: 'A',
      link: link,
      scope: {
        draggableItemMode: '@'
      }
    };

  };

  angular.module('dreamteam.common').directive('draggableItem', draggableItem);

})();