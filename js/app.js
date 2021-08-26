angular.module('poketrainer', ['ngRoute']);

angular.module('poketrainer').config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "home.html?v=1.0.0",
            controller: "IndexCtrl"
        })
});


//TODO Settings like preferred sprite type, generation, etc
//TODO Better visibility on chosen types
//TODO Alternate modes: Guess pokemon name, weaknesses, strengths