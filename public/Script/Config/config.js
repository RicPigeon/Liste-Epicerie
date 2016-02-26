var app = angular.module('myApp');

app.config(function($routeProvider) {
        $routeProvider

        // route for the home page
        .when('/', {
            templateUrl : 'pages/login.html',
            controller  : 'loginCtrl'
        })
		
        .when('/changePassword', {
            templateUrl : 'pages/changePassword.html',
            controller  : 'changePasswordCtrl'
        })

        .when('/ajouterUtilisateur', {
            templateUrl : 'pages/ajouterUtilisateur.html',
            controller  : 'ajouterUtilisateurCtrl'
        })

        .when('/espaceClient/listeEpicerie', {
            templateUrl : 'pages/listeEpicerie.html',
            controller  : 'listeEpicerieCtrl'
        })

        .when('/espaceClient/statistique', {
        	templateUrl : 'pages/statistique.html',
            controller  : 'StatistiqueCtrl'
        })
		
		.when('/connexion', {
            templateUrl : 'pages/login.html',
            controller  : 'loginCtrl'
        })

        .when('/admin', {
            templateUrl : 'pages/admin.html',
            controller  : 'adminCtrl'
        })


        .otherwise({ redirectTo: '/' });;
});