angular.module('listadesafios.controller', [])

.controller('listaDesafiosCtrl', function($scope, $state, $timeout, sLogueado) {


	$scope.desafio = {};
	$scope.desafio.desc = "";
	$scope.desafio.cred = "";
  $scope.desafios =[];

  $scope.batalla = {};
  $scope.batalla.desc = "";
  $scope.batalla.cred = "";
  $scope.batallas =[];
  $scope.estado = {};
  $scope.estado.bandera = "lista";
  $scope.referencia = sLogueado.traerUser();


	var refDesafios = new firebase.database().ref('desafios/');
	console.info(refDesafios);
    refDesafios.on('child_added', function(data){

    $timeout(function(){
      console.info(data.val(), data.key);
      var desafio = data.val();
      desafio.key = data.key;
      $scope.desafios.push(desafio);
      console.info($scope.desafios);
    });
});

    refDesafios.on('child_changed', function(data){
      
    $timeout(function(){
      for (var i in $scope.desafios) {
        if ($scope.desafios[i].key == data.key) {
          $scope.desafios[i] = data.val();
          $scope.desafios[i].key = data.key;
        };
      };
    });
});
    var refBatalla = new firebase.database().ref('partidasBatallaNaval/');
    console.info(refBatalla);
    refBatalla.on('child_added', function(data){

    $timeout(function(){
      console.info(data.val(), data.key);
      var batalla = data.val();
      batalla.key = data.key;
      $scope.batallas.push(batalla);
      console.info($scope.batallas);
    });
});

$scope.AceptDesafio = function(value){

  console.info (value);
  if (value.Credito <= $scope.referencia.creditos)
  {
    $scope.referencia.creditos = $scope.referencia.creditos - value.Credito;
    var refDesafios = new firebase.database().ref('desafios/');
    refDesafios.child(value.key).update({
     Aceptante: $scope.referencia.nombre,
     creditos: $scope.referencia.creditos
    });
  }
  else
  {
    console.info ("Credito insuficiente");
  }
};

$scope.AcepteDesafio = function(value){

  console.info (value);
  var refDesafios = new firebase.database().ref('partidasBatallaNaval/');
  refDesafios.child(value.key).update({
    Aceptante: $scope.referencia.nombre
  });
};

$scope.Cancelar = function(){
  $scope.estado.bandera = "lista";
}

$scope.Aceptar = function(){
  $scope.estado.bandera = "lista";
}
})
