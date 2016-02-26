var app = angular.module('myApp');

app.controller('StatistiqueCtrl', 
	function($scope, $location, $window, $routeParams, $firebaseArray, authentificationSvc, dataSvc) {
	
	$(".navbar-collapse").collapse('hide');

	var initData = function(){
		$scope.dataLoaded = true;
	}

	$scope.obtenirIngredient = function(){
		$scope.ingredient = true;

		 var myIFrame = document.getElementById('iframeId');
		 console.log(myIFrame);
	}

	//Si on est authentifié on ne redirige pas sinon -> on redirige
	var estAuthentifier = authentificationSvc.estAuthentifier();
	if(!estAuthentifier){
		$location.path('/');
	} else {
		//Puisqu'on est authentifier on va aller récupérer le data (les forfaits)
		$scope.dataLoaded = false;

		//Si on simule
		var uid = $routeParams.uid;
		if(uid){
			authentificationSvc.estAdmin().then(function(admin){
				if(admin){
					dataSvc.changeCredit(uid);
					initData();
				} else {
					$location.path('/espaceClient/statistique');
				}
			});
		} else {
			initData();
		}
	}
});