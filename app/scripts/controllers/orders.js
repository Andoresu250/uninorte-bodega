'use strict';

angular.module('bodegaUninorteApp')
	.controller('OrdersCtrl', function ($scope, eventsService, itemsService, $mdDialog, $state, $stateParams) {


		$scope.neworder = {};
		$scope.neworder.orderType = undefined;
		$scope.neworder.orderType = 1;
		$scope.neworder.items = [];

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

		$scope.resetOrder = function() {			
			$scope.neworder.items = [];
			loadItems($scope.neworder.orderType);
		}


		function loadItems (typeId) {
			itemsService.getByType(typeId).
				then(
					function successCallback (response) {                               
						$scope.items = [];
						response.data.data.items.map(function (item) {
							if(item.itemType_id == typeId){
								$scope.items.push(item);
							}
						});                        
					},
					function errorCallback (response) {
						$scope.items = [];
					}
	        	);	
		}	
		
		$scope.loadItems = loadItems;		
		loadItems($scope.neworder.orderType);

		itemsService.getItemsType().
			then(
				function successCallback(response) {
					$scope.itemsTypes = response.data.data.item_types;					
				},
				function errorCallback(response) {
					console.log(response);
				}
			);

		function loadEvents() {
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

		$scope.addItemToOrder = function (item) {        
	        var idx = $scope.isItem(item);
	        // is currently selected
	        if (idx > -1) {          
          		$scope.neworder.items.splice(idx, 1);
	        }
	        // is newly selected
	        else {          
	          	$scope.neworder.items.push(angular.copy(item));
	        }   

	        console.log($scope.neworder.items);     
     	};

     	

     	function isItem (item) {
     		for (var i = 0; i < $scope.neworder.items.length; i++) {
          		if($scope.neworder.items[i].id === item.id){
	            	return i
	          	}          
	        }
	        return -1;	
     	}

     	$scope.isItem = isItem;

     	$scope.test = function (neworder) {
     		console.log(neworder);
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
