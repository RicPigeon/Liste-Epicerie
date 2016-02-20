var app = angular.module('myApp');

app.controller('listeEpicerieCtrl', 
	function($scope, $location, $rootScope, $routeParams, $timeout, $filter, toaster, 
		NgTableParams, dataSvc, authentificationSvc){
	
	$(".navbar-collapse").collapse('hide');
	$scope.dataLoaded = true;
	$scope.menu = {};

	var initData = function(){

		$scope.listePeriode = [];
		$scope.semaine = ['Lundi', 'Mardi', 'Mercredi','Jeudi', 'Vendredi'];
		$scope.finDeSemaine = ['Samedi', 'Dimanche'];

		$scope.search = {};
		$scope.listeEpicerie = [];

		//$scope.listeEpicerie.$loaded().then(function(laundryData) {		 
	        $scope.tableParams = new NgTableParams({
		        page: 1,            // show first page
		        count: 10,           // count per page
		        filter: $scope.search,
			}, {
		        total: $scope.listeEpicerie.length, // length of data
		        paginationMaxBlocks: 6,
		        counts: [10,20], 
		        getData: function ($defer, params) {
		        	
		        	var donneeFilter = $scope.listeEpicerie;
		        	$scope.donneesTriezEtFiltrer = $filter('orderBy')(donneeFilter, params.orderBy());

		        	params.total($scope.donneesTriezEtFiltrer.length);
		            $defer.resolve($scope.donneesTriezEtFiltrer.slice((params.page() - 1) * params.count(), params.page() * params.count()));
		        }
			});
    	//});
	}

	var index = 1;
	$scope.whereToSave = function(jour){
		console.log(jour);
		$scope.leJour = jour;
		$scope.menu[jour] = {};
	} 

	//Si on est authentifié on ne redirige pas sinon -> on redirige
	var estAuthentifier = authentificationSvc.estAuthentifier();
	
	if(!estAuthentifier){
		$location.path('/');
	} else {

		//Si on simule
		var uid = $routeParams.uid;
		if(uid){
			authentificationSvc.estAdmin().then(function(admin){
				if(admin){
					$scope.estAdmin = true;
					dataSvc.changeCredit(uid);
					initData();
				} else {
					$location.path('/espaceClient/listeFiches');
				}
			});
		} else {
			initData();
		}
	}
});