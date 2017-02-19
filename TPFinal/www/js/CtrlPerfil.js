angular.module('perfiluser.controller', [])

.controller('perfiluserCtrl', function($scope, $timeout, $state, $cordovaBarcodeScanner, sLogueado, $cordovaNativeAudio, $ionicPlatform) {

$ionicPlatform.ready(function() {
      //------------------------------------------ AUDIOS ---------------------------------------------//
      if( window.plugins && window.plugins.NativeAudio ) {
          window.plugins.NativeAudio.preloadSimple( 'coin', 'audio/coin.mp3', function(msg){
          }, function(msg){
              console.log( 'error: ' + msg );
          });

      };
  });


$scope.referencia = sLogueado.traerUser();
$scope.tarjetas= [];

$scope.Deslogear = function (){
    firebase.auth().signOut().catch(function (error){
      console.info("login incorrecto", error);
    }).then( function(resultado){
      $timeout(function() {
        $scope.logueado = 'no';
        $scope.usuario = JSON.stringify(resultado);
        //$scope.usuario = JSON.stringify(firebase.auth().currentUser()); Esto es para usarlo en cualquier lado porque firebase esta global
      });
      console.info("deslogueo correcto", resultado);
    $state.go('tab.login');  
    });

  };

  $scope.LeerCodigo = function(){
      window.plugins.NativeAudio.play('coin');
      $cordovaBarcodeScanner.scan().then ( function (imagenEscaneada){
      alert ("Se acreditaron: " + imagenEscaneada.text + "créditos");
      console.info("imagenEscaneada",imagenEscaneada);
      var refTarjetas = new firebase.database().ref('tarjetas/'+ imagenEscaneada.text);

      refTarjetas.on('child_added', function(data){

      $timeout(function(){
      if (data.key == "cantidad") {
        $scope.referencia.creditos += data.val();
      };
    });
});
    }, function(error){
      console.info("error",error);
      alert ("Ha ocurrido un error: " + error);
    });
  }

});