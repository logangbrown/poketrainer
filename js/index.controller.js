angular.module('poketrainer').controller('IndexCtrl', function ($scope, $http, $routeParams, $location) {
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-top-center",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "200",
        "hideDuration": "500",
        "timeOut": "2500",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };

    $scope.pokedex = new Pokedex.Pokedex();
    $scope.pokemonList = {};
    $scope.pokemon = {};
    $scope.pokemon.totalGuesses = 0;
    $scope.pokemon.totalCorrect = 0;
    $scope.currentPokemon = {};
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

    // $http.get("https://pokeapi.co/api/v2/pokemon")
    //     .then(function (response) {
    //         $scope.pokemon.totalPokemon = response.data.count;
    //         $scope.getRandomPokemon();
    //     })
    //     .catch(function (error) {
    //         toastr["error"](error);
    //     });

    $scope.pokedex.getPokemonsList()
        .then(function (response) {
            $scope.pokemonList = response.data;
            $scope.totalPokemon = $scope.pokemonList.length;
        });

    $scope.numGuesses = 0;
    $scope.typesGuessed = [];

    $scope.getRandomPokemon = function () {
        let id = Math.floor(Math.random() * $scope.pokemon.totalPokemon);

        $scope.numGuesses = 0;
        $scope.typesGuessed = [];
        $scope.currentPokemon = $scope.pokemonList[id];
    };

    $scope.getRandomPokemon();

    $scope.guessType = function (type) {
        if ($scope.typesGuessed.includes(type)) {
            toastr["error"]("Already guessed " + type + "! Try again.");
            return;
        }
        let types = ''
        for (let i = 0; i < $scope.currentPokemon.types.length; i++) {
            types += ' ' + $scope.currentPokemon.types[i].type.name;
            if ($scope.currentPokemon.types[i].type.name === type) {
                $scope.numGuesses++;
                toastr["success"]("Correct!");
                if ($scope.numGuesses === $scope.currentPokemon.types.length) {
                    $scope.pokemon.totalCorrect++;
                    $scope.pokemon.totalGuesses++;
                    $scope.getRandomPokemon();
                }
                else {
                    $scope.typesGuessed.push(type);
                }
                return;
            }
        }
        toastr["error"]("Wrong!" + types);
        $scope.pokemon.totalGuesses++;
        $scope.getRandomPokemon();
    };
});