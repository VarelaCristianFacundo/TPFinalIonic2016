angular.module('desafiosadmin.controller', [])

.controller('desafiosadminCtrl', function($scope, $state, $timeout, sLogueado, $http) {

  var idusuarios = [];

  firebase.database().ref('usuario').on('child_added', function(data){
   idusuarios.push(data.val().registrationId);
   console.info ("idusuarios",idusuarios);
  });


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

$scope.Verdadero = function(value){

  console.info (value);
  
  var partidasRef = new Firebase("https://loginsupervisada.firebaseio.com/usuario/" + value.desafianteUID);
  partidasRef.once('value', function(data){
  var usuario = data.val();

  usuario.creditos = usuario.creditos + (value.credito * 2);
  partidasRef.update({creditos:usuario.creditos});
 
         $http ({

        method: 'POST',
        url: 'https://fcm.googleapis.com/fcm/send',
        headers: {
          'Authorization': 'key=AAAAq5XGRzM:APA91bGYBgkr1jYlMbtrWm5AEgVtuYg2X5r8l2Qy2o6HtVI2n_VY6_RfAMDm527xVT33N5JuOQF8dfnXGApqV92Z0kbAb3mWiIH0pugiWGrPgXyHBs0fCuICKeYlXs9iNJBorXxuAuJO',
          'Content-type': 'application/json'
        },
        data: {
          "registration_ids": idusuarios,
          "notification":{
            "title": "DesafíoS",
            "body": usuario.nombre + " ha ganado el desafío",
            "sound": "default",
            "click_action": "FCM_PLUGIN_ACTIVITY",
            "icon": "fcm_push_icon"
          },
          "priority":"high"
        }
      }).then(function(data){console.info("data",data);}, function(error){console.info("error",error);});



 });


  var refDesafios = new firebase.database().ref('desafios/');
  refDesafios.child(value.key).update({
  estado: "finalizado"
  });
};

$scope.Falso = function(value){
  console.info (value);
  
  var partidasRef = new Firebase("https://loginsupervisada.firebaseio.com/usuario/" + value.aceptanteUID);
  partidasRef.once('value', function(data){
  var usuario = data.val();
  usuario.creditos = usuario.creditos + (value.credito * 2);
  partidasRef.update({creditos:usuario.creditos});


   $http ({

        method: 'POST',
        url: 'https://fcm.googleapis.com/fcm/send',
        headers: {
          'Authorization': 'key=AAAAq5XGRzM:APA91bGYBgkr1jYlMbtrWm5AEgVtuYg2X5r8l2Qy2o6HtVI2n_VY6_RfAMDm527xVT33N5JuOQF8dfnXGApqV92Z0kbAb3mWiIH0pugiWGrPgXyHBs0fCuICKeYlXs9iNJBorXxuAuJO',
          'Content-type': 'application/json'
        },
        data: {
          "registration_ids": idusuarios,
          "notification":{
            "title": "DesafíoS",
            "body": usuario.nombre + " ha ganado el desafío",
            "sound": "default",
            "click_action": "FCM_PLUGIN_ACTIVITY",
            "icon": "fcm_push_icon"
          },
          "priority":"high"
        }
      }).then(function(data){console.info("data",data);}, function(error){console.info("error",error);});


 });


  var refDesafios = new firebase.database().ref('desafios/');
  refDesafios.child(value.key).update({
  estado: "finalizado"
  });
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
