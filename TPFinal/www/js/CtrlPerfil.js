angular.module('perfiluser.controller', [])

.controller('perfiluserCtrl', function($scope, $timeout, $cordovaBarcodeScanner, sLogueado) {
$scope.referencia = sLogueado.traerUser();
$scope.tarjetas= [];

  $scope.LeerCodigo = function(){
    $cordovaBarcodeScanner.scan().then ( function (imagenEscaneada){
      alert (imagenEscaneada.text);
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