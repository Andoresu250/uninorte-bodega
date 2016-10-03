'use strict';

/**
 * @ngdoc directive
 * @name bodegaUninorteApp.directive:ordersstatusDirective
 * @description
 * # ordersstatusDirective
 */
angular.module('bodegaUninorteApp')
  .directive('ordersstatusDirective', function () {
    return {

      templateUrl: 'views/templates/orders.tpl.html',      
      controller: 'OrdersCtrl',
      scope: {
      	orders: '=',
        name : '='
      }
    };
  });
