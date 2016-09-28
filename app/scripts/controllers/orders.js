'use strict';

angular.module('bodegaUninorteApp')
	.controller('OrdersCtrl', function ($scope, eventsService, itemsService, $mdDialog, $state, $stateParams) {

		//FAB CONFIG

		$scope.topDirections = ['left', 'up'];
		$scope.bottomDirections = ['down', 'right'];

		$scope.isOpen = false;

		$scope.availableModes = ['md-fling', 'md-scale'];
		$scope.selectedMode = 'md-fling';

		$scope.availableDirections = ['up', 'down', 'left', 'right'];
		$scope.selectedDirection = 'up';

		//TABLE CONFIG
    	$scope.selected = [];
		$scope.limitOptions = [15];

		$scope.options = {
			rowSelection: false,
			multiSelect: false,
			autoSelect: false,
			decapitate: false,
			largeEditDialog: true,
			boundaryLinks: true,
			limitSelect: false,
			pageSelect: false
		};

		$scope.query = {
			order: 'name',
			limit: 5,
			page: 1
		};

		itemsService.all().
			then(
				function successCallback(response) {
					$scope.items = response.data.data.items;					
				},
				function errorCallback(response) {
					
				}
			);

	});
