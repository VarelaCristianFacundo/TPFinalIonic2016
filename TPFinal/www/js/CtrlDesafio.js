angular.module('desafio.controller', [])

.controller('desafioCtrl', function($scope, sLogueado) {
$scope.nueva={};
$scope.nueva.credito = 0;
$scope.nueva.desc= "";
$scope.cantPartidas;
$scope.referencia = sLogueado.traerUser();

$scope.Apostar = function(){
  $scope.referencia.creditos = $scope.referencia.creditos - $scope.nueva.credito;
  sLogueado.actualizarCreditos ($scope.referencia.creditos);
  firebase.database().ref("/desafios/").push({
  desafiante: $scope.referencia.nombre,
  descripcion: $scope.nueva.desc,
  desafianteUID: firebase.auth().currentUser.uid,
  credito: $scope.nueva.credito
  })
};

})
