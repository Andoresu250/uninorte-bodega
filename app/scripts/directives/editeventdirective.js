'use strict';

angular.module('bodegaUninorteApp')
	.directive('editeventDirective', function () {
		return {
	      templateUrl: 'views/templates/edit-event.tpl.html',
	      controller: 'EventsCtrl'
	    };
	});
