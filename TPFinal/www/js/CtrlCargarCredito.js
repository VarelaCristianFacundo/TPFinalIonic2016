angular.module('cargarcredito.controller', [])

.controller('cargarcreditoCtrl', function($scope, $cordovaNativeAudio, $ionicPlatform, $ionicPopup) {

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
$scope.nueva.credito;

$scope.CargarCredito = function(){
	try{
      window.plugins.NativeAudio.play('coin');
    }
    catch(err)
    {
      console.log("NativeAudio no funciona por WEB");
    }
    var alertPopup = $ionicPopup.alert({
            title: 'Información',
            template: 'Se generó tarjeta de $' + $scope.nueva.credito
         });
  firebase.database().ref("/tarjetas/").push({
  cantidad: $scope.nueva.credito,
  estado: "disponible",
  })
};

})
