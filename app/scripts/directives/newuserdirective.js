'use strict';

angular.module('bodegaUninorteApp')
  .directive('newuserDirective', function () {
		return{
			templateUrl: 'views/templates/new-user.tpl.html',
      		controller: 'UsersCtrl'
		};
  });
    
