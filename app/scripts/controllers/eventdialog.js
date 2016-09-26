'use strict';

angular.module('bodegaUninorteApp')
	.controller('EventDialogCtrl', function ($scope, $mdDialog) {
		$scope.hide = function() {
			$mdDialog.hide();
		};

		$scope.cancel = function() {			
			$mdDialog.cancel();
		};

		$scope.createEvent = function(newEvent) {
			$mdDialog.hide(newEvent);
		};

		$scope.editEvent = function(event) {
			$mdDialog.hide(event);
		};
	});