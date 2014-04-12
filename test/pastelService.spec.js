'use strict';

describe('Service: pastel', function () {

  var pastel;
  beforeEach(module('ngPastel'));
  beforeEach(inject(function (_Pastel_) {
    pastel = _Pastel_;
  }));

  it('should return a hashString that starts with #', function () {
    expect(pastel.retrieve('test')[0]).toEqual('#');
  });

  it("should return a hashString with a length of 7 characters", function () {
    expect(pastel.retrieve('test').length).toEqual(7);
  });

  it('should return a string when retrieve is called', function () {
    expect(typeof pastel.retrieve('test')).toBe('string');
  });

  it("should always return the same hashString if the algorithm is the same", function () {
    var A = pastel.retrieve('test');
    var B = pastel.retrieve('test');
    expect(A).toEqual(B);
  });

});
