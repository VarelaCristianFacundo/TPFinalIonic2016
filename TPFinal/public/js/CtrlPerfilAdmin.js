angular.module('perfiladmin.controller', [])

.controller('perfilCtrl', function($scope, $timeout, $state, sLogueado, $cordovaNativeAudio, $ionicPlatform, $ionicPopup) {

$ionicPlatform.ready(function() {
      //------------------------------------------ AUDIOS ---------------------------------------------//
      if( window.plugins && window.plugins.NativeAudio ) {
          window.plugins.NativeAudio.preloadSimple( 'coin', 'audio/coin.mp3', function(msg){
          }, function(msg){
              console.log( 'error: ' + msg );
          });
          window.plugins.NativeAudio.preloadSimple( 'puerta', 'audio/puerta.mp3', function(msg){
          }, function(msg){
              console.log( 'error: ' + msg );
          });
      };
  });

$scope.referencia = sLogueado.traerUser();
console.info("referencia", $scope.referencia);

$scope.Deslogear = function (){
    firebase.auth().signOut().catch(function (error){
      console.info("login incorrecto", error);
    }).then( function(resultado){
      try{
          window.plugins.NativeAudio.play('puerta');
        }
        catch(err)
        {
          console.log("NativeAudio no funciona por WEB");
        }
      $timeout(function() {
        $scope.logueado = 'no';
        $scope.usuario = JSON.stringify(resultado);
        //$scope.usuario = JSON.stringify(firebase.auth().currentUser()); Esto es para usarlo en cualquier lado porque firebase esta global
      });
      console.info("deslogueo correcto", resultado);
      window.location = "index.html";
    });

  };

});