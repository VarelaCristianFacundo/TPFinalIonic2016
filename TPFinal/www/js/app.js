// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
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

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
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

.state('tab.listadodesafios', {
    url: '/listadodesafios',
    views: {
      'tab-listadodesafios': {
        templateUrl: 'templates/listadodesafios.html',
        controller: 'listadodesafiosCtrl'
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
        controller: 'LoginCtrl'
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
