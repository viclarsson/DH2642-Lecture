(function() {
    console.log("Initializing controllers...");

    controllers.controller("cardsCtrl", ['$scope', 'Card', 'Person', function($scope, Card, Person) {
        $scope.persons = Person.getPersons;
        $scope.getCardsByPersonId = Card.getCardsByPersonId;
    }]);

    controllers.controller("cardCtrl", ['$scope', 'Card', 'Person', function($scope, Card, Person) {

        $scope.activeUser = Person.getActiveUser;
        $scope.getPersonById = Person.getPersonById;
        $scope.toggleActiveCard = Card.toggleActiveCard;
        $scope.activeCard = Card.getActiveCard;
        $scope.setPending = Card.setPending;
        $scope.setDone = Card.setDone;

        $scope.removeCard = function(id) {
            console.log("Removing:", id);
            var r = confirm("Are you sure?");
            if(r) {
                Card.removeCardById(id);
            }
        };

    }]);

    controllers.controller("addCardCtrl", ['$scope', 'Card', 'Person', function($scope, Card, Person) {
        $scope.activeAdd = Person.getActiveAddId;
        $scope.activeUser = Person.getActiveUser;
        $scope.toggleActiveAddId = Person.toggleActiveAddId;

        $scope.card = {
            text: "",
            priority: false
        };

        $scope.addCard = function() {
            console.log("Adding!", $scope.card, $scope.activeAdd());
            Card.addCard($scope.card.text, $scope.card.priority, $scope.activeAdd(), $scope.activeUser());
            $scope.card = {
                text: "",
                priority: false
            };
            Person.toggleActiveAddId(Person.getActiveAddId());
        };
    }]);

    controllers.controller("personCtrl", ['$scope', 'Card', 'Person', function($scope, Card, Person) {
        $scope.activeUser = Person.getActiveUser;
        $scope.getCardsByPersonId = Card.getCardsByPersonId;
        $scope.toggleActiveAddId = Person.toggleActiveAddId;
    }]);

    controllers.controller("idleCtrl", ['$scope', 'Card', 'Person', function($scope, Card, Person) {
        $scope.activeUser = Person.getActiveUser;
        $scope.setActiveUser = Person.setActiveUser;
        $scope.persons = Person.getPersons;
        $scope.getCardsByPersonId = Card.getCardsByPersonId;

        $scope.colors = Person.getColors();
        $scope.color = 0;

        $scope.toggleColor = function() {
            $scope.color = $scope.color + 1;
            $scope.color = $scope.color % $scope.colors.length;
        };

        $scope.person = {
            name: ""
        };

        $scope.addPerson = function() {
            Person.addPerson({
                id: Date.now(),
                name: $scope.person.name,
                color: $scope.colors[$scope.color]
            });
            $scope.person = {
                name: ""
            };
            $scope.color = 0;
        };

        $scope.removePerson = function(id) {
            console.log("Removing:", id);
            var r = confirm("Are you sure?");
            if(r) {
                Person.removePersonById(id);
            }
        };

    }]);

    controllers.controller("sidebarCtrl", ['$scope', 'Card', 'Person', 'Idle', function($scope, Card, Person, Idle) {
        $scope.cards = Card.getDoneCards;
        $scope.setActiveUser = Person.setActiveUser;

        $scope.$on('IdleStart', function() {
            Person.setActiveUser(null);
        });
    }]);

})();
