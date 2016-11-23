'use strict';

angular.module('bodegaUninorteApp')
	.controller('SidenavCtrl', function ($scope, $mdSidenav, $log, $state, loginService) {

		$scope.goTo = function (state) {
			$state.go(state);
			$scope.close();
		}

		$scope.logout = function () {
			console.log("salir");
			loginService.logout();						
		}


		$scope.close = function () {
	      $mdSidenav('left').close()
	        .then(function () {
	          //$log.debug("close is done");
	        });
	    };
	});
