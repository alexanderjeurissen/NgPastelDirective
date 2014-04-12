'use strict';

angular.module('ngPastel', [])

.service('Pastel', [

  function () {
    var hashCode = function (string) {
      return string.split('').reduce(function (a, b) {
        a = ((a << 5) - a) + b.charCodeAt(0);
        b = ((b << 5) - b) + a;
        return a << b;
      }, 0);
    };

    return {
      retrieve: function (string) {
        var rad = function (bitshift) {
          return Math.round(
            ((((hashCode(string) >> bitshift) & 0xFF) + 255) / 2)
          ).toString(16);
        };
        return '#' + rad(24) + rad(16) + rad(8);
      }
    };
  }
])

.directive('pastel', ['Pastel',

  function (Pastel) {

  }
]);
