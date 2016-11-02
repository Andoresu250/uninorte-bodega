'use strict';


angular.module('bodegaUninorteApp')
	.controller('EventsCtrl', function ($scope, eventsService, sessionService ,$mdDialog, $state, $stateParams) {

		$scope.role = sessionService.get("type");

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

		$scope.toggleLimitOptions = function () {
			$scope.limitOptions = $scope.limitOptions ? undefined : [5, 10, 15];
		};

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

		if($stateParams.eventId !== undefined){
			$scope.loandignData = true;
			eventsService.get($stateParams.eventId).
				then(
					function successCallback(response) {
						var editEvent = response.data.data.event;
						var dateTimeStart = moment(editEvent.start_date + " " + editEvent.start_time, "YYYY-MM-DD hh:mm a");
						var dateTimeEnd = moment(editEvent.finish_date + " " + editEvent.finish_time, "YYYY-MM-DD hh:mm a");
						editEvent.dateTimeStart = dateTimeStart;
						editEvent.dateTimeEnd = dateTimeEnd;
						$scope.editEvent = editEvent;
						$scope.loandignData = false;
					},
					function errorCallback(response) {
						$scope.loandignData = false;
					}
				);
		}

		$scope.saveEvent = function(editEvent) {
			var initDate = moment(editEvent.dateTimeStart);
		    var endDate = moment(editEvent.dateTimeEnd);

		    editEvent.start_date = dateToString(initDate);
		    editEvent.start_time = hourToString(initDate);

		    editEvent.finish_date = dateToString(endDate);
		    editEvent.finish_time = hourToString(endDate);

		    eventsService.edit(editEvent).
		    	then(
		    		function successCallback(response) {
    					$state.go('dashboard.events.index');
		    		},
		    		function errorCallback(response) {
		    			console.log(response);

		    		}
	    		);

		}


		$scope.createEvent = function(newEvent) {

		    var initDate = moment(newEvent.dateTimeStart);
		    var endDate = moment(newEvent.dateTimeEnd);

		    newEvent.start_date = dateToString(initDate);
		    newEvent.start_time = hourToString(initDate);

		    newEvent.finish_date = dateToString(endDate);
		    newEvent.finish_time = hourToString(endDate);

		    eventsService.new(newEvent).
		    	then(
		    		function successCallback(response) {
    					$state.go('dashboard.events.index');
		    		},
		    		function errorCallback(response) {
		    			console.log(response);

		    		}
	    		);

		};

		function loadEvents() {
			$scope.showload = true;
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

		function dateToString(date) {
			var day = (date.date() <= 9) ? ("0" + date.date()) : date.date();
			var month = (date.month() + 1 <= 9) ? ("0" + (date.month() + 1)) : (date.month() + 1);
			return date.year() + "-" + month + "-" + day;
		}

		function hourToString(date) {
			var hours = (date.hour() <= 9) ? ("0" + date.hour()) : date.hour();
			var minutes = (date.minutes() <= 9) ? ("0" + date.minutes()) : date.minutes();
			return hours + ":" + minutes + ":00";
		}

	});
