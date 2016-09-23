'use strict';

angular.module('bodegaUninorteApp')
  .factory('eventsService', function ($http, sessionService, urlConstant) {    
    return {
      new: function (eventData) {        
        return $http({
          method: 'POST',
          url: urlConstant + 'events/',
          data: { name: eventData.name,
                  date: "2016-01-01" },
          headers:{ 'Authorization': sessionService.get('token') , 'Accept': 'Aplication/json'}
        });
      },
      all: function () {
        return $http({
          method: 'GET',
          url: urlConstant + 'events/',
          headers:{ 'Authorization': sessionService.get('token') , 'Accept': 'Aplication/json'}
        });
      },
      get: function (id) {
        return $http({
          method: 'GET',
          url: urlConstant + 'events/' + id,          
          headers:{ 'Authorization': sessionService.get('token') , 'Accept': 'Aplication/json'}
        });
      },
      edit: function (eventData) {
        return $http({
          method: 'PUT',
          url: urlConstant + 'events/' + eventData.id,        
          data: { name: eventData.name, date: eventData.date },
          headers:{ 'Authorization': sessionService.get('token') , 'Accept': 'Aplication/json'}
        });
      },
      delete: function (id) {
        return $http({
          method: 'DELETE',
          url: urlConstant + 'events/' + id,          
          headers:{ 'Authorization': sessionService.get('token') , 'Accept': 'Aplication/json'}
        });
      }
    };
  });
