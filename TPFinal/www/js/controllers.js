angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('batallanavalCtrl', function($scope) {

$scope.cuadradoElegido="Ninguno";

$scope.LeerCuadrado = function(elegido){
    
      $scope.cuadradoElegido = elegido;
       
  }
})

.controller('listadodesafiosCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('LoginCtrl', function($scope, $stateParams, $timeout) {
  $scope.logueado = 'no';
  $scope.verificado = 'no';

  $scope.login = {};
  $scope.login.usuario = "cvarelagarcia@gmail.com";
  $scope.login.clave = "123456";
  $scope.login.nombre = "Cris Varela";

  $scope.Logear = function (){
    firebase.auth().signInWithEmailAndPassword($scope.login.usuario, $scope.login.clave).catch(function (error){

      console.info("Error", error);
    }).then( function(resultado){

      $timeout(function() {
        $scope.logueado = 'si';
        if (resultado.emailVerified == false)
          $scope.verificado = 'si';
        else
          $scope.verificado = 'no';

      });
      console.info("login correcto", resultado);

    });
  };

  $scope.Deslogear = function (){
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
    firebase.auth().sendPasswordResetEmail($scope.login.usuario).then(function(resultado){
      console.info("resertear clave correcto", resultado);
    }).catch(function (error){
      console.info("resertear clave incorrecto", error);
    });
  };

  $scope.VerificarMail = function (){
    firebase.auth().currentUser.sendEmailVerification().then(function(resultado){
      console.info("verifico el usuario correcto", resultado);
    }).catch(function (error){
      console.info("verifico el usuario incorrecto", error);
    });
  };

  $scope.VerificarMail = function (){
    firebase.auth().currentUser.sendEmailVerification().then(function(resultado){
      console.info("verifico el usuario correcto", resultado);
    }).catch(function (error){
      console.info("verifico el usuario incorrecto", error);
    });
  };

  $scope.Registrar = function (){
    firebase.auth().createUserWithEmailAndPassword($scope.login.usuario, $scope.login.clave).then(function(resultado){

      firebase.database().ref('usuario/' + $scope.login.nombre).set({
        correo: $scope.login.usuario,
        nombre: $scope.login.nombre
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
    var provider = new firebase.auth.GithubAuthProvider();
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
    });
  };

});

