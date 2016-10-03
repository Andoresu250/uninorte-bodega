'use strict';

angular
  .module('bodegaUninorteApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngMaterial',
    'ngStorage',
    'ui.router',
    'md.data.table',
    'ngMaterialDatePicker'
  ])
  .constant('urlConstant', 'http://localhost:8000/api/v1/')
  .config(function (loginServiceProvider, $stateProvider, $urlRouterProvider) {


    $urlRouterProvider.otherwise("/login");

    $stateProvider.
      state("login",{
        cache: false,
        url: "/login",
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'        
      }).
      state("dashboard",{
        cache: false,
        url: "/dashboard",
        controller: "DashboardCtrl",
        templateUrl: "views/dashboard.html"
      }).
      state("dashboard.statistics",{
        cache: false,
        url: "/statistics",
        controller: "StatisticsCtrl",
        templateUrl: "views/statistics.html"
      }).
      state("dashboard.users",{
        cache: false,
        url: "/users",
        controller: "UsersCtrl",
        template: "<ui-view></ui-view>",
        redirectTo: 'dashboard.users.index'
      }).
      state("dashboard.users.index",{
        cache: false,
        url: "/all",
        controller: "UsersCtrl",
        templateUrl: "views/users.html"
      }).
      state("dashboard.users.new",{
        cache: false,
        url: "/new",
        controller: "UsersCtrl",
        templateUrl: "views/new-user.html"
      }).
      state("dashboard.users.edit",{
        cache: false,
        url: "/{userId}",
        controller: "UsersCtrl",
        templateUrl: "views/edit-user.html"
      }).

      state("dashboard.events",{
        cache: false,
        url: "/eventos",
        controller: "EventsCtrl",
        template: "<ui-view></ui-view>",
        redirectTo: 'dashboard.events.index'
      }).
      state("dashboard.events.index",{
        cache: false,
        url: "/all",
        controller: "EventsCtrl",
        templateUrl: "views/events.html"
      }).
      state("dashboard.events.new",{
        cache: false,
        url: "/new",
        controller: "EventsCtrl",
        templateUrl: "views/new-event.html"
      }).
      state("dashboard.events.edit",{
        cache: false,
        url: "/{eventId}",
        controller: "EventsCtrl",
        templateUrl: "views/edit-event.html"
      }).

      state("dashboard.orders",{
        cache: false,
        url: "/orders",
        //controller: "OrdersCtrl",
        template: "<ui-view></ui-view>",
        redirectTo: 'dashboard.orders.index'
      }).
      state("dashboard.orders.index",{
        cache: false,
        url: "/all",
        controller: "OrdersCtrl",
        templateUrl: "views/orders.html"
      }).
      state("dashboard.orders.new",{
        cache: false,
        url: "/new",
        //controller: "OrdersCtrl",
        templateUrl: "views/new-order.html"
      }).
      state("dashboard.orders.view",{
        cache: false,
        url: "/view/{orderId}",
        //controller: "OrdersCtrl",
        templateUrl: "views/view-order.html"
      }).
      state("dashboard.orders.edit",{
        cache: false,
        url: "/edit/{orderId}",
        //controller: "OrdersCtrl",
        templateUrl: "views/edit-order.html"
      }).

      state("dashboard.inventory",{
        cache: false,
        url: "/inventory",
        controller: "InventoryCtrl",
        template: "<ui-view></ui-view>",
        redirectTo: 'dashboard.inventory.index'
      }).
      state("dashboard.inventory.index",{
        cache: false,
        url: "/all",
        controller: "InventoryCtrl",
        templateUrl: "views/inventory.html"
      }).
      state("dashboard.inventory.new",{
        cache: false,
        url: "/new",
        controller: "InventoryCtrl",
        templateUrl: "views/new-item.html"
      }).
      state("dashboard.inventory.edit",{
        cache: false,
        url: "/{itemId}",
        controller: "InventoryCtrl",
        templateUrl: "views/edit-item.html"
      })

      ;

    
  })
  .run(function(sessionService, $localStorage, $cookieStore, $rootScope, $state, loginService){    

    try{
        if($cookieStore.get('token') !== undefined){
            sessionService.set('token', $cookieStore.get('token'));
            sessionService.set('type', $cookieStore.get('type'));
        }else{
          if($localStorage.auth.token !== null){
            sessionService.set('token', $localStorage.auth.token);
            sessionService.set('type', $localStorage.auth.type);
          }
        }        
    }catch(err){
        
    }

    $rootScope.$on( '$stateChangeStart', function(e, toState  , toParams
                                                   , fromState, fromParams) 
    {
        var isLogin = toState.name === "login";
        if(isLogin && loginService.islogged()){
          e.preventDefault(); // stop current execution
          $state.go('dashboard'); // go to dashboard root
        }

        if(isLogin && !loginService.islogged()){
           return; // no need to redirect 
        }

        // now, redirect only not authenticated       

        if(!loginService.islogged()) {
          e.preventDefault(); // stop current execution
          $state.go('login'); // go to login
        }else {
            
        }
    });

    $rootScope.$on('$stateChangeStart', function(evt, to, params) {
      if (to.redirectTo) {
        evt.preventDefault();
        $state.go(to.redirectTo, params, {location: 'replace'})
      }
    });

  });
