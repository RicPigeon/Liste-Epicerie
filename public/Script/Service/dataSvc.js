var app = angular.module('myApp');

app.service('dataSvc', ['$firebaseObject','$firebaseArray', 'authentificationSvc', 
	function($firebaseObject, $firebaseArray, authentificationSvc) {
   
    //Notre reférence à notre base de données
    var refBase = new Firebase('https://suivi-epicerie.firebaseio.com/');

    //L'objet retourné par le service.
    var data = {};

    //Premier on load les données en fonction de l'utilisateur
    var authCredit = authentificationSvc.getAuthentificationCredit();
    if(authCredit){
	    //On instancie les références désirées
    }

    //Si on update doit update
    data.updateCredit = function(){
    	authCredit = authentificationSvc.getAuthentificationCredit();
    	if(authCredit){
			refUsers = refBase.child('users');
		}
    }

	data.ajouterUtilisateur = function(userUID, nomClient){
		var refUser = new Firebase('https://suivi-epicerie.firebaseio.com/users/'+userUID+'/');
		refUser.set({
		    nomClient: nomClient,
  		});
	}

 	return data;
 }]);

