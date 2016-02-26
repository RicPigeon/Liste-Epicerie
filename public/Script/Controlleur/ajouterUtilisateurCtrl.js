var app = angular.module('myApp');

app.controller('ajouterUtilisateurCtrl', 
	function($scope, $location, authentificationSvc, dataSvc, toaster){

		$scope.typeVisiteAjouter = { text:"" };
		$scope.typeBonusAjouter = { text:"" };
		$scope.cacherLesErreur = true;

		var activer = function(){
			$scope.dataLoaded = true;
		}

		$scope.ajouterUtilisateur = function(email, password){
			var nomClient = $scope.nomClient.data;
			authentificationSvc.ajouterUtilisateur(email, password).then(function(userUID){

				if(userUID){
					toaster.pop('success', "Utilisateur enregistrer : " + userUID, null);
					toaster.pop('success', "Son nom : " + nomClient, null);
					dataSvc.ajouterUtilisateur(userUID, nomClient);

					$location.path('/');
				}
			})
		}


		authentificationSvc.estAdmin().then(function(admin){
			if(admin){
				activer();
			} else {
				$location.path('/')
			}
		})
	}
);