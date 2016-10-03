'use strict';

angular.module('bodegaUninorteApp')
	.controller('NavbarCtrl', function ($scope, $timeout, sessionService,$mdSidenav, $log, loginService) {

		$scope.role = sessionService.get("type");

		$scope.logout = function () {
			loginService.logout();
		}

		$scope.toggleRight = buildToggler('left');
	    $scope.isOpenRight = function(){
	      return $mdSidenav('left').isOpen();
	    };

	    function buildToggler(navID) {
	      return function() {	        
	        $mdSidenav(navID)
	          .toggle()
	          .then(function () {
	            //$log.debug("toggle " + navID + " is done");
	          });
	      }
	    }


	});
