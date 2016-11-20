angular.module('desafio.controller', [])

.controller('desafioCtrl', function($scope) {
  $scope.nueva={};
$scope.nueva.credito = 0;
$scope.nueva.desc= "";
$scope.cantPartidas;

$scope.Apostar = function(){

	alert("llegue");
  firebase.database().ref("/desafios/").push({
  desafiante: "Cristian",
  Descripcion: $scope.nueva.desc,
  Credito: $scope.nueva.credito
  })
 $scope.cantPartidas = $scope.cantPartidas + 1;

};

})
