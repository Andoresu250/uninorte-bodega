'use strict';

describe('Service: ordersService', function () {

  // load the service's module
  beforeEach(module('bodegaUninorteApp'));

  // instantiate service
  var ordersService;
  beforeEach(inject(function (_ordersService_) {
    ordersService = _ordersService_;
  }));

  it('should do something', function () {
    expect(!!ordersService).toBe(true);
  });

});
