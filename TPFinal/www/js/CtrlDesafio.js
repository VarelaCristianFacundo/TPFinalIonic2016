angular.module('desafio.controller', [])

.controller('desafioCtrl', function($scope, sLogueado, $ionicPlatform, $cordovaNativeAudio, $ionicPopup, $http) {

var idusuarios = [];

firebase.database().ref('usuario').on('child_added', function(data){
  idusuarios.push(data.val().registrationId);
  console.log (idusuarios);
});

$ionicPlatform.ready(function() {
      //------------------------------------------ AUDIOS ---------------------------------------------//
      if( window.plugins && window.plugins.NativeAudio ) {
          window.plugins.NativeAudio.preloadSimple( 'coin', 'audio/coin.mp3', function(msg){
          }, function(msg){
              console.log( 'error: ' + msg );
          });
          
      };
  });


$scope.nueva={};
$scope.nueva.credito = 0;
$scope.nueva.desc= "";
$scope.cantPartidas;
$scope.referencia = sLogueado.traerUser();

$scope.Apostar = function(){

  if ($scope.nueva.desc == "")
  {
  //  		alert ("No ingresó ningún desafío");
         var alertPopup = $ionicPopup.alert({
           title: 'Faltan Datos!',
           template: 'No ingresó ningún desafío'
         });

  }
  else if ($scope.nueva.credito == 0)
  {
//  		alert ("No ingresó créditos");		
      var alertPopup = $ionicPopup.alert({
           title: 'Faltan Datos!',
           template: 'No ingresó créditos'
         });

  }
  else
  {
    if ($scope.referencia.creditos < 0)
    {
      //alert ("No tiene crédito suficiente (Créditos: " + $scope.referencia.creditos + ")")
      var alertPopup = $ionicPopup.alert({
           title: 'Faltan Datos!',
           template: "No tiene crédito suficiente (Créditos: " + $scope.referencia.creditos + ")"
         });      
    }
    else
    {
  	  window.plugins.NativeAudio.play('coin');
  	  
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
            "body": "Se ha creado un nuevo desafío",
            "sound": "default",
            "click_action": "FCM_PLUGIN_ACTIVITY",
            "icon": "fcm_push_icon"
          },
          "priority":"high"
        }
      }).then(function(data){console.info("data",data);}, function(error){console.info("error",error);});

      $scope.referencia.creditos = $scope.referencia.creditos - $scope.nueva.credito;
  	  sLogueado.actualizarCreditos ($scope.referencia.creditos);
  	  firebase.database().ref("/desafios/").push({
  	  desafiante: $scope.referencia.nombre,
  	  descripcion: $scope.nueva.desc,
  	  desafianteUID: firebase.auth().currentUser.uid,
  	  credito: $scope.nueva.credito
  	  })
      $scope.nueva.credito = 0;
      $scope.nueva.desc= "";
    }
  }
};

})
