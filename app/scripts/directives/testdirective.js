'use strict';

/**
 * @ngdoc directive
 * @name bodegaUninorteApp.directive:testDirective
 * @description
 * # testDirective
 */
angular.module('bodegaUninorteApp')
  .directive('testDirective', function () {
    return {
      template: '<div><p>{{name}}</p></div>',
      restrict: 'E',
      scope: {
        name : '='
      }
    };
  });
