'use strict';

angular.module('bodegaUninorteApp')
  .controller('ReturnCtrl', function ($scope, sessionService, ordersService, $mdDialog, $state, $stateParams) {
    $scope.role = sessionService.get("type");
    $scope.showload = true;

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
      $scope.ordersDone = [];
      $scope.ordersPending = [];
      ordersService.all().
        then(
          function successCallback(response) {
            $scope.showload = false;
            var ordersDone = [];
            var ordersPending = [];
            var items = [];
            response.data.data.orders.map(function (order) {
              items = getReturnableItems(order);
              if(order.order_status === "Entregado" && order.type !== "consumible" && items.length != 0){
                order.items = items;
                ordersPending.push(order);
              }else if(order.order_status === "Entregado" && order.type !== "consumible" && items.length == 0){
                ordersDone.push(order);
              }
            });
            $scope.ordersDone = ordersDone;
            $scope.ordersPending = ordersPending;
          },
          function errorCallback(response) {
            $scope.showload = false;
          }
        );
    };

    $scope.openAddNumber = function(ev, item, order) {
		    $mdDialog.show({
		      controller: DialogController,
		      templateUrl: '/views/modals/add-item-number-return-dialog.html',
		      parent: angular.element(document.body),
		      targetEvent: ev,
		      clickOutsideToClose:true,
		      fullscreen: true,
          locals: {
            item : item
          }
		    })
		    .then(function(answer) {
		    	item.number = answer;
		      	ordersService.addReturn(order.id, item.id, answer).
		      		then(
		      			function successfullCallback(response) {
									console.log(response)
		      				$state.go('dashboard.orders.return.view',{orderId: order.id}, {reload: true});
		      			},
		      			function errorCallback(response) {
									console.log(response)
		      			}
	      			);
		    }, function() {

		    });
	  };

    function DialogController($scope, $mdDialog, item) {
        $scope.item = item;
        $scope.hide = function() {
          $mdDialog.hide();
        };

        $scope.cancel = function() {
          $mdDialog.cancel();
        };

        $scope.add = function(number) {
          $mdDialog.hide(number);
        };
      }




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



  });
