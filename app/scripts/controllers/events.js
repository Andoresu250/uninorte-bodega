'use strict';


angular.module('bodegaUninorteApp')
	.controller('EventsCtrl', function ($scope, eventsService, $mdDialog) {

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

		//MODAL CONFIG

		$scope.showAdvanced = function(ev) {
		    $mdDialog.show({
				controller: 'EventDialogCtrl',
				templateUrl: 'views/modals/new-event-dialog.html',
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose:true,
				fullscreen: true // Only for -xs, -sm breakpoints.
		    })
		    .then(function(newEvent) {
		    	console.log(newEvent);
				eventsService.new(newEvent).
					then(
						function successCallback(response) {
							console.log(response);
							loadEvents();
						},
						function errorCallback(response) {							
							console.log(response);
						}
					);
		    }, function() {
				
		    });
		};

		$scope.toggleLimitOptions = function () {
			$scope.limitOptions = $scope.limitOptions ? undefined : [5, 10, 15];
		};

		function loadEvents() {
			eventsService.all().
				then(
					function successCallback(response){					
						$scope.events = response.data.data.Events;
						$scope.showload = false;		
					},
					function errorCallback(response){
						console.log(response);
						$scope.showload = false;
					}
				);
		}

		loadEvents();

		$scope.loadEvents = loadEvents;


		$scope.logItem = function (item) {
			console.log(item.name, 'was selected');
		};

		$scope.logOrder = function (order) {
			console.log('order: ', order);
		};

		$scope.logPagination = function (page, limit) {
			console.log('page: ', page);
			console.log('limit: ', limit);
		}
	});
