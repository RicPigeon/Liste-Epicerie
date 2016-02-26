var app = angular.module('myApp', ['ngRoute', 'summernote', 'firebase','toaster', 'ngTable',"googlechart"]);

//Controlleur permettant de gérer les changements de pages
app.controller('AppCtrl', 
	function($scope, $window, $location, dataSvc, authentificationSvc) {

 	$scope.menus = [];
	$scope.menuConnection = {
		affiche: 'Espace client',
		href: '#/connexion',
		controlleur: 'Autre'
	};

	$scope.singleton = {
		actuel: false
	};

	$scope.rafraichir = function(){
		window.location.reload(true);
	}
	
	$scope.annuler = function(){
		$window.history.back();
	};

	$scope.$on('$locationChangeStart', function(event, next, current) {
		updateMenu();
	});

	$scope.deconnexion = function(){
		authentificationSvc.deconnexion();
		$scope.menuConnection = {
			affiche: 'Espace client',
			href: '#/connexion',
			controlleur: 'Autre'
		};
		$location.path('/');
	}

	var updateMenu = function(){
  		var authCredit = authentificationSvc.getAuthentificationCredit();
  		$(".navbar-collapse").collapse('hide');

  		if(authCredit){
			$scope.menuConnection.affiche = authCredit.password.email;
			$scope.menuConnection.href = '#/espaceClient/';
			$scope.menuConnection.deconnexion = true;

			//On est authentifier donc on va changer le menu avec les nouvelles options
			if($scope.menus.length == 0) {
				$scope.menus.push({
				 	affiche: 'Ma liste d\'epicerie',
				 	href : '#/espaceClient/listeEpicerie',
				 	controlleur: 'listeFichesCtrl'
				},
				{
				 	affiche: 'Statistique',
				 	href : '#/espaceClient/statistique',
				 	controlleur: 'statistiqueCtrl',
				 	icon: 'glyphicon glyphicon-stats'
				});

				authentificationSvc.estAdmin().then(function(admin){
					//Supprime Liste des nouveaux clients
  					if(admin){
  						$scope.menus.length = 0;
						$scope.menus.push({
						 	affiche: 'Espace Admin',
						 	href : '#/admin',
						 	controlleur: 'adminCtrl',
						 	icon: '	glyphicon glyphicon-edit'
						});
  					}
  				});
			}
		} else {
			$scope.menus.length = 0;
			//$location.path('/');
		}
	}
});