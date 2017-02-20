angular.module('listadesafios.controller', [])

.controller('listaDesafiosCtrl', function($scope, $state, $timeout, sLogueado, $cordovaNativeAudio, $ionicPlatform) {

$ionicPlatform.ready(function() {
      //------------------------------------------ AUDIOS ---------------------------------------------//
      if( window.plugins && window.plugins.NativeAudio ) {
          window.plugins.NativeAudio.preloadSimple( 'click', 'audio/click.mp3', function(msg){
          }, function(msg){
              console.log( 'error: ' + msg );
          });
          
      };
  });


	$scope.desafio = {};
	$scope.desafio.desc = "";
	$scope.desafio.cred = "";
  $scope.desafios =[];

  $scope.detalleBatalla={};
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

    refBatalla.on('child_changed', function(data){
    console.info(data);
    $timeout(function(){
      for (var i in $scope.batallas) {
        if ($scope.batallas[i].key == data.key) {
          $scope.batallas[i] = data.val();
          $scope.batallas[i].key = data.key;
        };
      };
    });
});

$scope.AceptDesafio = function(value){
  console.info (value);
  if (value.credito <= $scope.referencia.creditos)
  {

    try{
      window.plugins.NativeAudio.play('click');
    }
    catch(err)
    {
      console.log("NativeAudio no funciona por WEB");
    }
    $scope.referencia.creditos = $scope.referencia.creditos - value.credito;
    sLogueado.actualizarCreditos ($scope.referencia.creditos);
    var refDesafios = new firebase.database().ref('desafios/');
    refDesafios.child(value.key).update({
     aceptante: $scope.referencia.nombre,
     aceptanteUID: firebase.auth().currentUser.uid,
     creditos: $scope.referencia.creditos
    });
  }
  else
  {
    console.info ("Credito insuficiente");
  }
};

$scope.GuardarBatalla = function(value){
    $scope.estado.bandera="enjuego";

    $scope.detalleBatalla = value;
    console.info("detalle", $scope.detalleBatalla);
}

$scope.AcepteDesafio = function(){
  console.info("credito batalla", $scope.detalleBatalla.credito);
  console.info("credito referencia", $scope.referencia.creditos);

  if (parseInt($scope.detalleBatalla.credito) <= parseInt($scope.referencia.creditos))
  {

    $scope.estado.bandera="lista";
    var refDesafios = new firebase.database().ref('partidasBatallaNaval/');
      refDesafios.child($scope.detalleBatalla.key).update({
        aceptante: $scope.referencia.nombre,
        aceptanteUID: firebase.auth().currentUser.uid
      });
    if ($scope.cuadradoElegido == $scope.detalleBatalla.posicion)
      {
            $scope.referencia.creditos = parseInt($scope.referencia.creditos) + parseInt($scope.detalleBatalla.credito);
            sLogueado.actualizarCreditos ($scope.referencia.creditos);
      }
      else
      {
              var partidasRef = new Firebase("https://loginsupervisada.firebaseio.com/usuario/" + $scope.detalleBatalla.desafianteUID);
              partidasRef.once('value', function(data){
              var usuario = data.val();

              usuario.creditos = usuario.creditos + ($scope.detalleBatalla.credito * 2);
              partidasRef.update({creditos:usuario.creditos});
              });
      }
  }
  else
  {
    console.info ("Credito insuficiente");
  }
  $state.reload();

  
};

$scope.LeerCuadrado = function(elegido){
    
      $scope.cuadradoElegido = elegido;
       
  };

$scope.Cancelar = function(){
  $scope.estado.bandera = "lista";
}

$scope.Aceptar = function(){
  $scope.estado.bandera = "lista";
}
})
