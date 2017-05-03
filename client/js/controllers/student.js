angular
    .module('app')
    .controller('AllStudentController', ['$scope', 'Student', 'Deposit', 'Rent', function ($scope,
        Student, Deposit, Rent) {
        var Depo = Deposit.find({});
        var Rent = Rent.find({});
        var Students = [];
        Student.find({}).$promise.then(function (data) {
            data.forEach(function (s) {
                console.log(s);
                var student = s;
                student.deposits = Depo.filter(function (e) {
                    return e.studentId === s.id;
                });
                student.rents = Rent.filter(function (e) {
                    return e.studentId === s.id;
                });
                Students.push(student);
            })
        });
        $scope.student = Students;
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
            $scope.submitForm = function () {
                Deposit
                    .create({
                        "amount": $scope.amount,
                        "date": $scope.date,
                        "studentId": $stateParams.id
                    }).$promise
                    .then(function () {
                        $state.go('all-student');
                    });
            }

        }]);
