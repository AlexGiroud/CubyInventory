angular
  .module('app', [
    'ui.router',
    'lbServices'
  ])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider,
      $urlRouterProvider) {
    $stateProvider
      .state('all-items', {
        url: '/all-items',
        templateUrl: 'views/image-form.html',
        controller: 'AllItemsController',
        authenticate: true
      })
      .state('add-item', {
        url: '/add-item',
        controller: 'AddItemController',
        authenticate: true
      })
      .state('delete-item', {
        url: '/delete-item/:id',
        controller: 'DeleteItemController',
        authenticate: true
      })
      .state('all-student', {
        url: '/all-student',
        templateUrl: 'views/all-images.html',
        controller: 'AllStudentController'
      })
      .state('add-student', {
        url: '/add-student',
        templateUrl: 'views/all-images.html',
        controller: 'AddStudentController'
      })
      .state('delete-student', {
        url: '/delete-student/:id',
        templateUrl: 'views/all-images.html',
        controller: 'DeleteStudentController'
      })
      .state('add-student-deposit', {
        url: '/add-student-deposit',
        templateUrl: 'views/all-images.html',
        controller: 'AddStudentDepositController'
      })
      .state('forbidden', {
        url: '/forbidden',
        templateUrl: 'views/forbidden.html',
      })
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'AuthLoginController'
      })
      .state('logout', {
        url: '/logout',
        controller: 'AuthLogoutController'
      })
      .state('add-rent', {
        url: '/add-rent',
        templateUrl: 'views/my-images.html',
        controller: 'AddRentController',
        authenticate: true
      })
      .state('all-rent', {
        url: '/all-rent',
        templateUrl: 'views/my-images.html',
        controller: 'AllRentController',
        authenticate: true
      })
      .state('return', {
        url: '/return/:rentid',
        templateUrl: 'views/my-images.html',
        controller: 'RentItemController',
        authenticate: true
      });
    $urlRouterProvider.otherwise('login');
  }])
  .run(['$rootScope', '$state', 'LoopBackAuth', 'AuthService', function($rootScope, $state, LoopBackAuth, AuthService) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
      // redirect to login page if not logged in
      if (toState.authenticate && !LoopBackAuth.accessTokenId) {
        event.preventDefault(); //prevent current page from loading

        // Maintain returnTo state in $rootScope that is used
        // by authService.login to redirect to after successful login.
        // http://www.jonahnisenson.com/angular-js-ui-router-redirect-after-login-to-requested-url/
        $rootScope.returnTo = {
          state: toState,
          params: toParams
        };

        $state.go('forbidden');
      }
    });

    // Get data from localstorage after pagerefresh
    // and load user data into rootscope.
    if (LoopBackAuth.accessTokenId && !$rootScope.currentUser) {
      AuthService.refresh(LoopBackAuth.accessTokenId);
    }
  }]);