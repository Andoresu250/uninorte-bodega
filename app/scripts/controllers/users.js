'use strict';

angular.module('bodegaUninorteApp')
	.controller('UsersCtrl', function ($scope, usersService, $state, $stateParams, $mdDialog) {
		$scope.usersTypes = ['admin','director','gerente','bodega','asesor'];

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
			$scope.loandignData = true;
			usersService.get($stateParams.userId).
				then(
					function successCallback(response) {
						$scope.editUser = response.data.data.user;
						$scope.loandignData = false;
					},
					function errorCallback(response) {
						$scope.loandignData = false;
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


		//Dialog config

		 $scope.deleteUser = function(ev, id, email) {

		    var confirm = $mdDialog.confirm()
		          .title('Esta seguro de eliminar al usuario con email: ' + email)
		          .textContent('Una vez hecho esto no habra no prodras deshacer los cambios.')
		          .ariaLabel('Borrar usuario')
		          .targetEvent(ev)
		          .ok('Elimiar')
		          .cancel('Cancelar');

		    $mdDialog.show(confirm).then(function() {
			    usersService.delete(id).
			    	then(
			    		function successCallback(response) {
			    			loadUsers();
			    		},
			    		function errorCallback(response) {

			    		}
		    		);

		    }, function() {

		    });
		};

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
