'use strict';

angular.module('bodegaUninorteApp')
	.directive('navbarDirective', function () {
	    return {	    		
				templateUrl: 'views/templates/nav-bar.tpl.html',
				controller: 'NavbarCtrl'
			};
	});
