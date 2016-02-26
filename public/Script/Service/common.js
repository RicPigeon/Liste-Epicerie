var app = angular.module('myApp');

app.service('common', [function() {
   
    //L'objet de notification avec ces différents mode
    var common = {};
	
	//Ce qui est exécuter au chargement d'un controlleur
	common.start = function(){
		//Cache la navbar (S'il est était ouverte)
		$(".navbar-collapse").collapse('hide');
	}

	common.obtenirRef = function(){
		var ref = new Firebase("https://suivi-epicerie.firebaseio.com/");
		return ref;
	}

	return common;
 }]);