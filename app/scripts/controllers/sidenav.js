'use strict';

angular.module('bodegaUninorteApp')
	.controller('SidenavCtrl', function ($scope, $mdSidenav, $log, $state) {

		$scope.goTo = function (state) {
			$state.go(state);
		}
			

		$scope.close = function () {	      
	      $mdSidenav('left').close()
	        .then(function () {
	          //$log.debug("close is done");
	        });
	    };
	});
