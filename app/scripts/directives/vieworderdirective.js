'use strict';

/**
 * @ngdoc directive
 * @name bodegaUninorteApp.directive:vieworderDirective
 * @description
 * # vieworderDirective
 */
angular.module('bodegaUninorteApp')
  .directive('vieworderDirective', function () {
    return {
      templateUrl: 'views/templates/view-order.tpl.html',
      controller: 'OrdersCtrl'
    };
  });
