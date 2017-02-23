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

        var loadData = function() {
            var temp = localStorage.getItem(DATA_KEY);
            console.log("Got data...", temp);
            if(temp) {
                persons = JSON.parse(temp);
            }
        };

        var saveData = function() {
            console.log("Saving data...", persons);
            localStorage.setItem(DATA_KEY, JSON.stringify(persons));
        };

        var getColors = function() {
            return colors;
        };

        var toggleActiveAddId = function(id) {
            console.log("Setting active add:", id);
            if(addId == id) {
                addId = null;
            } else {
                addId = id;
            }
        };

        var getActiveAddId = function() {
            return addId;
        };

        var setActiveUser = function(id) {
            activeUser = id;
        };

        var getActiveUser = function() {
            return activeUser;
        };

        var getPersons = function() {
            return persons;
        };

        var getPersonById = function(id) {
            for(var i in persons) {
                if(persons[i].id == id) {
                    return persons[i];
                }
            }
            // If not found, return null!
            return null;
        };

        var addPerson = function(person) {
            persons.push(person);
            saveData();
        };

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
            saveData();
        };

        // Load initial data! (once)
        loadData();

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
        // Sample data!
        var DATA_KEY = "CARD_MODEL";
        var activeCard = null;
        var cards = [];

        var loadData = function() {
            var temp = localStorage.getItem(DATA_KEY);
            console.log("Got data...", temp);
            if(temp) {
                cards = JSON.parse(temp);
            }
        };

        var saveData = function() {
            console.log("Saving data...", cards);
            localStorage.setItem(DATA_KEY, JSON.stringify(cards));
        };

        var getActiveCard = function() {
            return activeCard;
        };

        var toggleActiveCard = function(id) {
            console.log("Setting active card:", id);
            if(activeCard == id) {
                activeCard = null;
            } else {
                activeCard = id;
            }
        };

        var getCards = function() {
            return cards;
        };

        var getCardById = function(id) {
            for(var i in cards) {
                if(cards[i].id == id) {
                    return cards[i];
                }
            }
            // If not found, return null!
            return null;
        };

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
            saveData();
        };

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
            saveData();
        };

        var getDoneCards = function() {
            var temp = [];
            for(var i in cards) {
                if(cards[i].status == 'done') {
                    temp.push(cards[i]);
                }
            }
            return temp;
        };

        var getCardsByPersonId = function(id) {
            var temp = [];
            for(var i in cards) {
                if(cards[i].target == id && cards[i].status == 'pending') {
                    temp.push(cards[i]);
                }
            }
            return temp;
        };

        var setDone = function(id) {
            for(var i in cards) {
                if(cards[i].id == id) {
                    console.log(cards[i]);
                    cards[i].status = 'done';
                    return;
                }
            }
            saveData();
        };

        var setPending = function(id) {
            for(var i in cards) {
                if(cards[i].id == id) {
                    cards[i].status = 'pending';
                    return;
                }
            }
            saveData();
        };

        // Load initial data! (once)
        loadData();

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
