'use strict';

angular.module('bodegaUninorteApp')
  .factory('toastService', function ($mdToast) {
    return {
      show: function (message) {
        var pinTo = "top right";
  	    var toast = $mdToast.simple()
  	      .textContent(message)
  	      .action('Cerrar')
  	      .highlightAction(true)
  	      .highlightClass('md-accent')
  	      .position(pinTo);

  	    $mdToast.show(toast).then(function(response) {
  	      if ( response == 'ok' ) {}
  	    });
      }
    };
  });
