'use strict';

angular.module('bodegaUninorteApp')
	.controller('DashboardCtrl', function ($scope, loginService) {
		$scope.logout = function () {
			loginService.logout();	 
		}
	});
