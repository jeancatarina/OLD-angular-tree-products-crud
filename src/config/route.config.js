(function(){
    'use strict';

    angular
        .module('smartTree')
        .config(configuration)

    configuration.$inject = ['$routeProvider'];

    function configuration ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'src/view/arvore-show.view.html',
            controller: 'arvore.controller',
            controllerAs: 'controller'
        });

        $routeProvider.otherwise({
            redirectTo: '/'
        });
    }


})();