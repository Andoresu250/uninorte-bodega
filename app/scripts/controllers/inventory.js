'use strict';

angular.module('bodegaUninorteApp')
	.controller('InventoryCtrl', function ($scope, itemsService, sessionService ,$state, $stateParams, $mdDialog) {

		$scope.role = sessionService.get("type");

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

		$scope.openAddNumber = function(ev, item) {
		    $mdDialog.show({
		      controller: 'InventoryCtrl',
		      templateUrl: '/views/modals/add-item-number-dialog.html',
		      parent: angular.element(document.body),
		      targetEvent: ev,
		      clickOutsideToClose:true,
		      fullscreen: true // Only for -xs, -sm breakpoints.
		    })
		    .then(function(answer) {
		    	item.number += answer;
		      	itemsService.edit(item).
		      		then(
		      			function successfullCallback(response) {
		      				loadItems();
		      			},
		      			function errorCallback(response) {
		      				
		      			}
	      			);
		    }, function() {
		      
		    });
		  };

	  	$scope.hide = function() {
	      $mdDialog.hide();
	    };

	    $scope.cancel = function() {
	      $mdDialog.cancel();
	    };

	    $scope.add = function(number) {
	      $mdDialog.hide(number);
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

		function getType(id) {
			for(var type of $scope.itemsTypes){
				if(type.id == id){
					return type.name;
				}
			}
		}

		function loadItems() {
			itemsService.all().
				then(
					function successCallback(response){					
						$scope.items = response.data.data.items;						
						for(var item of $scope.items){
							item.type = getType(item.item_type_id);
						}
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
