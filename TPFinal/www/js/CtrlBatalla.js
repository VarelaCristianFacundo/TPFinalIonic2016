angular.module('batalla.controller', [])

.controller('batallanavalCtrl', function($scope) {

$scope.admin = "Cris";
$scope.cuadradoElegido="Ninguno";
$scope.nueva={};
$scope.nueva.credito = 0;

var partidasRef = new Firebase("https://loginsupervisada.firebaseio.com/partidas");
partidasRef.on('child_added', function(data){
$timeout(function(){
      console.info(data.val(), data.key());
      var partida = data.val();
      partida.key = data.key();
      $scope.partidas.push(partida);
  });
 });

$scope.Apostar = function(){

alert ("llegue");

 firebase.database().ref("/partidasBatallaNaval/").push({
  desafiante: "Cristian",
  Posicion: $scope.cuadradoElegido,
  Credito: $scope.nueva.credito
  })
 $scope.cantPartidas = $scope.cantPartidas + 1;
};


$scope.LeerCuadrado = function(elegido){
    
      $scope.cuadradoElegido = elegido;
       
  };
})

