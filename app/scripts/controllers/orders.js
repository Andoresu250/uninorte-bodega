'use strict';

angular.module('bodegaUninorteApp')
  .controller('OrdersCtrl', function($scope, eventsService, itemsService, sessionService, ordersService, $mdDialog, $state, $stateParams, toastService) {

    $scope.role = sessionService.get("type");

    $scope.goToEdit = function (orderid) {
      $state.go('dashboard.orders.edit', {orderId : orderid});
    }

    $scope.viewOrder = function () {
      $scope.configTable();
      $scope.loandignData = true;
      ordersService.get($stateParams.orderId).
      then(
        function successCallback(response) {
          $scope.order = response.data.data.order;
          $scope.order.orderType = ($scope.order.type !== "consumible") ? 1 : 2;
          $scope.order.orderTypeName = ($scope.order.type !== "consumible") ? "Retornable" : "No Retornable";
          $scope.order.items.map(function(item) {
            item.orderNumber = item.pivot.number;
            if ($scope.order.orderType === 1) {
              item.returnDate = moment(item.pivot.date);
            }
          });
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

    $scope.editOrder = function () {
      loadEditOrder();
    }

    function loadEditOrder() {
      $scope.loandignData = true;
      ordersService.get($stateParams.orderId).
      then(
        function successCallback(response) {
          $scope.order = response.data.data.order;
          $scope.order.orderType = ($scope.order.type !== "consumible") ? 1 : 2;
          console.log($scope.order.orderType);
          $scope.order.orderTypeName = ($scope.order.type !== "consumible") ? "Retornable" : "No Retornable";
          $scope.order.items.map(function(item) {
            item.orderNumber = item.pivot.number;
            if ($scope.order.orderType === 1) {
              item.returnDate = moment(item.pivot.date);
            }
          });
          $scope.loandignData = false;
          loadItemsEdit($scope.order.orderType);
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

    $scope.initNewOrder = function () {
      $scope.getItemsType();
      $scope.configTable();
      $scope.neworder = {};
      $scope.neworder.orderType = undefined;
      $scope.neworder.orderType = 1;
      $scope.neworder.date = moment();
      $scope.neworder.items = [];
      $scope.order = {};
      $scope.order.items = [];
      loadItems($scope.neworder.orderType);
    }

    $scope.initOrder = function () {
      $scope.configTable();
      $scope.order = {};
      $scope.order.items = [];
      loadItems($scope.order.orderType);
    }

    $scope.configTable = function () {
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
        limit: 20,
        page: 1
      };
    }

    $scope.loadAllOrders = function() {
      getAllOrders();
      getApproveOrders();
      getDeliverOrders();
      getCancelOrders();
      getRejectOrders();
      getPendingOrders();
    }

    $scope.loadOrders = function(){
      getOrdersByStatus();
    }

    function getOrdersByStatus() {
      $scope.orders = [];
      $scope.loading = true;
      ordersService.search($scope.statusid).
    		then(
    			function successfullCallback(response) {
    				$scope.orders = response.data.data.orders;
            $scope.loading = false;
    			},
    			function errorCallback(response) {
            $scope.loading = false;
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

    function getAllOrders() {
      $scope.all = [];
      $scope.loadingAll = true;
      ordersService.all().
      then(
        function successCallback(response) {
          $scope.all = response.data.data.orders;
          $scope.loadingAll = false;
        },
        function errorCallback(response) {
          $scope.loadingAll = false;
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

    function getApproveOrders() {
      $scope.approveOrders = [];
      $scope.loadingApproved = true;
    	ordersService.search("3").
    		then(
    			function successfullCallback(response) {
            $scope.loadingApproved = false;
    				$scope.approveOrders = response.data.data.orders;
    			},
    			function errorCallback(response) {
            $scope.loadingApproved = false;
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
    function getDeliverOrders() {
      $scope.deliverOrders = [];
      $scope.loadingDelivered = true;
    	ordersService.search("4").
    		then(
    			function successfullCallback(response) {
            $scope.loadingDelivered = false;
    				$scope.deliverOrders = response.data.data.orders;
    			},
    			function errorCallback(response) {
            $scope.loadingDelivered = false;
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
    function getCancelOrders() {
      $scope.cancelOrders = [];
      $scope.loadingCancel = true;
    	ordersService.search("5").
    		then(
    			function successfullCallback(response) {
            $scope.loadingCancel = false;
    				$scope.cancelOrders = response.data.data.orders;
    			},
    			function errorCallback(response) {
            $scope.loadingCancel = false;
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
    function getRejectOrders() {
      $scope.rejectOrders = [];
      $scope.loadingReject = true;
    	ordersService.search("2").
    		then(
    			function successfullCallback(response) {
            $scope.loadingReject = false;
    				$scope.rejectOrders = response.data.data.orders;
    			},
    			function errorCallback(response) {
            $scope.loadingReject = false;
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
    function getPendingOrders() {
      $scope.pendingOrders = [];
      $scope.loadingPending = true;
    	ordersService.search("1").
    		then(
    			function successfullCallback(response) {
            $scope.loadingPending = false;
    				$scope.pendingOrders = response.data.data.orders;
    			},
    			function errorCallback(response) {
            $scope.loadingPending = false;
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

    $scope.resetOrder = function() {
      $scope.neworder.items = [];
      $scope.neworder.type = ($scope.neworder.orderType === "1") ? ("retornable") : ("consumible");
      loadItems($scope.neworder.orderType);
    }


    function loadItems(typeId) {
      $scope.showload = true;
      $scope.items = [];
      $scope.neworder.type = (typeId === 1) ? ("retornable") : ("consumible");
      itemsService.getByType(typeId).
      then(
        function successCallback(response) {
          $scope.items = [];
          response.data.data.items.map(function(item) {
            if (item.item_type_id == typeId) {
              $scope.items.push(item);
            }
          });
          $scope.showload = false;
        },
        function errorCallback(response) {
          $scope.items = [];
          $scope.showload = false;
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

    function loadItemsEdit (type) {
      $scope.showload = true;
      itemsService.getByType(type).
      then(
        function successCallback(response) {
          $scope.items = [];
          response.data.data.items.map(function(item) {
            if (item.item_type_id == type) {
              $scope.items.push(item);
            }
          });
          $scope.showload = false;
        },
        function errorCallback(response) {
          $scope.items = [];
          $scope.showload = false;
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

    $scope.loadItems = loadItems;

    $scope.getItemsType = function () {
      itemsService.getItemsType().
      then(
        function successCallback(response) {
          $scope.itemsTypes = response.data.data.item_types;
          $scope.neworder.type = ($scope.itemsTypes[0].name === "Retornable") ? ("retornable") : ("consumible");
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

    function loadEvents() {
      $scope.loandignData = true;
      eventsService.all().
      then(
        function successCallback(response) {
          $scope.events = response.data.data.Events;
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

    $scope.loadEvents = loadEvents;

    $scope.addItemToOrder = function(item, order) {
      var idx = $scope.isItem(item, order);
      // is currently selected
      if (idx > -1) {
        order.items.splice(idx, 1);
      }
      // is newly selected
      else {
        order.items.push(angular.copy(item));
      }
    };

    function isItem(item, order) {
      for (var i = 0; i < order.items.length; i++) {
        if (order.items[i].id === item.id) {
          return i
        }
      }
      return -1;
    }

    $scope.isItem = isItem;

    $scope.createOrder = function(newOrder) {
      $scope.loandignData = true;
      for (var item of newOrder.items) {
        item.returnDate = (item.returnDate == undefined) ? ("") : dateToString(moment(item.returnDate));
      }
      newOrder.date = dateToString(moment(newOrder.date));
      ordersService.new(newOrder).
      then(
        function successfullCallback(response) {
          $state.go('dashboard.orders');
          $scope.loandignData = false;
          toastService.show("Pedido creado satisfactoriamente");
        },
        function errorCallback(response) {
          $scope.loandignData = false;
          var msg = "";
          for(var error of response.data){
            msg += error + " ";
          }
          toastService.show(msg);
        }
      );
    }

    $scope.openWarningDialog = function (ev, order, method, action) {
      $mdDialog.show({
        controller: WarningDialogController,
        templateUrl: 'views/modals/change-order-status-dialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        fullscreen: true,
        locals: {
          order: order,
          method: method,
          action: action,
          loandignData: $scope.loandignData
        }
      });
    }

    function WarningDialogController ($scope, $mdDialog, order, method, action, loandignData) {
      $scope.order = order; //object
      $scope.method = method; //function
      $scope.action = action; //string
      $scope.loandignData = loandignData;
      $scope.comment = "";
      function editOrder(order) {
        $scope.loandignData = true;
        ordersService.edit(order).
        then(
          function successfullCallback(response) {
            method(order.id);
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

      $scope.hide = function() {
        $mdDialog.hide();
      };

      $scope.cancel = function() {
        $mdDialog.cancel();
      };

      $scope.accept = function(comment) {
        $scope.order.comment += " " + comment;
        editOrder($scope.order);
        $mdDialog.hide(order);
      };

    }

    $scope.approveOrder = function(orderId) {
      $scope.loandignData = true;
      ordersService.approve(orderId).
      then(
        function successCallback(response) {
          $state.go('dashboard.orders.view', {
            orderId: orderId
          }, {
            reload: true
          });
          $scope.loandignData = false;
          toastService.show("Pedido aprobado satisfactoriamente");
        },
        function errorCallback(response) {
          console.log(response);
          $state.go('dashboard.orders.view', {
            orderId: orderId
          }, {
            reload: true
          });
          $scope.loandignData = false;
          if(response.status == 404){
            toastService.show("Este pedido no puede ser aprobado debido a que no se puede complir con la demantda de alguno de los articulos.");
          }
          if(response.data != null){
            var msg = "";
            for(var error of response.data){
              msg += error + " ";
            }
            console.log(msg);
            toastService.show(msg);
          }

          if(response.status == -1){
            toastService.show("Error en la conexion con el servidor. verifique su conexion de internet y refresque la pagina, si el error persiste comuniquese con el administrador del sistema");
          }
        }
      );
    }

    $scope.deliverOrder = function(orderId) {
      $scope.loandignData = true;
      ordersService.deliver(orderId).
      then(
        function successCallback(response) {
          $state.go('dashboard.orders');
          $scope.loandignData = false;
          toastService.show("Pedido entregado satisfactoriamente");
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

    $scope.cancelOrder = function(orderId) {
      $scope.loandignData = true;
      ordersService.cancel(orderId).
      then(
        function successCallback(response) {
          $state.go('dashboard.orders');
          $scope.loandignData = false;
          toastService.show("Pedido cancelado satisfactoriamente");
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

    $scope.rejectOrder = function(orderId) {
      $scope.loandignData = true;
      ordersService.reject(orderId).
      then(
        function successCallback(response) {
          $state.go('dashboard.orders');
          $scope.loandignData = false;
          toastService.show("Pedido rechazado satisfactoriamente");
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

    $scope.deleteOrder = function(orderId) {
      $scope.loandignData = true;
      ordersService.delete(orderId).
      then(
        function successfullCallback(response) {
          $scope.loadOrders();
          $scope.loandignData = false;
          toastService.show("Pedido eliminado satisfactoriamente");
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

    $scope.saveOrder = function(order) {
      $scope.loandignData = true;
      ordersService.edit(order).
      then(
        function successfullCallback(response) {
          toastService.show("Pedido guardado satisfactoriamente");
          ordersService.approve(order.id).
          then(
            function successCallback(response) {
              $state.go('dashboard.orders.view', {
                orderId: order.id
              }, {
                reload: true
              });
              $scope.loandignData = false;
              toastService.show("Pedido aprobado satisfactoriamente");
            },
            function errorCallback(response) {
              $state.go('dashboard.orders.view', {
                orderId: order.order.id
              }, {
                reload: true
              });
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
            });
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

    function dateToString(date) {
      var day = (date.date() <= 9) ? ("0" + date.date()) : date.date();
      var month = (date.month() + 1 <= 9) ? ("0" + (date.month() + 1)) : (date.month() + 1);
      return date.year() + "-" + month + "-" + day;
    }

  });
