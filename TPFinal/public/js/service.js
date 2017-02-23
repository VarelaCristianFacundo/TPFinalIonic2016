angular.module('servicios', [])

.service('sLogueado', function ($timeout) {
    var usuario = {};

    var ref = new Firebase("https://loginsupervisada.firebaseio.com/usuario");
    ref.child(firebase.auth().currentUser.uid).on('child_added', function(data){
      $timeout(function(){
        var valor = data.val();
        usuario[data.key()] = valor;
      });
    });

    ref.child(firebase.auth().currentUser.uid).on('child_changed', function(data){
      $timeout(function(){
        var valor = data.val();
        var campo = data.key();
        if(campo == "creditos"){
            usuario[campo] = valor;
        }
      });
    });

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
    ref.child(firebase.auth().currentUser.uid).on('child_added', function(data){
      $timeout(function(){
        //console.info(data.val(), data.key());
        var valor = data.val();
        usuario[data.key()] = valor;
      });
    });
   }
});

    return {
        traerUser: function () {
            return usuario;
        },
        usarUser: function(value) {
            usuario = value;
        },
        actualizarCreditos: function(value) {
            usuario.creditos = value;
            ref.child(firebase.auth().currentUser.uid).update({
                creditos: value
            });
        },
        traerCreditos: function() {
            return usuario['creditos'];
        }
    };
});