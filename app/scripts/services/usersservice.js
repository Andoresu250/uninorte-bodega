'use strict';

angular.module('bodegaUninorteApp')
  .factory('usersService', function ($http, sessionService, urlConstant) {    
    return {
      new: function (userData) {
        return $http({
          method: 'POST',
          url: urlConstant + 'users/',
          data: { email: userData.email, name: userData.name, password: userData.password, type: userData.type },
          headers:{ 'Authorization': sessionService.get('token') }
        });
      },
      all: function () {
        return $http({
          method: 'GET',
          url: urlConstant + 'users/',
          headers:{ 'Authorization': sessionService.get('token') }
        });
      },
      get: function (id) {
        return $http({
          method: 'GET',
          url: urlConstant + 'users/' + id,          
          headers:{ 'Authorization': sessionService.get('token') }
        });
      },
      edit: function (userData) {
        return $http({
          method: 'PUT',
          url: urlConstant + 'users/' + userData.id,        
          data: { email: userData.email, name: userData.name, password: userData.password, type: userData.type },  
          headers:{ 'Authorization': sessionService.get('token') }
        });
      },
      delete: function (id) {
        return $http({
          method: 'DELETE',
          url: urlConstant + 'users/' + id,          
          headers:{ 'Authorization': sessionService.get('token') }
        });
      }
    };
  });
