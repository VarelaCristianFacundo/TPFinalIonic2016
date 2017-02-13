angular.module('perfiluser.controller', [])

.controller('perfiluserCtrl', function($scope, $cordovaBarcodeScanner) {

  $scope.LeerCodigo = function(){
    $cordovaBarcodeScanner.scan().then ( function (imagenEscaneada){
      alert (imagenEscaneada.text);
    }, function(error){
      alert ("Ha ocurrido un error: " + error);
    });
  }

});