'use strict';

angular.module('bodegaUninorteApp')
  .directive('edituserDirective', function () {
    return {
      templateUrl: 'views/templates/edit-user.tpl.html',      
      controller: 'UsersCtrl'      
    };
  });
