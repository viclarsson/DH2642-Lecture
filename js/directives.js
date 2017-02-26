(function() {
    console.log("Initializing directives...");

    /*
    *   Idle modal
    */
    app.directive("idleModal", [function() {
        return {
            restrict: "E",
            scope: true,
            templateUrl: 'views/idle.html',
            controller: 'idleCtrl'
        };
    }]);

    /*
    *   Long click directive
    */
    app.directive("onLongClick", ['$timeout', function($timeout) {
        return {
            restrict: "A",
            link: function(scope, elem, attrs) {
                scope.press = false;
                elem.bind('mousedown', function() {
                    scope.press = true;
                    $timeout(function () {
                        if(scope.press) {
                            scope.$eval(attrs.onLongClick);
                        }
                    }, 600);
                });
                elem.bind('mouseup', function() {
                    scope.press = false;
                });
            }
        };
    }]);

    /*
    *   Card directive
    */
    app.directive("card", [function() {
        return {
            restrict: "E",
            scope: {
                data: "=" // Assign attribute data to the isolated scope
            }, // Isolated scope.
            templateUrl: 'views/partials/card.html',
            controller: 'cardCtrl'
        };
    }]);

    /*
    *   Add card form directive
    */
    app.directive("addCard", [function() {
        return {
            restrict: "E",
            scope: true, // Isolate scope
            templateUrl: 'views/partials/add-card-form.html',
            controller: 'addCardCtrl'
        };
    }]);

    /*
    *   Directive for person header
    */
    app.directive("personHeader", [function() {
        return {
            restrict: "E",
            scope: {
                data: "=" // Assign attribute data to the isolated scope
            }, // Isolated scope.
            templateUrl: 'views/partials/person-header.html',
            controller: 'personCtrl'
        };
    }]);

    /*
    *   Count ToDos
    *   The directive attribute takes the count. Neat!
    */
    app.directive("countTodos", [function() {
        return {
            restrict: "A",
            scope: {
                countTodos: "=", // Assign attribute countTodos to the isolated scope
                countTodosSuffix: "="
            }, // Isolated scope.
            templateUrl: 'views/partials/countTodos.html'
        };
    }]);
})();
