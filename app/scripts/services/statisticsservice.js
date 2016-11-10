'use strict';

angular.module('bodegaUninorteApp')
  .factory('statisticsService', function ($http, sessionService, urlConstant) {
    return{
      get: function (data) {
        return $http({
          method: 'POST',
          url: urlConstant + 'historic/search',
          data: data,
          headers:{ 'Authorization': sessionService.get('token') , 'Accept': 'aplication/json'}
        });
      },
      all: function () {
        return $http({
          method: 'GET',
          url: urlConstant + 'historic/',          
          headers:{ 'Authorization': sessionService.get('token') , 'Accept': 'aplication/json'}
        });
      }
    };
  });
