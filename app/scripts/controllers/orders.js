'use strict';

angular.module('bodegaUninorteApp')
  .controller('OrdersCtrl', function($scope, eventsService, itemsService, sessionService, ordersService, $mdDialog, $state, $stateParams) {

    $scope.role = sessionService.get("type");
    $scope.showload = true;

    if ($stateParams.orderId !== undefined) {
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
          loadItems($scope.order.orderType);
        },
        function errorCallback(response) {
          $scope.loandignData = false;
        }
      );
    }




    $scope.neworder = {};
    $scope.neworder.orderType = undefined;
    $scope.neworder.orderType = 1;
    $scope.neworder.date = moment();
    $scope.neworder.items = [];
    $scope.order = {};
    $scope.order.items = [];

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
      limit: 20,
      page: 1
    };


    function loadOrders() {
      $scope.showload = true;
      ordersService.all().
      then(
        function successCallback(response) {
          $scope.all = response.data.data.orders;
          var pendingOrders = [];
          var rejectOrders = [];
          var approveOrders = [];
          var deliverOrders = [];
          var cancelOrders = [];

          for (var order of $scope.all) {
            switch (order.order_status) {
              case "Pendiente":
                pendingOrders.push(order);
                break;
              case "Rechazado":
                rejectOrders.push(order);
                break;
              case "Aprobado":
                approveOrders.push(order);
                break;
              case "Entregado":
                deliverOrders.push(order);
                break;
              case "Cancelado":
                cancelOrders.push(order);
                break;
            }
          }

          $scope.pendingOrders = pendingOrders;
          $scope.rejectOrders = rejectOrders;
          $scope.approveOrders = approveOrders;
          $scope.deliverOrders = deliverOrders;
          $scope.cancelOrders = cancelOrders;

          $scope.showload = false;

        },
        function errorCallback(response) {
          console.log(response);
          $scope.showload = false;
        }
      );
    }

    /*function getOrdersByStatus(statusId) {
    	ordersService.search(statusId).
    		then(
    			function successfullCallback(response) {
    				$scope.orders = response.data.data.orders;
    			},
    			function errorCallback(response) {

    			}
    		);
    }

    function getApproveOrders() {
    	ordersService.search(3).
    		then(
    			function successfullCallback(response) {
    				$scope.approveOrders = response.data.data.orders;
    			},
    			function errorCallback(response) {

    			}
    		);
    }

    function getDeliverOrders() {
    	ordersService.search(4).
    		then(
    			function successfullCallback(response) {
    				$scope.deliverOrders = response.data.data.orders;
    			},
    			function errorCallback(response) {

    			}
    		);
    }

    function getCancelOrders() {
    	ordersService.search(5).
    		then(
    			function successfullCallback(response) {
    				$scope.cancelOrders = response.data.data.orders;
    			},
    			function errorCallback(response) {

    			}
    		);
    }

    function getRejectOrders() {
    	ordersService.search(2).
    		then(
    			function successfullCallback(response) {
    				$scope.rejectOrders = response.data.data.orders;
    			},
    			function errorCallback(response) {

    			}
    		);
    }*/

    /*function getPendingOrders() {
    	ordersService.search(1).
    		then(
    			function successfullCallback(response) {
    				$scope.pendingOrders = response.data.data.orders;
    			},
    			function errorCallback(response) {
    				console.log(response);
    			}
    		);
    }*/


    //getApproveOrders();
    //getApproveOrders();
    //getCancelOrders();
    //getRejectOrders();
    //getPendingOrders();


    $scope.loadOrders = loadOrders;

    loadOrders();



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
        }
      );
    }

    $scope.loadItems = loadItems;
    loadItems($scope.neworder.orderType);

    itemsService.getItemsType().
    then(
      function successCallback(response) {
        $scope.itemsTypes = response.data.data.item_types;
        $scope.neworder.type = ($scope.itemsTypes[0].name === "Retornable") ? ("retornable") : ("consumible");
      },
      function errorCallback(response) {
        console.log(response);
      }
    );

    function loadEvents() {
      eventsService.all().
      then(
        function successCallback(response) {
          $scope.events = response.data.data.Events;
          $scope.showload = false;
        },
        function errorCallback(response) {
          console.log(response);
          $scope.showload = false;
        }
      );
    }

    loadEvents();

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
      for (var item of newOrder.items) {
        item.returnDate = (item.returnDate == undefined) ? ("") : dateToString(moment(item.returnDate));
      }
      newOrder.date = dateToString(moment(newOrder.date));
      ordersService.new(newOrder).
      then(
        function successfullCallback(response) {
          $state.go('dashboard.orders');
        },
        function errorCallback(response) {
          console.log(response);
        }
      );

    }

    $scope.approveOrder = function(orderId) {
      ordersService.approve(orderId).
      then(
        function successCallback(response) {
          $state.go('dashboard.orders.view', {
            orderId: orderId
          }, {
            reload: true
          });
        },
        function errorCallback(response) {
          $state.go('dashboard.orders.view', {
            orderId: orderId
          }, {
            reload: true
          });
        }
      );
    }

    $scope.deliverOrder = function(orderId) {
      ordersService.deliver(orderId).
      then(
        function successCallback(response) {
          $state.go('dashboard.orders');
        },
        function errorCallback(response) {

        }
      );
    }

    $scope.cancelOrder = function(orderId) {
      ordersService.cancel(orderId).
      then(
        function successCallback(response) {
          $state.go('dashboard.orders');
        },
        function errorCallback(response) {

        }
      );
    }

    $scope.rejectOrder = function(orderId) {
      ordersService.reject(orderId).
      then(
        function successCallback(response) {
          $state.go('dashboard.orders');
        },
        function errorCallback(response) {

        }
      );
    }

    $scope.deleteOrder = function(orderId) {
      ordersService.delete(orderId).
      then(
        function successfullCallback(response) {
          console.log(response);
          loadOrders();
        },
        function errorCallback(response) {
          console.log(response);
        }
      );
    }

    $scope.saveOrder = function(order) {
      ordersService.edit(order).
      then(
        function successfullCallback(response) {
          ordersService.approve(order.id).
          then(
            function successCallback(response) {
              $state.go('dashboard.orders.view', {
                orderId: order.id
              }, {
                reload: true
              });
            },
            function errorCallback(response) {
              //console.log(response.data);
              console.log("redireccionando");
              $state.go('dashboard.orders.view', {
                orderId: order.order.id
              }, {
                reload: true
              });
            });
        },
        function errorCallback(response) {
          console.log(response.data)
        }
      );
    }




    function dateToString(date) {
      var day = (date.date() <= 9) ? ("0" + date.date()) : date.date();
      var month = (date.month() + 1 <= 9) ? ("0" + (date.month() + 1)) : (date.month() + 1);
      return date.year() + "-" + month + "-" + day;
    }



    //AutoComplete

    /*$scope.states        = loadAllItemsAutoComplete();
	    $scope.selectedItem  = null;
	    $scope.searchText    = null;
	    $scope.querySearch   = querySearch;

	    function querySearch (query) {
	      var results = query ? $scope.states.filter( createFilterFor(query) ) : $scope.states;
	      return results;
	    }

	    function createFilterFor(query) {
	      var lowercaseQuery = angular.lowercase(query);

	      return function filterFn(state) {
	        return (state.value.indexOf(lowercaseQuery) === 0);
	      };

	    }

	    function loadAllItemsAutoComplete () {
	    	return itemsService.getAll().map(function (item) {
	    		return{
	    			value: item.name.toLowerCase(),
	    			display: item.name
	    		}
	    	});
	    }*/

  });
