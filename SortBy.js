angular.module('app').directive('sortBy', [
  function () {
    return {
      restrict: 'A',
      scope: {
        sortBy: '=',
        reverseModel: '='
      },

      controller: function ($scope) {
        $scope.sortAttributes = {};

        $scope.setSortClassWithAttribute = function (attribute) {
          var
            sortClass,
            el = $scope.sortAttributes[attribute];
          // remove previous sort classes
          $scope.resetSortClasses();
          // if sortBy already equals attribute, reverse the sort class
          if ($scope.sortBy == attribute) {
            sortClass = $scope.reverseModel ? 'sort-down' : 'sort-up';
            el.addClass(sortClass);
          }
        }
        
        this.onSortClick = function (attribute) {
          if ($scope.sortBy == attribute) {
            // if sortBy already equals attribute, switch reverseModel value 
            $scope.reverseModel = !$scope.reverseModel;
          } else {
            // else set sortBy to the attribute and the reverseModel to default 'false'
            $scope.sortBy = attribute;
            $scope.reverseModel = false;
          }
          // since we are modifying the scope outside of the digest loop, call apply
          $scope.$apply();
        }

        this.registerSortAttribute = function (header) {
          // register each sort attribute with the attribute value and element
          if (!$scope.sortAttributes[header.attribute]) {
            $scope.sortAttributes[header.attribute] = header.el;
          }
        }
      },

      link: function ($scope, $element) {

        $scope.resetSortClasses = function () {
          // find child elements with sort classes and remove them
          $element.find('th').removeClass('sort-up');
          $element.find('th').removeClass('sort-down');
        }

        $scope.onSortByChange = function (value) {
          // called when the sort model updates
          $scope.setSortClassWithAttribute($scope.sortBy);
        }

        // we want to know when sortBy or reverseModel changes to update classes
        $scope.$watch('sortBy', $scope.onSortByChange);
        $scope.$watch('reverseModel', $scope.onSortByChange);
      }

    };
  }
]);

angular.module('app').directive('sortAttribute', [
  function () {
    return {
      restrict: 'A',
      scope: {},
      // sortAttribute requires sortBy as a parent
      require: '^sortBy',

      link: function ($scope, $element, $attrs, sortByCtrl) {
        $element.addClass('sortable');
        $scope.onSortClick = function () {
          // call handler function on sortByCtrl
          sortByCtrl.onSortClick($attrs.sortAttribute);
        }

        sortByCtrl.registerSortAttribute({
          attribute: $attrs.sortAttribute,
          el: $element
        });

        // listen for click event on sortAttribute's element
        $element.on('click', $scope.onSortClick);
      }

    };
  }
]);