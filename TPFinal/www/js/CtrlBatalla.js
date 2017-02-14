angular.module('batalla.controller', [])

.controller('batallanavalCtrl', function($scope, sLogueado) {

$scope.admin = "Cris";
$scope.cuadradoElegido="Ninguno";
$scope.nueva={};
$scope.nueva.credito = 0;
$scope.nueva.duracion = 0;
$scope.referencia = sLogueado.traerUser();



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
  $scope.referencia.creditos = $scope.referencia.creditos - $scope.nueva.credito;
  sLogueado.actualizarCreditos ($scope.referencia.creditos);

  firebase.database().ref("/partidasBatallaNaval/").push({
  desafiante: $scope.referencia.nombre,
  posicion: $scope.cuadradoElegido,
  desafianteUID: firebase.auth().currentUser.uid,
  credito: $scope.nueva.credito
  })
};


$scope.LeerCuadrado = function(elegido){
    
      $scope.cuadradoElegido = elegido;
       
  };
})

