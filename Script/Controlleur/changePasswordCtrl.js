var app = angular.module('myApp');

app.controller('changePasswordCtrl', 
	function($scope, $firebaseAuth, $location, $timeout, common, authentificationSvc){
	
	common.start();

	$scope.email = { data: '' };
	$scope.pass = { data: '' };

	//Function pour cacher les messages d'authentification ou d'erreur
	var cacherMessage = function(){
		$('#logChangePw').hide();
		$('#errorChangePw').hide();
	}
	cacherMessage();
	
	var logChangePw = function(message){
		$('#logChangePw_msg').text(message);
		$('#logChangePw').show(1000).delay(5000).hide(1000);
	}
	
	var errorChangePw = function(message){
		$('#errorChangePw_msg').text(message);
		$('#errorChangePw').show(1000).delay(5000).hide(1000);
	}
	
	$scope.changePasswordClick = function(email, oldpass, newpass) {
		if(email && oldpass && newpass){
			authentificationSvc.changerMotDePasse(email, oldpass, newpass).then(function(changementReussi){
				if(changementReussi){
					logChangePw("Changement de mot de passe reussit !");
				} else {
					errorChangePw("Le courriel ou le mot de passe est incorrect !");
				}
			});
		} else {
			errorChangePw("Veuillir saisir toutes les informations.");
		}
	};
});