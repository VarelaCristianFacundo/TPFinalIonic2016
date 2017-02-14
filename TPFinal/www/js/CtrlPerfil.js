angular.module('perfiluser.controller', [])

.controller('perfiluserCtrl', function($scope, $cordovaBarcodeScanner, sLogueado) {
$scope.referencia = sLogueado.traerUser();


  $scope.LeerCodigo = function(){
    console.info("dfsdf");
    $cordovaBarcodeScanner.scan().then ( function (imagenEscaneada){
      alert (imagenEscaneada.text);
      console.info("imagenEscaneada",imagenEscaneada);
    }, function(error){
      console.info("error",error);
      alert ("Ha ocurrido un error: " + error);
    });
  }

});