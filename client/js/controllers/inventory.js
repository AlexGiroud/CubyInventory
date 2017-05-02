angular
  .module('app')
  .controller('AllItemsController', ['$scope', 'Items', function ($scope,
    Items) {
    $scope.items = Items.find({
    });
    console.log($scope.items);
  }])
  .controller('AddItemController', ['$scope', 'LoopBackAuth', 'Item',
    '$state', function ($scope, LoopBackAuth, Image, $state) {
      //TODO : Good logic
      $scope.action = 'Add';
      $scope.review = {};
      $scope.url = "/api/upload?access_token="+LoopBackAuth.accessTokenId;
    }])
  .controller('DeleteItemController', ['$scope', 'Item', '$state',
    '$stateParams', function ($scope, Item, $state, $stateParams) {
      Item
        .deleteById({ id: $stateParams.id })
        .$promise
        .then(function () {
          $state.go('all-items');
        });
    }])

  .controller('MyImagesController', ['$scope', 'Image',
    function ($scope, Image) {
      // after a refresh, the currenUser is not immediately on the scope
      // So, we're watching it on the scope and load my reviews only then.
      $scope.$watch('currentUser.id', function (value) {
        if (!value) {
          return;
        }
        $scope.images = Image.find({
          filter: {
            where: {
              userId: $scope.currentUser.id
            }
          }
        });
      });
    }]);
