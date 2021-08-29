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
    
    $scope.settings = {};
    $scope.settings.preferSprite = false;

    $scope.pokedex = new Pokedex.Pokedex();
    $scope.pokemonList = {};
    $scope.pokemon = {};
    $scope.pokemon.totalGuesses = 0;
    $scope.pokemon.totalCorrect = 0;
    $scope.pokemon.currentPokemon = {};
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

    $scope.pokedex.getPokemonsList()
        .then(function (response) {
            $scope.pokemonList = response.results;
            $scope.totalPokemon = $scope.pokemonList.length;
            $scope.getRandomPokemon();
        });

    $scope.numGuesses = 0;
    $scope.typesGuessed = [];

    $scope.getRandomPokemon = function () {
        $('#spinner').removeClass('d-none');
        $(".type-btn").prop('disabled', true);
        let id = Math.floor(Math.random() * $scope.totalPokemon);

        $scope.pokedex.getPokemonByName($scope.pokemonList[id].name)
            .then(function (response) {
                $scope.numGuesses = 0;
                $scope.typesGuessed = [];
                $scope.pokemon.currentPokemon = response;
                $scope.$apply();
                $('#spinner').addClass('d-none');
                $(".type-btn").prop('disabled', false);
            })
    };

    $scope.guessType = function (type) {
        if ($scope.typesGuessed.includes(type)) {
            toastr["error"]("Already guessed " + type + "! Try again.");
            return;
        }
        let types = ''
        for (let i = 0; i < $scope.pokemon.currentPokemon.types.length; i++) {
            types += ' ' + $scope.pokemon.types[$scope.pokemon.currentPokemon.types[i].type.name].name;
            if ($scope.pokemon.currentPokemon.types[i].type.name === type) {
                $scope.numGuesses++;
                toastr["success"]("Correct!");
                if ($scope.numGuesses === $scope.pokemon.currentPokemon.types.length) {
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

    $scope.getSprite = function () {
        if ($scope.settings.preferSprite) {
            if ($scope.pokemon.currentPokemon.sprites.front_default) {
                return $scope.pokemon.currentPokemon.sprites.front_default;
            } else {
                return $scope.pokemon.currentPokemon.sprites.other['official-artwork'].front_default;
            }
        } else {
            if ($scope.pokemon.currentPokemon.sprites.other['official-artwork'].front_default) {
                return $scope.pokemon.currentPokemon.sprites.other['official-artwork'].front_default;
            } else {
                return $scope.pokemon.currentPokemon.sprites.front_default;
            }
        }
    };

    $scope.getForm = function () {
        let name = $scope.pokemon.currentPokemon.forms[0].name
        let i = name.indexOf('-');
        let hyphenNames = [
            'ho-oh',
            'porygon-z',
            'jangmo-o',
            'hakamo-o',
            'kommo-o'
        ]
        if (i > -1) {
            if (hyphenNames.includes(name)) return '';
            return ' (' + $scope.pokemon.currentPokemon.forms[0].name.substring(i+1).replace('-',' ') + ')';
        }
        else {
            return '';
        }
    }
});