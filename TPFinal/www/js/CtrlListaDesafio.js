angular.module('listadesafios.controller', [])

.controller('listaDesafiosCtrl', function($scope, $timeout) {


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

$scope.AceptDesafio = function(){

  

};

$scope.AbrirDesafio = function(){
  console.info($scope.batalla);  
  $scope.estado.bandera = "nuevodesafio";
  console.info($scope.estado.bandera);  

};

$scope.Cancelar = function(){
  $scope.estado.bandera = "lista";
}

$scope.Aceptar = function(){
  $scope.estado.bandera = "lista";
}
})
