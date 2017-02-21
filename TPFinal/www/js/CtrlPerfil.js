angular.module('perfiluser.controller', [])

.controller('perfiluserCtrl', function($scope, $timeout, $state, $cordovaBarcodeScanner, sLogueado, $cordovaNativeAudio, $ionicPlatform) {

if (firebase.auth().currentUser == null)
{
  console.info ("entre", firebase.auth().currentUser);
  $state.go ('tab.login');
}

$ionicPlatform.ready(function() {
      //------------------------------------------ AUDIOS ---------------------------------------------//
      if( window.plugins && window.plugins.NativeAudio ) {
          window.plugins.NativeAudio.preloadSimple( 'coin', 'audio/coin.mp3', function(msg){
          }, function(msg){
              console.log( 'error: ' + msg );
          });
          window.plugins.NativeAudio.preloadSimple( 'click', 'audio/click.mp3', function(msg){
          }, function(msg){
              console.log( 'error: ' + msg );
          });

      };
  });


$scope.referencia = sLogueado.traerUser();
$scope.tarjetas= [];

$scope.Deslogear = function (){
    try{
      window.plugins.NativeAudio.play('click');
    }
    catch(err)
    {
      console.log("NativeAudio no funciona por WEB");
    }
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
    try{
      window.plugins.NativeAudio.play('coin');
    }
    catch(err)
    {
      console.log("NativeAudio no funciona por WEB");
    }
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