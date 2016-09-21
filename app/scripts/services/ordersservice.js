'use strict';

/**
 * @ngdoc service
 * @name bodegaUninorteApp.ordersService
 * @description
 * # ordersService
 * Factory in the bodegaUninorteApp.
 */
angular.module('bodegaUninorteApp')
  .factory('ordersService', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
