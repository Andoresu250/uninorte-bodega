'use strict';

/**
 * @ngdoc directive
 * @name bodegaUninorteApp.directive:newitemDirective
 * @description
 * # newitemDirective
 */
angular.module('bodegaUninorteApp')
  .directive('newitemDirective', function () {
    return {
      templateUrl: 'views/templates/new-item.tpl.html',
      controller: 'InventoryCtrl'      
    };
  });
