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


		$scope.createEvent = function(newEvent) {		
		    
		    var initDate = moment(newEvent.dateTimeStart);
		    var endDate = moment(newEvent.dateTimeEnd);
		    newEvent.dateStart = dateToString(initDate);
		    newEvent.timeStart = hourToString(initDate);

		    newEvent.dateEnd = dateToString(endDate);		    
		    newEvent.timeEnd = hourToString(endDate);

		    eventsService.new(newEvent).
		    	then(
		    		function successCallback(response) {
		    			
		    		},
		    		function errorCallback(response) {
		    			
		    		}
	    		);
		    console.log(newEvent);		    
		    
		};

		function dateToString(date) {			
			var day = (date.date() <= 9) ? ("0" + date.date()) : date.date();
			var month = (date.month() + 1 <= 9) ? ("0" + (date.month() + 1)) : (date.month() + 1);			
			return date.year() + "-" + month + "-" + day;
		}

		function hourToString(date) {
			var hours = (date.hour() <= 9) ? ("0" + date.hour()) : date.hour();
			var minutes = (date.minutes() <= 9) ? ("0" + date.minutes()) : date.minutes();			
			return hours + ":" + minutes;
		}

		$scope.cancelEvent = function(ev, id, name) {
		    
		    var confirm = $mdDialog.confirm()
		          .title('Esta seguro de cancelar el evento con nombre: ' + name)
		          .textContent('Una vez hecho esto no habra no prodras deshacer los cambios.')
		          .ariaLabel('Cancelar evento')
		          .targetEvent(ev)
		          .ok('Cencelar Evento')
		          .cancel('Cerrar');

		    $mdDialog.show(confirm).then(function() {
			    eventsService.delete(id).
			    	then(
			    		function successCallback(response) {
			    			loadEvents();
			    		},
			    		function errorCallback(response) {
			    			
			    		}
		    		);
			    
		    }, function() {
		    	
		    });
		};

		$scope.showEditEvent = function(ev, eventId) {

			eventsService.get(eventId).
				then(
					function successCallback (response) {
						$scope.editevent = response.data.data.event;
						$mdDialog.show({
							controller: 'EventDialogCtrl',
							templateUrl: 'views/modals/edit-event-dialog.html',
							parent: angular.element(document.body),
							targetEvent: ev,
							clickOutsideToClose:true,
							fullscreen: true // Only for -xs, -sm breakpoints.
					    })
					    .then(function(event) {
					    	
							eventsService.edit(event).
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
					},
					function errorCallback (response) {
						
					}
				);

		    
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
