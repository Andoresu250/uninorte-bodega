'use strict';

/**
 * @ngdoc service
 * @name bodegaUninorteApp.itemsService
 * @description
 * # itemsService
 * Factory in the bodegaUninorteApp.
 */
angular.module('bodegaUninorteApp')
  .factory('itemsService', function () {
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
