'use strict';

angular.module('bodegaUninorteApp')
	.controller('NavbarCtrl', function ($scope, $timeout, $mdSidenav, $log, loginService) {
		$scope.logout = function () {
			loginService.logout();
		}

		$scope.toggleRight = buildToggler('left');
	    $scope.isOpenRight = function(){
	      return $mdSidenav('left').isOpen();
	    };

	    function buildToggler(navID) {
	      return function() {
	        // Component lookup should always be available since we are not using `ng-if`
	        $mdSidenav(navID)
	          .toggle()
	          .then(function () {
	            $log.debug("toggle " + navID + " is done");
	          });
	      }
	    }


	});
