angular.module('batalla.controller', [])

.controller('batallanavalCtrl', function($scope, sLogueado, $cordovaNativeAudio, $ionicPlatform) {

$ionicPlatform.ready(function() {
      //------------------------------------------ AUDIOS ---------------------------------------------//
      if( window.plugins && window.plugins.NativeAudio ) {
          window.plugins.NativeAudio.preloadSimple( 'coin', 'audio/coin.mp3', function(msg){
          }, function(msg){
              console.log( 'error: ' + msg );
          });
          
      };
  });


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

  if ($scope.cuadradoElegido == "Ninguno")
  {
      alert ("No eligió posición de la nave");
  }
  else if ($scope.nueva.credito == 0)
  {
      alert ("No ingresó créditos");    
  }
  else
  {
    if ($scope.referencia.creditos < 0)
    {
      alert ("No tiene crédito suficiente (Créditos: " + $scope.referencia.creditos + ")")
    }
    else
    {
    try{
      window.plugins.NativeAudio.play('coin');
    }
    catch(err)
    {
      console.log("NativeAudio no funciona por WEB");
    }    
    $scope.cuadradoElegido = "Ninguno";
    $scope.referencia.creditos = $scope.referencia.creditos - $scope.nueva.credito;
    sLogueado.actualizarCreditos ($scope.referencia.creditos);

    firebase.database().ref("/partidasBatallaNaval/").push({
    desafiante: $scope.referencia.nombre,
    posicion: $scope.cuadradoElegido,
    desafianteUID: firebase.auth().currentUser.uid,
    credito: $scope.nueva.credito
    })
    }
    $scope.nueva.credito = 0;
  }
};


$scope.LeerCuadrado = function(elegido){
    
      $scope.cuadradoElegido = elegido;
       
  };
})

