'use strict';

angular.module('bodegaUninorteApp')
  .factory('loginService',  function($http ,$rootScope,$location,sessionService, $localStorage, $cookieStore, urlConstant){    
    return {
      login: function(userData){                                

        return $http({
          method: 'POST',
          url: urlConstant + 'login/',
          data: {email: userData.email, password: userData.password}
        });
                    
      },

      logout: function(){    
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
              $localStorage.auth = {
                  token: null,
                  selected: null
              };      
              $cookieStore.put('token', undefined);
              $location.path('/login');    
            }, function errorCallback(response) {
              console.log('error al logout');
              console.log(response);
            });        
        }
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
      setToken: function (token, remember_me) {
        if(remember_me){
          $localStorage.auth = {
            token: token,
            selected: remember_me
          };            
        }else{
          $cookieStore.put('token', token);           
        }
        sessionService.set('token', token);
      }
    };
  });
