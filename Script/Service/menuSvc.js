var app = angular.module('myApp');

app.service('menuSvc', ['$scope','authentificationSvc',
	function($scope, authentificationSvc) {
   
   	var menu = {};
    //L'objet de notification avec ces différents mode
  	menu.update = function(){
  		var authCredit = authentificationSvc.getAuthentificationCredit();
		$scope.menuConnection.affiche = authCredit.password.email;
		$scope.menuConnection.href = '#/espaceClient/';
		$scope.menuConnection.deconnexion = true;

		//On est authentifier donc on va changer le menu avec les nouvelles options
		if($scope.menus.length == 0) {
			$scope.menus.push({
			 	affiche: 'Ma liste d\'epicerie',
			 	href : '#/espaceClient/listeEpicerie',
			 	controlleur: 'listeEpicerieCtrl'
			},
			{
			 	affiche: 'Statistique',
			 	href : '#/espaceClient/statistique',
			 	controlleur: 'statistiqueCtrl',
			 	icon: 'glyphicon glyphicon-stats'
			});
		}
	}

 	return menu;
 }]);

