var app = angular.module('myApp');

app.controller('loginCtrl', 
	function($scope, $firebaseAuth, $location, $timeout, common, authentificationSvc, dataSvc){
	
	common.start();

	$scope.email = { data: '' };
	$scope.pass = { data: '' };

	var authentification = authentificationSvc.estAuthentifier();

	if(authentification){
		$location.path('/espaceClient/listeEpicerie');
	}

	//Function pour cacher les messages d'authentification ou d'erreur
	var cacherMessage = function(){
		$('#log').hide();
		$('#error').hide();
	}
	cacherMessage();
	
	var logSuccess = function(message){
		$('#success_msg').text(message);
		$('#log').show(1000).delay(5000).hide(1000);
	}
	
	var logError = function(message){
		$('#error_msg').text(message);
		$('#error').show(1000).delay(5000).hide(1000);
	}
	
	$scope.connexionClick = function(email, pass){
		authentificationSvc.connexion(email, pass).then(function(estAuthentifier){
			if(estAuthentifier){
				authentificationSvc.estAdmin().then(function(admin){
					dataSvc.updateCredit();
					logSuccess("Connecter !");
					if(admin){
						$location.path('/admin');
					} else {
						$location.path('/espaceClient/listeEpicerie');
					}
				})
			} else {
				logError("Le courriel ou le mot de passe est incorrect !");
			}
		});
	};

});