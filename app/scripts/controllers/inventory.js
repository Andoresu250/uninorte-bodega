'use strict';

angular.module('bodegaUninorteApp')
	.controller('InventoryCtrl', function ($scope, itemsService, $state, $stateParams, $mdDialog) {


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
			order: 'id',
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

		itemsService.getItemsType().
			then(
				function successCallback(response) {
					$scope.itemsTypes = response.data.data.item_types;
				},
				function errorCallback(response) {
					console.log(response);
				}
			);

		function loadItems() {
			itemsService.all().
				then(
					function successCallback(response){					
						$scope.items = response.data.data.items;						
						$scope.showload = false;		
					},
					function errorCallback(response){
						console.log(response);
						$scope.showload = false;
					}
				);
		}

		$scope.loadItems = loadItems;

		loadItems();

		$scope.createItem = function (item) {			
			itemsService.new(item).
				then(
					function successCallback(response) {
						$state.go('dashboard.inventory.index');
					},
					function errorCallback(response) {
						console.log(response);
					}
				);
		}

		if($stateParams.itemId !== undefined){
			itemsService.get($stateParams.itemId).
				then(
					function successCallback(response) {
						$scope.edititem = response.data.data.item;
					},
					function errorCallback(response) {
						
					}
				);
		}	

		$scope.saveItem = function (item) {
			itemsService.edit(item).
				then(
					function successCallback(response) {
						$state.go('dashboard.inventory.index');
					},
					function errorCallback(response) {
						console.log(response);
					}
				);
		}	

		$scope.deleteItem = function(ev, id, name) {
		    
		    var confirm = $mdDialog.confirm()
		          .title('Esta seguro de eliminar el item con nombre: ' + name)
		          .textContent('Una vez hecho esto no habra no prodras deshacer los cambios.')
		          .ariaLabel('Borrar Item')
		          .targetEvent(ev)
		          .ok('Elimiar')
		          .cancel('Cancelar');

		    $mdDialog.show(confirm).then(function() {
			    itemsService.delete(id).
			    	then(
			    		function successCallback(response) {
			    			loadItems();
			    		},
			    		function errorCallback(response) {
			    			
			    		}
		    		);
			    
		    }, function() {
		    	
		    });
		};



	});
