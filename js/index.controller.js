angular.module('poketrainer').controller('IndexCtrl', function ($scope, $http, $routeParams, $location) {
    $scope.pokemon = {};

    $http.get("https://pokeapi.co/api/v2/pokemon/charmander")
        .then(function (response) {
            $scope.pokemon.charmander = response.data;
        });
});