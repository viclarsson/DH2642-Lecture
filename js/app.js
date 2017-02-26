
// The application module
var app = angular.module("app", ['ui.router', 'ngIdle', 'app.controllers', 'app.services', 'app.directives', 'app.filters']);

/*
*   app.config(...) runs "during the provider registrations and configuration phase"
*   https://docs.angularjs.org/guide/module
*   Reading the docs of Idle, this code was provided.
*/
app.config(['IdleProvider', 'KeepaliveProvider', function(IdleProvider, KeepaliveProvider) {
    console.log("Configuring app...");
    IdleProvider.idle(30); // in seconds
}]);

/*
*   app.run(...) runs "after the injector is created and are used to kickstart the application"
*   https://docs.angularjs.org/guide/module
*   Reading the docs of Idle, this code was provided.
*/
app.run(['Idle', function(Idle) {
    console.log("Running app...");

    // Fastclick is a library for removing the tap delay.
    // https://developers.google.com/web/updates/2013/12/300ms-tap-delay-gone-away
    FastClick.attach(document.body);

    // Start monitoring for "afk" persons.
    Idle.watch();
}]);

// Modules for different components
var controllers = angular.module("app.controllers", []);
var services = angular.module("app.services", []);
var directives = angular.module("app.directives", []);
var filters = angular.module("app.filters", []);
