'use strict';

/**
 * @ngdoc directive
 * @name bodegaUninorteApp.directive:usersDirective
 * @description
 * # usersDirective
 */
angular.module('bodegaUninorteApp')
  .directive('usersDirective', function () {
    return {
      templateUrl: 'views/templates/users.tpl.html',
      controller: 'UsersCtrl'
    };
  });
