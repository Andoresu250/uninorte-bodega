'use strict';

angular.module('bodegaUninorteApp')
	.directive('sidebarDirective', function () {
    	return {	    		
				templateUrl: 'views/templates/side-bar.tpl.html',
				controller: 'SidenavCtrl'
			};
  	});
