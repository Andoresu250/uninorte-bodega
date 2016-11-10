'use strict';

describe('Service: statisticsService', function () {

  // load the service's module
  beforeEach(module('bodegaUninorteApp'));

  // instantiate service
  var statisticsService;
  beforeEach(inject(function (_statisticsService_) {
    statisticsService = _statisticsService_;
  }));

  it('should do something', function () {
    expect(!!statisticsService).toBe(true);
  });

});
