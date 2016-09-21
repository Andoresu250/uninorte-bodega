'use strict';

/**
 * @ngdoc directive
 * @name bodegaUninorteApp.directive:editorderDirective
 * @description
 * # editorderDirective
 */
angular.module('bodegaUninorteApp')
  .directive('editorderDirective', function () {
    return {
      templateUrl: 'views/templates/edit-order.tpl.html',
      controller: 'OrdersCtrl'
    };
  });
