angular.module('poketrainer', ['ngRoute']);

angular.module('poketrainer').config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "home.html?v=1.0.0",
            controller: "IndexCtrl"
        })
});