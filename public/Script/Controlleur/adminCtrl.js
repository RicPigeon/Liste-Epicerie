var app = angular.module('myApp');

app.controller('adminCtrl', 
	function($scope, $location, authentificationSvc, dataSvc){

		var activer = function(){

		}

		authentificationSvc.estAdmin().then(function(admin){
			console.log("ADMIN ?")
			if(admin){
				activer();
			} else {
				$location.path('/')
			}
		})
	}
);