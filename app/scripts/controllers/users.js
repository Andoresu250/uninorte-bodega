'use strict';

angular.module('bodegaUninorteApp')
	.controller('UsersCtrl', function ($scope, usersService, $state, $stateParams) {
		$scope.usersTypes = ['admin','asesor','gerente','bodega'];

		$scope.showload = true;	
		
		$scope.createUser = function (user) {			
			usersService.new(user).
				then(
					function successCallback(response) {
						$state.go('dashboard.users.index');
					},
					function errorCallback(response) {
						
					}
				);
		}

		if($stateParams.userId !== undefined){
			usersService.get($stateParams.userId).
				then(
					function successCallback(response) {
						$scope.editUser = response.data.data.user;
					},
					function errorCallback(response) {
						
					}
				);
		}	

		$scope.saveUser = function (user) {
			usersService.edit(user).
				then(
					function successCallback(response) {
						$state.go('dashboard.users.index');
					},
					function errorCallback(response) {
						console.log(response);
					}
				);
		}	

		//Fab Config

		$scope.topDirections = ['left', 'up'];
		$scope.bottomDirections = ['down', 'right'];

		$scope.isOpen = false;

		$scope.availableModes = ['md-fling', 'md-scale'];
		$scope.selectedMode = 'md-fling';

		$scope.availableDirections = ['up', 'down', 'left', 'right'];
		$scope.selectedDirection = 'up';


		//Table config

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

		function loadUsers() {
			usersService.all().
				then(
					function successCallback(response){					
						$scope.users = response.data.data.Users;
						$scope.showload = false;		
					},
					function errorCallback(response){
						console.log(response);
						$scope.showload = false;
					}
				);
		}

		loadUsers();

		$scope.loadUsers = loadUsers;


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
