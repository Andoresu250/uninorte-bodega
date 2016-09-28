'use strict';

angular.module('bodegaUninorteApp')
  .factory('eventsService', function ($http, sessionService, urlConstant) {    
    return {
      new: function (eventData) {        
        return $http({
          method: 'POST',
          url: urlConstant + 'events/',
          data: { name: eventData.name,
                  start_date: eventData.start_date,
                  finish_date: eventData.finish_date,
                  start_time: eventData.start_time,
                  finish_time: eventData.finish_time,
                  location: eventData.location,
                  place: eventData.place },
          headers:{ 'Authorization': sessionService.get('token') , 'Accept': 'aplication/json'}
        });
      },
      all: function () {
        return $http({
          method: 'GET',
          url: urlConstant + 'events/',
          headers:{ 'Authorization': sessionService.get('token') , 'Accept': 'aplication/json'}
        });
      },
      get: function (id) {
        return $http({
          method: 'GET',
          url: urlConstant + 'events/' + id,          
          headers:{ 'Authorization': sessionService.get('token') , 'Accept': 'aplication/json'}
        });
      },
      edit: function (eventData) {
        return $http({
          method: 'PUT',
          url: urlConstant + 'events/' + eventData.id,        
          data: { name: eventData.name,
                  start_date: eventData.start_date,
                  finish_date: eventData.finish_date,
                  start_time: eventData.start_time,
                  finish_time: eventData.finish_time,
                  location: eventData.location,
                  place: eventData.place },
          headers:{ 'Authorization': sessionService.get('token') , 'Accept': 'aplication/json'}
        });
      },
      delete: function (id) {
        return $http({
          method: 'DELETE',
          url: urlConstant + 'events/' + id,          
          headers:{ 'Authorization': sessionService.get('token') , 'Accept': 'aplication/json'}
        });
      }
    };
  });
