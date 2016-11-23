'use strict';

angular.module('bodegaUninorteApp')
  .factory('loginService',  function($http ,$rootScope,$location,sessionService, $localStorage, $cookieStore, urlConstant, $state){
    return {
      login: function(userData){

        return $http({
          method: 'POST',
          url: urlConstant + 'login/',
          data: {email: userData.email, password: userData.password}
        });

      },

      logout: function(){
        console.log("saliendo");
        var sw = false;
        try {
          sw = ($cookieStore.get('token') !== undefined || $localStorage.auth.token !== null) && ($cookieStore.get('token') !== 'null' || $localStorage.auth.token !== 'null')
        } catch(e) {}
        if (sw){
          $http({
            method: 'DELETE',
            url: urlConstant + 'logout/',
            headers:{
              'Authorization': sessionService.get('token')
            }
          }).then(function successCallback(response) {
              sessionService.destroy('token');
              sessionService.destroy('type');
              $localStorage.auth = {
                  token: null,
                  selected: null,
                  type: null
              };
              $cookieStore.put('token', undefined);
              $cookieStore.put('type', undefined);
              $location.path('/login');
            }, function errorCallback(response) {
              console.log('error al logout');
              sessionService.destroy('token');
              sessionService.destroy('type');
              $localStorage.auth = {
                  token: null,
                  selected: null,
                  type: null
              };
              $cookieStore.put('token', undefined);
              $cookieStore.put('type', undefined);
            });
        }
        console.log("redireccionando");
        $state.go('login');
      },
      islogged:function(){
        if(sessionService.get('token')){
          return true;
        }
        else{
          try{
            return ($cookieStore.get('token') !== undefined || $localStorage.auth.token !== null) && ($cookieStore.get('token') !== 'null' || $localStorage.auth.token !== 'null') ;
          }catch(err){
            this.logout();
            return false;
          }
        }

      },
      setToken: function (token, type ,remember_me) {
        if(remember_me){
          $localStorage.auth = {
            token: token,
            type: type,
            selected: remember_me
          };
        }else{
          $cookieStore.put('token', token);
          $cookieStore.put('type', type);
        }
        sessionService.set('token', token);
        sessionService.set('type', type);
      }
    };
  });
