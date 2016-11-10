'use strict';

angular.module('bodegaUninorteApp')
  .directive('returnDirective', function () {
    return {
      templateUrl: 'views/templates/return.tpl.html',
      controller: 'ReturnCtrl',
      scope: {
      	orders: '=',
        name : '=',
        type : '=',
        showload : '='
      }
    };
  });
