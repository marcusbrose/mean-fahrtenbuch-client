var app = angular.module("fahrtenbuch");

app.controller("FahrtenListController", function($scope, $http) {
	$scope.message = "Hello Angular";

	$http.get('http://localhost:3000/fahrten')
		.success(function(response){
			$scope.fahrten = response;
		})
		.error(function(error){
			$scope.error = error;
		});

	$scope.privateKm = function(fahrt) {
		if (fahrt.privat){
			return fahrt.kmEnde - fahrt.kmStart;
		}
		return 0;
	};

	$scope.geschaeftlicheKm = function(fahrt) {
		if ( ! fahrt.privat){
			return fahrt.kmEnde - fahrt.kmStart;
		}
		return 0;
	};

	$scope.deleteFahrt = function(fahrt) {
		$http.delete("http://localhost:3000/fahrten/" + fahrt._id)
			.success(function(response){
				$scope.fahrten.pop(fahrt);
			});
	};
});