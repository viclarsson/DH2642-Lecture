console.log("Bootstrapping application...");
// The application module
var app = angular.module("app", ['ui.router', 'ngIdle', 'app.controllers', 'app.services', 'app.directives', 'app.filters']);

// Configure app!
app.config(['IdleProvider', 'KeepaliveProvider', function(IdleProvider, KeepaliveProvider) {
    IdleProvider.idle(30); // in seconds
}]);

// Run!
app.run(['Idle', function(Idle) {
    FastClick.attach(document.body);
    Idle.watch();
}]);

// Modules for different components
var controllers = angular.module("app.controllers", []);
var services = angular.module("app.services", []);
var directives = angular.module("app.directives", []);
var filters = angular.module("app.filters", []);
