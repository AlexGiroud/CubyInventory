angular
    .module('app')
    .controller('AllRentController', ['$scope', 'Rent', function ($scope,
        Rent) {
        $scope.rent = Rent.find({});
        console.log($scope.rent);
    }])
    .controller('AddRentController', ['$scope', 'LoopBackAuth', 'Student', 'Rent',
        '$state', function ($scope, LoopBackAuth, Student, Rent, $state) {
            $scope.students = 
            $scope.submitForm = function () {
                Rent
                    .create({
                        "firstName": $scope.student.firstName,
                        "lastName": $scope.student.lastName,
                        "formation": $scope.student.formation
                    })
                    .$promise
                    .then(function () {
                        $state.go('all-student');
                    });
            };
        }])
    .controller('ReturnRentItemController', ['$scope', 'Rent', '$state',
        '$stateParams', function ($scope, Student, $state, $stateParams) {
            Rent
                .findById({ id: $stateParams.rentid })
                .$promise
                .then(function (data) {
                    console.log(data);
                    //TODO change end date
                    //$state.go('all-student');
                });
        }]);