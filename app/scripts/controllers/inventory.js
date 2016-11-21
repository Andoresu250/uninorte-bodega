'use strict';

angular.module('bodegaUninorteApp')
	.controller('InventoryCtrl', function ($scope, itemsService, sessionService ,$state, $stateParams, $mdDialog, toastService) {

		$scope.role = sessionService.get("type");

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
		    	item.number = answer;
		      	itemsService.add(item).
		      		then(
		      			function successfullCallback(response) {
		      				loadItems();
									toastService.show("Cantidad aumentada satisfactoriamente");
		      			},
		      			function errorCallback(response) {
									if(response.data != null){
										var msg = "";
										for(var error of response.data){
											msg += error + " ";
										}
										toastService.show(msg);
									}
									if(response.status == -1){
										toastService.show("Error en la conexion con el servidor. verifique su conexion de internet y refresque la pagina, si el error persiste comuniquese con el administrador del sistema");
									}
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

		$scope.getItemsType = function () {
			$scope.itemsTypes = [];
			$scope.loandignData = true;
			itemsService.getItemsType().
				then(
					function successCallback(response) {
						$scope.loandignData = false;
						$scope.itemsTypes = response.data.data.item_types;
						loadItems();
					},
					function errorCallback(response) {
						$scope.loandignData = false;
						loadingType = false
						if(response.data != null){
							var msg = "";
							for(var error of response.data){
								msg += error + " ";
							}
							toastService.show(msg);
						}
						if(response.status == -1){
							toastService.show("Error en la conexion con el servidor. verifique su conexion de internet y refresque la pagina, si el error persiste comuniquese con el administrador del sistema");
						}
					}
				);
		}


		function getType(id) {
			for(var type of $scope.itemsTypes){
				if(type.id == id){
					return type.name;
				}
			}
		}

		function loadItems() {
			$scope.items = [];
			$scope.showload = true;
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
						$scope.showload = false;
						if(response.data != null){
							var msg = "";
							for(var error of response.data){
								msg += error + " ";
							}
							toastService.show(msg);
						}
						if(response.status == -1){
							toastService.show("Error en la conexion con el servidor. verifique su conexion de internet y refresque la pagina, si el error persiste comuniquese con el administrador del sistema");
						}
					}
				);
		}

		$scope.loadItems = loadItems;

		$scope.createItem = function (item) {
			$scope.loandignData = true;
			itemsService.new(item).
				then(
					function successCallback(response) {
						$scope.loandignData = false;
						$state.go('dashboard.inventory.index');
						toastService.show("Articulo creado satisfactoriamente");
					},
					function errorCallback(response) {						
						$scope.loandignData = false;
						if(response.data != null){
							var msg = "";
							for(var error of response.data){
								msg += error + " ";
							}
							toastService.show(msg);
						}
						if(response.status == -1){
							toastService.show("Error en la conexion con el servidor. verifique su conexion de internet y refresque la pagina, si el error persiste comuniquese con el administrador del sistema");
						}
					}
				);
		}

		if($stateParams.itemId !== undefined){
			$scope.loandignData = true;
			itemsService.get($stateParams.itemId).
				then(
					function successCallback(response) {
						$scope.loandignData = false;
						$scope.edititem = response.data.data.item;
						$scope.loandignData = false;
					},
					function errorCallback(response) {
						$scope.loandignData = false;
						if(response.data != null){
							var msg = "";
							for(var error of response.data){
								msg += error + " ";
							}
							toastService.show(msg);
						}
						if(response.status == -1){
							toastService.show("Error en la conexion con el servidor. verifique su conexion de internet y refresque la pagina, si el error persiste comuniquese con el administrador del sistema");
						}
					}
				);
		}

		$scope.saveItem = function (item) {
			$scope.loandignData = true;
			itemsService.edit(item).
				then(
					function successCallback(response) {
						$scope.loandignData = false;
						$state.go('dashboard.inventory.index');
						toastService.show("Articulo guardado satisfactoriamente");
					},
					function errorCallback(response) {
						$scope.loandignData = false;

						if(response.data != null){
							var msg = "";
							for(var error of response.data){
								msg += error + " ";
							}
							toastService.show(msg);
						}
						if(response.status == -1){
							toastService.show("Error en la conexion con el servidor. verifique su conexion de internet y refresque la pagina, si el error persiste comuniquese con el administrador del sistema");
						}
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
								toastService.show("Articulo dado de baja satisfactoriamente");
			    		},
			    		function errorCallback(response) {
								if(response.data != null){
									var msg = "";
									for(var error of response.data){
										msg += error + " ";
									}
									toastService.show(msg);
								}
								if(response.status == -1){
									toastService.show("Error en la conexion con el servidor. verifique su conexion de internet y refresque la pagina, si el error persiste comuniquese con el administrador del sistema");
								}
			    		}
		    		);

		    }, function() {

		    });
		};



	});
