'use strict';

angular.module('bodegaUninorteApp')
	.directive('loginDirective', function () {
		return {
			templateUrl: 'views/templates/login.tpl.html',
			controller: 'LoginCtrl'		
		};
	});
