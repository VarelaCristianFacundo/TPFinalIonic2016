angular.module('perfiluser.controller', [])

.controller('perfiluserCtrl', function($scope, $timeout, $state, $cordovaBarcodeScanner, sLogueado) {
$scope.referencia = sLogueado.traerUser();
$scope.tarjetas= [];

$scope.Deslogear = function (){
  $state.go('tab.login');
    firebase.auth().signOut().catch(function (error){
      console.info("login incorrecto", error);
    }).then( function(resultado){
      $timeout(function() {
        $scope.logueado = 'no';
        $scope.usuario = JSON.stringify(resultado);
        //$scope.usuario = JSON.stringify(firebase.auth().currentUser()); Esto es para usarlo en cualquier lado porque firebase esta global
      });
      console.info("deslogueo correcto", resultado);
      
    });
  };

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