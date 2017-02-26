(function() {
    console.log("Initializing services...");

    /*
    *   Person Model
    */
    services.factory('Person', [function() {
        // Sample data!
        var DATA_KEY = "PERSON_MODEL";
        var addId = null;
        var activeUser = null;
        var persons = [];
        var colors = ["#ECDFBD", "#20457C", "#3B3A35", "#FB6648", "#5E3448"];

        // Load data from localStorage
        var loadData = function() {
            var temp = localStorage.getItem(DATA_KEY);
            console.log("Got data...", temp);
            if(temp) {
                persons = JSON.parse(temp);
            }
        };

        // Save data to localStorage
        var saveData = function() {
            console.log("Saving data...", persons);
            localStorage.setItem(DATA_KEY, JSON.stringify(persons));
        };

        // Get the colors
        var getColors = function() {
            return colors;
        };

        // Toggle the active person id which a user is currently adding to
        var toggleActiveAddId = function(id) {
            console.log("Setting active add:", id);
            if(addId == id) {
                addId = null;
            } else {
                addId = id;
            }
        };

        // Get the active id of the person who's card should be added to
        var getActiveAddId = function() {
            return addId;
        };

        // Set the active user
        var setActiveUser = function(id) {
            activeUser = id;
        };

        // Get the active user
        var getActiveUser = function() {
            return activeUser;
        };

        // Get all persons
        var getPersons = function() {
            return persons;
        };

        // Get a person by its id
        var getPersonById = function(id) {
            for(var i in persons) {
                if(persons[i].id == id) {
                    return persons[i];
                }
            }
            // If not found, return null!
            return null;
        };

        // Add a person (data is provided)
        var addPerson = function(person) {
            persons.push(person);
            // Call save data as data is changed!
            saveData();
        };

        // Remove a person by its id
        var removePersonById = function(id) {
            var index = null;
            for(var i in persons) {
                if(persons[i].id == id) {
                    index = i;
                    break;
                }
            }
            if(index) {
                // Remove the index-th from the persons array
                persons.splice(index, 1);
            }
            // Call save data as data is changed!
            saveData();
        };


        // Load initial data!
        // This function runs once as the Factory is a singleton!
        loadData();

        // Expose an API which is used by controllers.
        return {
            getPersons: getPersons,
            getPersonById: getPersonById,
            addPerson: addPerson,
            removePersonById: removePersonById,
            toggleActiveAddId: toggleActiveAddId,
            getActiveAddId: getActiveAddId,
            setActiveUser: setActiveUser,
            getActiveUser: getActiveUser,
            getColors: getColors
        };
    }]);

    /*
    *   Cards Model
    */
    services.factory('Card', [function() {
        var DATA_KEY = "CARD_MODEL";
        var activeCard = null;
        var cards = [];

        // Load data from localStorage
        var loadData = function() {
            var temp = localStorage.getItem(DATA_KEY);
            console.log("Got data...", temp);
            if(temp) {
                cards = JSON.parse(temp);
            }
        };

        // Save data to localStorage
        var saveData = function() {
            console.log("Saving data...", cards);
            localStorage.setItem(DATA_KEY, JSON.stringify(cards));
        };

        // Get the active card
        var getActiveCard = function() {
            return activeCard;
        };

        // Toggle active card (when same id is provided, set null!)
        var toggleActiveCard = function(id) {
            console.log("Setting active card:", id);
            if(activeCard == id) {
                activeCard = null;
            } else {
                activeCard = id;
            }
        };

        // Get all cards
        var getCards = function() {
            return cards;
        };

        // Get one card by id
        var getCardById = function(id) {
            for(var i in cards) {
                if(cards[i].id == id) {
                    return cards[i];
                }
            }
            // If not found, return null!
            return null;
        };

        // Add a card. The id is the timestamp (for simplicity now)
        var addCard = function(text, priority, target, owner) {
            var date = Date.now();
            cards.push({
                id: date,
                owner: owner,
                target: target,
                text: text,
                added: date,
                status: 'pending',
                priority: priority
            });
            // Call save data as data is changed!
            saveData();
        };

        // Remove a card by its id
        var removeCardById = function(id) {
            var index = null;
            for(var i in cards) {
                if(cards[i].id == id) {
                    index = i;
                    break;
                }
            }
            if(index) {
                // Remove the index-th from the persons array
                cards.splice(index, 1);
            }
            // Call save data as data is changed!
            saveData();
        };

        // Get all cards with status 'done'
        var getDoneCards = function() {
            var temp = [];
            for(var i in cards) {
                if(cards[i].status == 'done') {
                    temp.push(cards[i]);
                }
            }
            return temp;
        };

        // Get all cards by a persons id which are pending
        var getCardsByPersonId = function(id) {
            var temp = [];
            for(var i in cards) {
                if(cards[i].target == id && cards[i].status == 'pending') {
                    temp.push(cards[i]);
                }
            }
            return temp;
        };

        // Set a card to done
        var setDone = function(id) {
            for(var i in cards) {
                if(cards[i].id == id) {
                    console.log(cards[i]);
                    cards[i].status = 'done';
                    // Call save data as data is changed!
                    saveData();
                    return;
                }
            }
        };

        // Set a card to pending
        var setPending = function(id) {
            for(var i in cards) {
                if(cards[i].id == id) {
                    cards[i].status = 'pending';
                    // Call save data as data is changed!
                    saveData();
                    return;
                }
            }
        };

        // Load initial data! (once)
        // This function runs once as the Factory is a singleton!
        loadData();

        // Expose an API which is used by controllers.
        return {
            getCards: getCards,
            getCardById: getCardById,
            addCard: addCard,
            removeCardById: removeCardById,
            getDoneCards: getDoneCards,
            getCardsByPersonId: getCardsByPersonId,
            setDone: setDone,
            setPending: setPending,
            getActiveCard: getActiveCard,
            toggleActiveCard: toggleActiveCard
        };
    }]);
})();
