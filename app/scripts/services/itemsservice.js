'use strict';

angular.module('bodegaUninorteApp')
  .factory('itemsService', function ($http, sessionService, urlConstant) {
    return {
      new: function (itemData) {        
        return $http({
          method: 'POST',
          url: urlConstant + 'items/',
          data: { name: itemData.name,
                  item_type_id: itemData.item_type_id,
                  number: itemData.number,
                  price: itemData.price,
                  recorder: itemData.reorder,
                  min_stock: itemData.min_stock },
          headers:{ 'Authorization': sessionService.get('token') , 'Accept': 'Aplication/json'}
        });
      },
      all: function () {
        return $http({
          method: 'GET',
          url: urlConstant + 'items/',
          headers:{ 'Authorization': sessionService.get('token') , 'Accept': 'Aplication/json'}
        });
      },
      get: function (id) {
        return $http({
          method: 'GET',
          url: urlConstant + 'items/' + id,          
          headers:{ 'Authorization': sessionService.get('token') , 'Accept': 'Aplication/json'}
        });
      },
      getItemsType: function () {
        return $http({
          method: 'GET',
          url: urlConstant + 'itemsType/',
          headers:{ 'Authorization': sessionService.get('token') , 'Accept': 'Aplication/json'}
        });
      },
      edit: function (itemData) {
        return $http({
          method: 'PUT',
          url: urlConstant + 'items/' + itemData.id,        
          data: { name: itemData.name,
                  item_type_id: itemData.item_type_id,
                  number: itemData.number,
                  price: itemData.price,
                  recorder: itemData.recorder,
                  min_stock: itemData.min_stock },
          headers:{ 'Authorization': sessionService.get('token') , 'Accept': 'Aplication/json'}
        });
      },
      delete: function (id) {
        return $http({
          method: 'DELETE',
          url: urlConstant + 'items/' + id,          
          headers:{ 'Authorization': sessionService.get('token') , 'Accept': 'Aplication/json'}
        });
      }
    };  
  });
