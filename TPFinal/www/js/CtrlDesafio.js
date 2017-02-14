angular.module('desafio.controller', [])

.controller('desafioCtrl', function($scope, sLogueado) {
$scope.nueva={};
$scope.nueva.credito = 0;
$scope.nueva.desc= "";
$scope.cantPartidas;
$scope.referencia = sLogueado.traerUser();

$scope.Apostar = function(){
console.info(sLogueado.traerUser());
  console.info($scope.referencia);
  firebase.database().ref("/desafios/").push({
  desafiante: $scope.referencia.nombre,
  Descripcion: $scope.nueva.desc,
  Credito: $scope.nueva.credito
  })
 $scope.cantPartidas = $scope.cantPartidas + 1;

};

})
