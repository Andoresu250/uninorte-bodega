'use strict';

describe('Directive: inventoryDirective', function () {

  // load the directive's module
  beforeEach(module('bodegaUninorteApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<inventory-directive></inventory-directive>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the inventoryDirective directive');
  }));
});
