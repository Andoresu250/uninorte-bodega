'use strict';

/**
 * @ngdoc directive
 * @name bodegaUninorteApp.directive:neworderDirective
 * @description
 * # neworderDirective
 */
angular.module('bodegaUninorteApp')
  .directive('neworderDirective', function () {
    return {
      templateUrl: 'views/templates/new-order.tpl.html',
      controller: 'OrdersCtrl'
    };
  });
