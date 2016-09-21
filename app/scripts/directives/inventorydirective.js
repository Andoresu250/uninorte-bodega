'use strict';

angular.module('bodegaUninorteApp')
  .directive('inventoryDirective', function () {
    return {
      templateUrl: 'views/templates/inventory.tpl.html',
      controller: 'InventoryCtrl'
    };
  });
