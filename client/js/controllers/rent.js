angular
    .module('app')
    .controller('AllRentController', ['$scope', 'Rent', function ($scope,
        Rent) {
        $scope.rent = Rent.find({});
        console.log($scope.rent);
    }])
    .controller('AddStudentController', ['$scope', 'LoopBackAuth', 'Rent',
        '$state', function ($scope, LoopBackAuth, Rent, $state) {
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
    .controller('DeleteStudentController', ['$scope', 'Student', '$state',
        '$stateParams', function ($scope, Student, $state, $stateParams) {
            Student
                .deleteById({ id: $stateParams.id })
                .$promise
                .then(function () {
                    $state.go('all-student');
                });
        }])
    .controller('AddStudentDepositController', ['$scope', 'Student', 'Deposit', '$state',
        '$stateParams', function ($scope, Student, Deposit, $state, $stateParams) {
            //TODO logique
        }]);
