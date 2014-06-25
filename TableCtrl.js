angular.module('app', []);
angular.module('app').controller('TableCtrl', [
  '$scope',
  function ($scope) {
    $scope.users = [{
      name: 'Jake',
      color: 'Blue',
      age: '27'
    }, {
      name: 'John',
      color: 'Red',
      age: '24'
    }, {
      name: 'G. Heimer',
      color: 'Green',
      age: '43'
    }, {
      name: 'Smith',
      color: 'Purple',
      age: '36'
    }];
    
    // default sort attribute and starting direction
    $scope.sort = {
      attribute:'name',
      reverse: false
    };
  }
]);