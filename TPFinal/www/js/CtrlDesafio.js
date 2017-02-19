angular.module('desafio.controller', [])

.controller('desafioCtrl', function($scope, sLogueado, $ionicPlatform, $cordovaNativeAudio) {

$ionicPlatform.ready(function() {
      //------------------------------------------ AUDIOS ---------------------------------------------//
      if( window.plugins && window.plugins.NativeAudio ) {
          window.plugins.NativeAudio.preloadSimple( 'coin', 'audio/coin.mp3', function(msg){
          }, function(msg){
              console.log( 'error: ' + msg );
          });
          
      };
  });


$scope.nueva={};
$scope.nueva.credito = 0;
$scope.nueva.desc= "";
$scope.cantPartidas;
$scope.referencia = sLogueado.traerUser();

$scope.Apostar = function(){

  if ($scope.nueva.desc == "")
  {
  		alert ("No ingresó ningún desafío");
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
  	  window.plugins.NativeAudio.play('coin');
  	  $scope.referencia.creditos = $scope.referencia.creditos - $scope.nueva.credito;
  	  sLogueado.actualizarCreditos ($scope.referencia.creditos);
  	  firebase.database().ref("/desafios/").push({
  	  desafiante: $scope.referencia.nombre,
  	  descripcion: $scope.nueva.desc,
  	  desafianteUID: firebase.auth().currentUser.uid,
  	  credito: $scope.nueva.credito
  	  })
      $scope.nueva.credito = 0;
      $scope.nueva.desc= "";
    }
  }
};

})
