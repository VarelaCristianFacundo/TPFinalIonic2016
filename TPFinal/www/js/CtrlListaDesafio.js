angular.module('listadesafios.controller', [])

.controller('listaDesafiosCtrl', function($scope, $timeout) {

	$scope.desafios =[];
	$scope.desafio = {};
	$scope.desafio.desc = "";
	$scope.desafio.cred = "";

	var refDesafios = new Firebase("https://loginsupervisada.firebaseio.com/desafios");
	console.info(refDesafios);
	
    refDesafios.on('child_added', function(data){
    $timeout(function(){
      console.info(data.val(), data.key());
      var desafio = data.val();
      desafio.key = data.key();
      $scope.desafios.push(desafio);
      console.info($scope.desafios);
    });
});


})
