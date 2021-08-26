angular.module('poketrainer').controller('IndexCtrl', function ($scope, $http, $routeParams, $location) {
    $scope.pokemon = {};
    $scope.pokemon.types = {
        'normal': {'index': 'normal', 'name': 'Normal'},
        'fire': {'index': 'fire', 'name': 'Fire'},
        'water': {'index': 'water', 'name': 'Water'},
        'grass': {'index': 'grass', 'name': 'Grass'},
        'electric': {'index': 'electric', 'name': 'Electric'},
        'ice': {'index': 'ice', 'name': 'Ice'},
        'fighting': {'index': 'fighting', 'name': 'Fighting'},
        'poison': {'index': 'poison', 'name': 'Poison'},
        'ground': {'index': 'ground', 'name': 'Ground'},
        'flying': {'index': 'flying', 'name': 'Flying'},
        'psychic': {'index': 'psychic', 'name': 'Psychic'},
        'bug': {'index': 'bug', 'name': 'Bug'},
        'rock': {'index': 'rock', 'name': 'Rock'},
        'ghost': {'index': 'ghost', 'name': 'Ghost'},
        'dark': {'index': 'dark', 'name': 'Dark'},
        'dragon': {'index': 'dragon', 'name': 'Dragon'},
        'steel': {'index': 'steel', 'name': 'Steel'},
        'fairy': {'index': 'fairy', 'name': 'Fairy'}
    }

    $http.get("https://pokeapi.co/api/v2/pokemon/charmander")
        .then(function (response) {
            $scope.pokemon.charmander = response.data;
        });

});