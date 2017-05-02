angular
    .module('app')
    .controller('AllStudentController', ['$scope', 'Student', function ($scope,
        Students) {
        $scope.students = Students.find({});
        console.log($scope.students);
    }])
    .controller('AddStudentController', ['$scope', 'LoopBackAuth', 'Student',
        '$state', function ($scope, LoopBackAuth, Student, $state) {
            $scope.submitForm = function () {
                Student
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
