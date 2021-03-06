// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'perfiladmin.controller', 'starter.controllers', 'desafiosadmin.controller','cargarcredito.controller' ,'ngCordova' , 'ngCordovaOauth', 'listadesafios.controller','login.controller', 'desafio.controller' , 'batalla.controller' , 'perfiluser.controller', 'servicios'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)

firebase.auth().onAuthStateChanged (function(user){
  if (user)
  {
    try{
        //Configuración inicial cada vez que se inicia la App
        var push = PushNotification.init({
          android: {
            //Es el mismo SENDER ID de siempre y es el único dato obligatorio en el init.
            senderID: "736952207155"
          },
          ios: {},
          windows: {}
        });

        //Cuando se registra el ID del usuario
        push.on('registration', function(data) {
          console.log("registrationId:" + data.registrationId);
          console.info("push", push);
          firebase.database().ref('usuario/'+firebase.auth().currentUser.uid).update({
              registrationId: data.registrationId
          });
        });

        //Cuando le llega una notificación al usuario
        push.on('notification', function(data) {
          console.log("Nueva notificacion", data);
        });

        //Cuando se produce un error
        push.on('error', function(e) {
          console.log(e.message);
        });
    }
    catch(error){
            console.log("La PC no otorga ID de notificaciones.", error);
    }
  }
  });

    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($ionicConfigProvider) {
  $ionicConfigProvider.views.maxCache(0);
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider


    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })


  .state('tab.desafio', {
    url: '/desafio',
    views: {
      'tab-desafio': {
        templateUrl: 'templates/desafio.html',
        controller: 'desafioCtrl'
      }
    }
  })

  .state('tab.listadesafios', {
    url: '/listadesafios',
    views: {
      'tab-listadesafios': {
        templateUrl: 'templates/listadesafios.html',
        controller: 'listaDesafiosCtrl'
      }
    }
  })

  .state('tab.login', { 
    url: '/login',
    views: {
      'tab-chats': {
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
      }
    }
  })

.state('tab.batallanaval', {
    url: '/batallanaval',
    views: {
      'tab-batallanaval': {
        templateUrl: 'templates/batallanaval.html',
        controller: 'batallanavalCtrl'
      }
    }
  })


.state('tab.perfiluser', {
    url: '/perfiluser',
    views: {
      'tab-perfiluser': {
        templateUrl: 'templates/perfiluser.html',
        controller: 'perfiluserCtrl'
      }
    }
  })


  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })

    .state('tab2', {
    url: '/tab2',
    abstract: true,
    templateUrl: 'templates/admin/tabs.html'
  })

     .state('tab2.perfil', {
    url: '/admin/perfil',
    views: {
      'tab-perfil': {
        templateUrl: 'templates/admin/perfil.html',
        controller: 'perfilCtrl'
      }
    }
  })

     .state('tab2.cargarcredito', {
    url: '/admin/cargarcredito',
    views: {
      'tab-cargarcredito': {
        templateUrl: 'templates/admin/cargarcredito.html',
        controller: 'cargarcreditoCtrl'
      }
    }
  })

     .state('tab2.desafiosadmin', {
    url: '/admin/desafiosadmin',
    views: {
      'tab-desafiosadmin': {
        templateUrl: 'templates/admin/desafiosadmin.html',
        controller: 'desafiosadminCtrl'
      }
    }
  })

.state('tab2.account', {
    url: '/admin/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/admin/account.html',
        controller: 'AccountCtrl'
      }
    }
  })

  .state('login', {
    url: '/login',
    abstract: false,
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});
