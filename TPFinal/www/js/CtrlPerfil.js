angular.module('perfiluser.controller', [])

.controller('perfiluserCtrl', function($scope, $timeout, $state, $cordovaBarcodeScanner, sLogueado, $cordovaNativeAudio, $ionicPlatform, $ionicPopup) {


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
$scope.tarjetas= [];

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

  $scope.LeerCodigo = function(){
      $cordovaBarcodeScanner.scan().then ( function (imagenEscaneada){
      console.info("imagenEscaneada",imagenEscaneada);
      var refTarjetas = new firebase.database().ref('tarjetas/'+ imagenEscaneada.text);
      console.info("refTarjetas", refTarjetas);
      refTarjetas.on('child_added', function(data){

      $timeout(function(){
      if (data.key == "cantidad") {
        try{
          window.plugins.NativeAudio.play('coin');
        }
        catch(err)
        {
          console.log("NativeAudio no funciona por WEB");
        }
        console.info("datakey", data.val());
        var alertPopup = $ionicPopup.alert({
            title: 'Gracias!',
            template: 'Se acreditaron $' + data.val()
         });  
        $scope.referencia.creditos += data.val();
        sLogueado.actualizarCreditos ($scope.referencia.creditos);
      };
    });
});
    }, function(error){
      console.info("error",error);
      alert ("Ha ocurrido un error: " + error);
    });
  }

});