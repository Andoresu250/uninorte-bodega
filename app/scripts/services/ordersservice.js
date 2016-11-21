'use strict';

angular.module('bodegaUninorteApp')
  .factory('ordersService', function($http, sessionService, urlConstant) {

    return {

      new: function(orderData) {
        return $http({
          method: 'POST',
          url: urlConstant + 'orders/',
          headers: {
            Authorization: sessionService.get('token'),
            'accept': 'aplication/json'
          },
          data: {
            name_client: orderData.name,
            items: JSON.stringify(orderData.items.map(function(item) {
              return {
                id: item.id,
                date: item.returnDate,
                number: item.orderNumber
              }
            })),
            event_id: orderData.event,
            order_status_id: 1,
            type: orderData.type,
            comment: orderData.comment
          }
        });
      },
      all: function() {
        return $http({
          method: 'GET',
          url: urlConstant + 'orders/',
          headers: {
            'Authorization': sessionService.get('token'),
            'Accept': 'aplication/json'
          }
        });
      },
      allReturns: function () {
        return $http({
          method: 'GET',
          url: urlConstant + 'devoluciones/',
          headers: {
            'Authorization': sessionService.get('token'),
            'Accept': 'aplication/json'
          }
        });
      },
      get: function(id) {
        return $http({
          method: 'GET',
          url: urlConstant + 'orders/' + id,
          headers: {
            'Authorization': sessionService.get('token'),
            'Accept': 'aplication/json'
          }
        });
      },
      edit: function(orderData) {
        return $http({
          method: 'PUT',
          url: urlConstant + 'orders/' + orderData.id,
          data: {
            name_client: orderData.name_client,
            items: JSON.stringify(orderData.items.map(function(item) {
              return {
                id: item.id,
                date: (item.returnDate === undefined) ? ("") : (item.returnDate),
                number: item.orderNumber
              }
            })),
            event_id: orderData.event_id,
            order_status_id: 1,
            type: orderData.type,
            comment: orderData.comment
          },
          headers: {
            'Authorization': sessionService.get('token'),
            'Accept': 'aplication/json'
          }
        });
      },
      delete: function(id) {
        return $http({
          method: 'DELETE',
          url: urlConstant + 'orders/' + id,
          headers: {
            'Authorization': sessionService.get('token'),
            'Accept': 'aplication/json'
          }
        });
      },
      approve: function(id) {
        return $http({
          method: 'POST',
          url: urlConstant + 'orders/' + id + '/aprobar',
          headers: {
            'Authorization': sessionService.get('token'),
            'Accept': 'aplication/json'
          }
        });
      },
      deliver: function(id) {
        return $http({
          method: 'POST',
          url: urlConstant + 'orders/' + id + '/entregar',
          headers: {
            'Authorization': sessionService.get('token'),
            'Accept': 'aplication/json'
          }
        });
      },
      cancel: function(id) {
        return $http({
          method: 'POST',
          url: urlConstant + 'orders/' + id + '/cancelar',
          headers: {
            'Authorization': sessionService.get('token'),
            'Accept': 'aplication/json'
          }
        });
      },
      reject: function(id) {
        return $http({
          method: 'POST',
          url: urlConstant + 'orders/' + id + '/rechazar',
          headers: {
            'Authorization': sessionService.get('token'),
            'Accept': 'aplication/json'
          }
        });
      },
      search: function(status_id) {
        return $http({
          method: 'POST',
          url: urlConstant + 'orders/search?status_id=' + status_id,
          headers: {
            'Authorization': sessionService.get('token'),
            'Accept': 'aplication/json'
          }
        });
      },
      addReturn: function (orderId, item_id, number, comment) {
        return $http({
          method: 'POST',
          url: urlConstant + 'orders/' + orderId + '/devolucion',
          headers: {
            'Authorization': sessionService.get('token'),
            'Accept': 'aplication/json'
          },
          data: {
            item_id: item_id,
            number: number,
            comment: comment
          }
        });
      }
    };
  });
