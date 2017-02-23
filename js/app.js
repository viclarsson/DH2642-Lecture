console.log("Bootstrapping application...");
// The application module
var app = angular.module("app", ['ui.router', 'app.controllers', 'app.services', 'app.directives', 'app.filters']);

// Modules for different components
var controllers = angular.module("app.controllers", []);
var services = angular.module("app.services", []);
var directives = angular.module("app.directives", []);
var filters = angular.module("app.filters", []);
