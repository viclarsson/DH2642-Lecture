(function() {
    console.log("Initializing routing...");

    app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

        // Nothing and only slash should both go to index
        $urlRouterProvider.when('', '/');
        // If no route match: go to root:
        $urlRouterProvider.otherwise('/');

        $stateProvider
        /*
        *   Active state: When user is interacting with the system
        */
        .state('active', {
            url: "/",
            templateUrl: 'views/active.html'
        });
    }]);

})();
