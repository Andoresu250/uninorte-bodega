'use strict';

angular.module('bodegaUninorteApp')
  .controller('ReturnCtrl', function ($scope, sessionService, ordersService, $mdDialog, $state, $stateParams, toastService) {
    $scope.role = sessionService.get("type");
    $scope.showload = true;

    $scope.goToReturn = function (order) {
      if(order.complete){
          $state.go('dashboard.orders.view', {orderId: order.id});
      }else{
          $state.go('dashboard.orders.return.view', {orderId: order.id});
      }

    }

    $scope.goToView = function (orderId) {

    }

    if ($stateParams.orderId !== undefined) {
      $scope.loandignData = true;
      ordersService.get($stateParams.orderId).
      then(
        function successCallback(response) {
          var order = response.data.data.order;
          order.items = getReturnableItems(order);
          $scope.order = order;
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

    function getReturnableItems(order) {
      var items = [];
      angular.forEach(order.items, function(value, key){
        if(value.pivot.number_return !== value.pivot.number){
          items.push(value);
        }
      });
      return items;
    }

    $scope.loadOrders = function () {
        $scope.getOrdersPending();
        $scope.getOrdersDone();
        $scope.getDevolution();
    };

    $scope.getOrdersPending = function () {
      $scope.showloadPending = true;
      $scope.ordersPending = [];
      ordersService.all().
        then(
          function successCallback(response) {
            $scope.showloadPending = false;
            var items = [];
            response.data.data.orders.map(function (order) {
              items = getReturnableItems(order);
              if(order.order_status === "Entregado" && order.type !== "consumible" && items.length != 0){
                order.complete = false;
                $scope.ordersPending.items = items;
                $scope.ordersPending.push(order);
              }
            });
          },
          function errorCallback(response) {
            $scope.showloadPending = false;
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

    $scope.getOrdersDone = function () {
      $scope.showloadDone = true;
      $scope.ordersDone = [];
      ordersService.all().
        then(
          function successCallback(response) {
            $scope.showloadDone = false;
            var items = [];
            response.data.data.orders.map(function (order) {
              items = getReturnableItems(order);
              if(order.order_status === "Entregado" && order.type !== "consumible" && items.length == 0){
                order.complete = true;
                $scope.ordersDone.push(order);
              }
            });
          },
          function errorCallback(response) {
            $scope.showloadDone = false;
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

    $scope.getDevolution = function () {
      $scope.showloadDevolution = true;
      $scope.devolutions = [];
      ordersService.allReturns().
        then(
          function successCallback(response) {
            $scope.showloadDevolution = false;
            $scope.devolutions = response.data.data.devolutions;
            console.log($scope.devolutions);
          },
          function errorCallback(response) {
            $scope.showloadDevolution = false;
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

    $scope.getOrders = function() {
      switch ($scope.type) {
        case 1:
          $scope.showload = true;
          $scope.orders = [];
          ordersService.all().
            then(
              function successCallback(response) {
                $scope.showload = false;
                var items = [];
                response.data.data.orders.map(function (order) {
                  items = getReturnableItems(order);
                  console.log(order);
                  if(order.order_status === "Entregado" && order.type === "retornable" && items.length != 0){
                    order.complete = false;
                    $scope.orders.items = items;
                    $scope.orders.push(order);
                  }
                });
                console.log($scope.orders);
              },
              function errorCallback(response) {
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
          break;
        case 2:
          $scope.showload = true;
          $scope.orders = [];
          ordersService.all().
            then(
              function successCallback(response) {
                $scope.showload = false;
                var items = [];
                response.data.data.orders.map(function (order) {
                  items = getReturnableItems(order);
                  if(order.order_status === "Entregado" && order.type !== "consumible" && items.length == 0){
                    order.complete = true;
                    $scope.orders.push(order);
                  }
                });
                console.log($scope.orders);
              },
              function errorCallback(response) {
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
          break;
        case 3:

          break;
      }
    }

    $scope.openAddNumber = function(ev, item, order) {
		    $mdDialog.show({
		      controller: DialogController,
		      templateUrl: '/views/modals/add-item-number-return-dialog.html',
		      parent: angular.element(document.body),
		      targetEvent: ev,
		      clickOutsideToClose:true,
		      fullscreen: false,
          locals: {
            item : item
          }
		    })
		    .then(function(answer) {
		    	item.number = answer.number;
		      	ordersService.addReturn(order.id, item.id, answer.number, answer.comment).
		      		then(
		      			function successfullCallback(response) {
		      				$state.go('dashboard.orders.return.view',{orderId: order.id}, {reload: true});
                  //TODO: add message en todo
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

    $scope.initTable = function () {
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
        limit: 20,
        page: 1
      };
    }

    function DialogController($scope, $mdDialog, item) {
        $scope.item = item;
        $scope.comment = "";
        $scope.hide = function() {
          $mdDialog.hide();
        };

        $scope.cancel = function() {
          $mdDialog.cancel();
        };

        $scope.add = function(number) {
          var obj = {
            number: number,
            comment: $scope.comment
          };
          $mdDialog.hide(obj);
        };
      }

  });
