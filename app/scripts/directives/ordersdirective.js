'use strict';

/**
 * @ngdoc directive
 * @name bodegaUninorteApp.directive:ordersDirective
 * @description
 * # ordersDirective
 */
angular.module('bodegaUninorteApp')
  .directive('ordersDirective', function () {
    return {
      templateUrl: 'views/templates/orders.tpl.html',
      controller: 'OrdersCtrl'      
    };
  });
