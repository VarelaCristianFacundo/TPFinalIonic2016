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
      //console.info(data.val(), data.key);
      /*var tarjeta = data.val();
      tarjeta.key = data.key;
      $scope.tarjetas.push(tarjeta);
      console.info($scope.tarjetas);
      $scope.referencia.creditos += $scope.tarjetas[0];*/
    });

});

    }, function(error){
      console.info("error",error);
      alert ("Ha ocurrido un error: " + error);
    });
  }

});