angular
  .module('app')
  .controller('AllItemsController', ['$scope', 'Items', function ($scope,
    Items) {
    $scope.items = Items.find({});
    console.log($scope.items);
  }])
  .controller('AddItemController', ['$scope', 'LoopBackAuth', 'Item',
    '$state', function ($scope, LoopBackAuth, Item, $state) {
      $scope.submitForm = function() {
      Item
        .create({
          price: $scope.item.price,
          name: $scope.item.name,
          barcode: $scope.item.barcode
        })
        .$promise
        .then(function() {
          $state.go('all-items');
        });
      };
    }])
  .controller('DeleteItemController', ['$scope', 'Item', '$state',
    '$stateParams', function ($scope, Item, $state, $stateParams) {
      Item
        .deleteById({ id: $stateParams.id })
        .$promise
        .then(function () {
          $state.go('all-items');
        });
    }]);
