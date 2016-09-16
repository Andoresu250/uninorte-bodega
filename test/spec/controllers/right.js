'use strict';

describe('Controller: RightCtrl', function () {

  // load the controller's module
  beforeEach(module('bodegaUninorteApp'));

  var RightCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RightCtrl = $controller('RightCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(RightCtrl.awesomeThings.length).toBe(3);
  });
});
