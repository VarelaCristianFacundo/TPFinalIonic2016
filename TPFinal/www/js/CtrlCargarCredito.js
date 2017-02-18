angular.module('cargarcredito.controller', [])

.controller('cargarcreditoCtrl', function($scope) {
$scope.nueva={};
$scope.nueva.credito;

$scope.CargarCredito = function(){

  firebase.database().ref("/tarjetas/").push({
  cantidad: $scope.nueva.credito,
  estado: "disponible",
  })
};

})
