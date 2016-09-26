'use strict';

/**
 * @ngdoc directive
 * @name bodegaUninorteApp.directive:neweventDirective
 * @description
 * # neweventDirective
 */
angular.module('bodegaUninorteApp')
  .directive('neweventDirective', function () {
    return {
      templateUrl: 'views/templates/new-event.tpl.html',
      controller: 'EventsCtrl'      
    };
  });
