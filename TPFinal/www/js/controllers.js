angular.module('starter.controllers', [])

.controller('perfiluserCtrl', function($scope, $state) {
  $state.go('tab.login');
})

.controller('desafiosadminCtrl', function($scope) {})

.controller('cargarcreditoCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});

