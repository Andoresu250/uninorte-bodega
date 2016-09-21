'use strict';


angular.module('bodegaUninorteApp')
  .directive('statisticsDirective', function () {
    return {
      templateUrl: 'views/templates/statistics.tpl.html',      
      controller: 'StatisticsCtrl'
    };
  });
