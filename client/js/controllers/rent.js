angular
    .module('app')
    .controller('AllRentController', ['$scope', 'Rent', function ($scope,
        Rent) {
        $scope.rent = Rent.find({});
        console.log($scope.rent);
    }])
    .controller('AddRentController', ['$scope', 'LoopBackAuth', 'Student', 'Rent',
        '$state', function ($scope, LoopBackAuth, Student, Rent, $state) {
            $scope.selectedStudent;
            $scope.students = [];
            Student
                .find()
                .$promise
                .then(function (students) {
                    $scope.students = students;
                    $scope.selectedStudent = $scope.selectedStudent;
                });
            $scope.submitForm = function () {
                //TODO RENT LOGIQUE
                //console.log($scope.selectedStudent);
                Rent
                    .create({
                        "start": $scope.rent.start,
                        "studentId": $scope.selectedStudent
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