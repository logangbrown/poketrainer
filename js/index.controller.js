angular.module('poketrainer').controller('IndexCtrl', function ($scope, $http, $routeParams, $location) {
    $scope.pokemon = {};
    $scope.pokemon.types = {
        'normal': {'name': 'Normal'},
        'fire': {'name': 'Fire'},
        'water': {'name': 'Water'},
        'grass': {'name': 'Grass'},
        'electric': {'name': 'Electric'},
        'ice': {'name': 'Ice'},
        'fighting': {'name': 'Fighting'},
        'poison': {'name': 'Poison'},
        'ground': {'name': 'Ground'},
        'flying': {'name': 'Flying'},
        'psychic': {'name': 'Psychic'},
        'bug': {'name': 'Bug'},
        'rock': {'name': 'Rock'},
        'ghost': {'name': 'Ghost'},
        'dark': {'name': 'Dark'},
        'dragon': {'name': 'Dragon'},
        'steel': {'name': 'Steel'},
        'fairy': {'name': 'Fairy'}
    }

    $http.get("https://pokeapi.co/api/v2/pokemon/charmander")
        .then(function (response) {
            $scope.pokemon.charmander = response.data;
        });

});