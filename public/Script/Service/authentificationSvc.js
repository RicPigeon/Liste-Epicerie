var app = angular.module('myApp');

app.service('authentificationSvc', ['$firebaseAuth','$q', 'toaster', function($firebaseAuth, $q, toaster) {
   
    //L'objet de notification avec ces différents mode
    var ref = new Firebase("https://suivi-epicerie.firebaseio.com/");
    var getEstAdmin = null;
 	
 	var authentifier = {};

 	authentifier.estAuthentifier = function(){
 		var user = ref.getAuth();
 		if(user){
 			return true;
 		} else {
 			return false;
 		}
 	}

 	authentifier.ajouterUtilisateur = function(email, password){
 		var deffered = $q.defer();
		ref.createUser({
			email    : email,
			password : password
		}, function(error, userData) {
			if (error) {
				if(error.code = "EMAIL_TAKEN"){
					toaster.pop('error', "Cette adresse email est deja utilise par une autre personne.");
				}
			  	deffered.resolve(false);
			} else {
			  var utilisateurUID = userData.uid;
			  deffered.resolve(utilisateurUID);
			}
		});

		return deffered.promise;
 	}

 	authentifier.estAdmin = function(){
 		var deffered = $q.defer();
 		var user = ref.getAuth();
 		if(user){
 			var name = user.password.email.substring(0, user.password.email.lastIndexOf("@"));
 			name = name.replace(/\.|#|$|[|]/g, "");
 			var refAdmin = ref.child('admin').child(name);
 			refAdmin.once("value", function(data) {
 				if(data.val()){
 					getEstAdmin = true;
 				} else {
 					getEstAdmin = false;
 				}
 			 	deffered.resolve(getEstAdmin);
			}, function (err) {
				//Le concept d'admin n'existe pas encore.
			  	deffered.resolve(false);
			});
 		} else {
 			getEstAdmin = false;
 			deffered.resolve(getEstAdmin);
 		}

 		return deffered.promise;
 	}

 	authentifier.getAuthentificationCredit = function(){
		return ref.getAuth();
 	}

 	authentifier.connexion = function(email, password){
 		var deffered = $q.defer();
		ref.authWithPassword({
			email: email,
            password: password
		}, function(error, authData) {
			var connecter = false;
			//Si la personne à entrer les mauvaises informations
			if (!error) {
				connecter = true;
		  	}
		  	deffered.resolve(connecter);
		});

		return deffered.promise;
 	}

 	authentifier.deconnexion = function(){
 		//On vide les informations d'authentification
 		getEstAdmin = false;
		ref.unauth();
	}

	authentifier.changerMotDePasse = function(email, oldpass, newpass){
 		var deffered = $q.defer();
 		ref.changePassword({
		  email       : email,
		  oldPassword : oldpass,
		  newPassword : newpass
		}, function(error) {
			var changementReussi = false;
			//Si la personne à entrer les mauvaises informations
			if (!error) {
				changementReussi = true;
		  	}
		  	deffered.resolve(changementReussi);
		});
		return deffered.promise;
 	}

 
	 return authentifier;

 }]);

