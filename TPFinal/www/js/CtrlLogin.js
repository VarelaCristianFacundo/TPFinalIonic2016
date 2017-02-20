angular.module('login.controller', [])

.controller('LoginCtrl', function($scope, $cordovaNativeAudio, $stateParams, $ionicPlatform, $timeout, $state, $cordovaOauth) {

$ionicPlatform.ready(function() {
      //------------------------------------------ AUDIOS ---------------------------------------------//
      if( window.plugins && window.plugins.NativeAudio ) {
          window.plugins.NativeAudio.preloadSimple( 'click', 'audio/click.mp3', function(msg){
          }, function(msg){
              console.log( 'error: ' + msg );
          });
          
        window.plugins.NativeAudio.preloadComplex("cancion", 'audio/cancion.mp3', 1, 1, 0,
          function(msg) {
            console.log("Música cargada", msg);
            window.plugins.NativeAudio.loop("cancion");
          }, function(msg) {
            console.log('error: ' + msg);
          });

      };
  });

  $scope.logueado = 'no';
  $scope.verificado = 'no';

  $scope.imagen={};
  $scope.imagen.foto="dinero.jpg";


  $scope.login = {};


  $scope.Logear = function (){
  try{
    window.plugins.NativeAudio.play('click');
  }
  catch(err)
  {
    console.log("NativeAudio no funciona por WEB");
  }
    firebase.auth().signInWithEmailAndPassword($scope.login.usuario, $scope.login.clave).catch(function (error){

      console.info("Error", error);
    }).then( function(resultado){

      $timeout(function() {
        $scope.logueado = 'si';
        if (resultado.emailVerified == false)
          $scope.verificado = 'si';
        else
        {
          $scope.verificado = 'no';
          if ($scope.login.nombre == "Administrador")
          {
            $state.go('tab2.perfil');
          }
          else
          {
            $state.go('tab.desafio');
          }
        }
        

      });
      console.info("login correcto", resultado);
      console.info("login auth", firebase.auth());
      
      try{
        window.plugins.NativeAudio.stop("cancion");
        window.plugins.NativeAudio.unload('cancion');
      }
      catch(err)
      {
        console.log("NativeAudio no funciona por WEB");
      }
 
      
    });
  };

$scope.Administrador=function(){
  $scope.login.usuario = "cvarela@iplan.com.ar";
  $scope.login.clave = "123456";
  $scope.login.nombre = "Administrador";

  try{
      window.plugins.NativeAudio.play('click');
    }
  catch(err)
    {
      console.log("NativeAudio no funciona por WEB");
    }
  }

  $scope.JugadorUno=function(){
    $scope.login.usuario="cvarela@iplan.com.ar";
    $scope.login.clave = "123456";
    $scope.login.nombre = "Facu";
    try{
      window.plugins.NativeAudio.play('click');
    }
    catch(err)
    {
      console.log("NativeAudio no funciona por WEB");
    }
  }

  $scope.JugadorDos=function(){
    $scope.login.usuario="lautaroriveiro91@gmail.com";
    $scope.login.clave = "123456";
    $scope.login.nombre = "Lauta";
    try{
      window.plugins.NativeAudio.play('click');
    }
  catch(err)
    {
      console.log("NativeAudio no funciona por WEB");
    }
  }

  $scope.Deslogear = function (){
    window.plugins.NativeAudio.play('click');
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

  $scope.Resetear = function (){
    window.plugins.NativeAudio.play('click');
    firebase.auth().sendPasswordResetEmail($scope.login.usuario).then(function(resultado){
      console.info("resertear clave correcto", resultado);
    }).catch(function (error){
      console.info("resertear clave incorrecto", error);
    });
  };

  $scope.VerificarMail = function (){
    window.plugins.NativeAudio.play('click');
    firebase.auth().currentUser.sendEmailVerification().then(function(resultado){
      console.info("verifico el usuario correcto", resultado);
    }).catch(function (error){
      console.info("verifico el usuario incorrecto", error);
    });
  };

  $scope.VerificarMail = function (){
    window.plugins.NativeAudio.play('click');
    firebase.auth().currentUser.sendEmailVerification().then(function(resultado){
      console.info("verifico el usuario correcto", resultado);
    }).catch(function (error){
      console.info("verifico el usuario incorrecto", error);
    });
  };

  $scope.Registrar = function (){
    window.plugins.NativeAudio.play('click');
    firebase.auth().createUserWithEmailAndPassword($scope.login.usuario, $scope.login.clave).then(function(resultado){

      firebase.database().ref('usuario/' + resultado.uid).set({
        correo: $scope.login.usuario,
        nombre: $scope.login.nombre,
        creditos: 100
      });

      $timeout(function() {
        $scope.logueado = 'si';
        if (resultado.emailVerified == false)
          $scope.verificado = 'si';
        else
          $scope.verificado = 'no';

      });
      console.info("registrar el usuario correcto", resultado);
    },function (error){
      if(error.code == "auth/email-already-in-use")
        $scope.errorMensaje = "El email ya esta registrado";

      console.info("registrar el usuario incorrecto", error);
    });
  };

  $scope.LoginGitHub = function (){ 
    window.plugins.NativeAudio.play('click');
    $cordovaOauth.github("268ca57667d46532b4a0", "ead175145479d458e210f8b2724b11d735476410", []).then(function(result) {
    var token = result.access_token;
    var credential = firebase.auth.GithubAuthProvider.credential(token);
    console.info("result", result);
    console.info("credential", credential);
    firebase.auth().signInWithCredential(credential)
    .catch(function(error){
      console.info("error", error);
      var credential = error.credential;
      console.info("error credential", error.credential);
    })
    
    .then(function(respuesta){
        console.info("respuesta", respuesta);
        console.info("respuesta.providerData[0]",respuesta.providerData[0]);
        console.info("respuesta.uid",respuesta.uid);              
              
        var providerData = respuesta.providerData[0];

        if(respuesta.providerData[0].email == null){
          console.info("EMAIL NULL (Lo tiene oculto en el Settings de su GitHub)");
        }
        
        var ref = new Firebase("https://loginsupervisada.firebaseio.com/usuario/"+respuesta.uid);
        
        ref.once('value', function(snapshot) {
          console.info("snapshot val", snapshot.val());

          if (snapshot.val() == null) {
            var usuario = {
              nombre: providerData.displayName,
              creditos: 1000,
              correo: providerData.email
            };

            ref.set(usuario);
            console.info("USUARIO", usuario);

            console.info("Bienvenido", respuesta);
          }

          $timeout(function(){
            if(respuesta != undefined){
              console.info("Bienvenido", respuesta);
              $state.go('tab.desafio');
            }
            
            else{
              console.info("Error de ingreso", respuesta);
            }
          }, 1000);
        });
      });
    }, function(error) {
    console.log("Error -> " + error);
    });
 /*   var provider = new firebase.auth.GithubAuthProvider();
    provider.addScope('repo');

    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a GitHub Access Token. You can use it to access the GitHub API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;

      console.info(user);

    }).catch(function(error) {
      
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      console.info(errorMessage);
      // ...
    });*/
  };
});