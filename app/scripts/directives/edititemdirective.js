'use strict';

angular.module('bodegaUninorteApp')
  .directive('edititemDirective', function () {
    return {
      templateUrl: 'views/templates/edit-item.tpl.html',
      controller: 'InventoryCtrl'
    };
  });
