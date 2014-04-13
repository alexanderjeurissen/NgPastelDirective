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
            ((((hashCode(string) >> bitshift) & 0xFF) + 255) / 2)).toString(16);
        };
        return '#' + rad(24) + rad(16) + rad(8);
      }
    };
  }
])

.directive('ngPastel', ['Pastel',

  function (Pastel) {
    return {
      restrict: 'A',
      // observe and manipulate the DOM
      link: function ($scope, element, attrs) {
        if (!attrs.retrieveFrom || !attrs.applyTo) {
          return false;
        }
        var sourceValue = attrs.retrieveFrom.split('::')[1];

        switch (attrs.retrieveFrom.split('::')[0]) {
        case 'attr':
          attrs.$observe(sourceValue, function (value) {
            element.css(attrs.applyTo, Pastel.retrieve(value + ''));
          });
          return false;
        case 'prop':
          var value = element[0][sourceValue];
          element.css(attrs.applyTo, Pastel.retrieve(value + ''));
          return false;
        default:
          attrs.$observe('retrieveFrom', function (value) {
            element.css(attrs.applyTo, Pastel.retrieve(value + ''));
          });
          return false;
        }
      }
    };
  }
]);

