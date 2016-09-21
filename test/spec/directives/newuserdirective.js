'use strict';

describe('Directive: newuserDirective', function () {

  // load the directive's module
  beforeEach(module('bodegaUninorteApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<newuser-directive></newuser-directive>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the newuserDirective directive');
  }));
});
